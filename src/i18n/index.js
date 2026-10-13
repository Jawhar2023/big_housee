import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'
import ar from './locales/ar.json'

const saved = typeof window !== 'undefined' ? localStorage.getItem('bpa-lang') : null
const supported = ['en', 'fr', 'ar']

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: supported.includes(saved) ? saved : 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

export function applyDocumentLanguage(lang) {
  const code = supported.includes(lang) ? lang : 'fr'
  const isAr = code === 'ar'
  document.documentElement.lang = code
  document.documentElement.dir = isAr ? 'rtl' : 'ltr'
  document.body.classList.toggle('is-rtl', isAr)
  localStorage.setItem('bpa-lang', code)
}

applyDocumentLanguage(i18n.language)

i18n.on('languageChanged', applyDocumentLanguage)

export default i18n
