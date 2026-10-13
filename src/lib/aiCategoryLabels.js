/**
 * Translate a shop category label to FR / EN / AR.
 * Uses a small local dictionary first, then MyMemory (free, no key).
 * Optional: set VITE_OPENAI_API_KEY for OpenAI fallback.
 */

const LOCAL = {
  maison: { labelFr: 'Maison', labelEn: 'Home', labelAr: 'المنزل' },
  home: { labelFr: 'Maison', labelEn: 'Home', labelAr: 'المنزل' },
  sports: { labelFr: 'Sports', labelEn: 'Sports', labelAr: 'الرياضة' },
  sport: { labelFr: 'Sport', labelEn: 'Sport', labelAr: 'رياضة' },
  divertissement: { labelFr: 'Divertissement', labelEn: 'Entertainment', labelAr: 'الترفيه' },
  entertainment: { labelFr: 'Divertissement', labelEn: 'Entertainment', labelAr: 'الترفيه' },
  promo: { labelFr: 'Promo', labelEn: 'Sale', labelAr: 'عروض' },
  promotion: { labelFr: 'Promotion', labelEn: 'Promotion', labelAr: 'ترويج' },
  gadgets: { labelFr: 'Gadgets', labelEn: 'Gadgets', labelAr: 'أدوات' },
  accessoires: { labelFr: 'Accessoires', labelEn: 'Accessories', labelAr: 'إكسسوارات' },
  accessories: { labelFr: 'Accessoires', labelEn: 'Accessories', labelAr: 'إكسسوارات' },
  enfants: { labelFr: 'Enfants', labelEn: 'Kids', labelAr: 'أطفال' },
  kids: { labelFr: 'Enfants', labelEn: 'Kids', labelAr: 'أطفال' },
  beaute: { labelFr: 'Beauté', labelEn: 'Beauty', labelAr: 'الجمال' },
  beauty: { labelFr: 'Beauté', labelEn: 'Beauty', labelAr: 'الجمال' },
  electronique: { labelFr: 'Électronique', labelEn: 'Electronics', labelAr: 'إلكترونيات' },
  electronics: { labelFr: 'Électronique', labelEn: 'Electronics', labelAr: 'إلكترونيات' },
  jardin: { labelFr: 'Jardin', labelEn: 'Garden', labelAr: 'الحديقة' },
  garden: { labelFr: 'Jardin', labelEn: 'Garden', labelAr: 'الحديقة' },
  cuisine: { labelFr: 'Cuisine', labelEn: 'Kitchen', labelAr: 'المطبخ' },
  kitchen: { labelFr: 'Cuisine', labelEn: 'Kitchen', labelAr: 'المطبخ' },
  nouveautes: { labelFr: 'Nouveautés', labelEn: 'New arrivals', labelAr: 'جديد' },
  new: { labelFr: 'Nouveau', labelEn: 'New', labelAr: 'جديد' },
}

function titleCase(s) {
  return String(s || '')
    .trim()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

function normKey(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
}

async function myMemory(text, from, to) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Translation API error')
  const data = await res.json()
  const out = data?.responseData?.translatedText
  if (!out || /INVALID|QUERY LENGTH/i.test(out)) throw new Error('Bad translation')
  return out.trim()
}

async function openAiTriplet(source) {
  const key = import.meta.env.VITE_OPENAI_API_KEY
  if (!key) return null
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content:
            'You translate e-commerce category names. Reply ONLY with JSON: {"labelFr":"...","labelEn":"...","labelAr":"..."}. Short shop labels, no punctuation.',
        },
        { role: 'user', content: source },
      ],
    }),
  })
  if (!res.ok) return null
  const data = await res.json()
  const raw = data?.choices?.[0]?.message?.content || ''
  const match = raw.match(/\{[\s\S]*\}/)
  if (!match) return null
  const parsed = JSON.parse(match[0])
  if (!parsed.labelFr || !parsed.labelEn || !parsed.labelAr) return null
  return parsed
}

/**
 * @param {string} source - slug or French label (e.g. "maison")
 * @returns {Promise<{labelFr:string,labelEn:string,labelAr:string}>}
 */
export async function translateCategoryLabels(source) {
  const text = String(source || '').trim()
  if (!text) throw new Error('Empty source')

  const key = normKey(text)
  if (LOCAL[key]) return { ...LOCAL[key] }

  const ai = await openAiTriplet(text).catch(() => null)
  if (ai) return ai

  const looksArabic = /[\u0600-\u06FF]/.test(text)
  const looksLatin = /^[\p{L}\p{N}\s\-']+$/u.test(text)

  let labelFr = titleCase(text)
  let labelEn = titleCase(text)
  let labelAr = text

  if (looksArabic) {
    labelAr = text
    ;[labelFr, labelEn] = await Promise.all([myMemory(text, 'ar', 'fr'), myMemory(text, 'ar', 'en')])
    labelFr = titleCase(labelFr)
    labelEn = titleCase(labelEn)
  } else if (looksLatin) {
    // Prefer FR → EN / AR (user types French or slug)
    const [en, ar] = await Promise.all([myMemory(text, 'fr', 'en'), myMemory(text, 'fr', 'ar')])
    labelFr = titleCase(text)
    labelEn = titleCase(en)
    labelAr = ar
  } else {
    const [en, ar] = await Promise.all([myMemory(text, 'fr', 'en'), myMemory(text, 'fr', 'ar')])
    labelEn = titleCase(en)
    labelAr = ar
  }

  return { labelFr, labelEn, labelAr }
}
