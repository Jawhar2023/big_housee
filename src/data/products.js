const productAssets = [
  ['gobelets', 'gobelets.jpg', 'Gobelets à jus', 'Accessoires', 5],
  ['kremy-chocolat-noisette', 'kremy-noisette.jpg', 'Crème à tartiner chocolat-noisette', 'Épicerie fine', 22],
  ['kremy-blanc-noisette-crunchy', 'Kremy Chocolat blanc Noisette Crunchy.jpg', 'Crème chocolat blanc-noisette crunchy', 'Épicerie fine', 22],
  ['kremy-chocolat-blanc', 'Kremy Chocolat Blanc.jpg', 'Crème à tartiner chocolat blanc', 'Épicerie fine', 22],
  ['sirop-banane', 'sirop banane.jpg', 'Sirop Saveurs banane', 'Sirops', 15],
  ['sirop-caramel', 'sirop caramel.jpg', 'Sirop Saveurs caramel', 'Sirops', 15],
  ['sirop-citron-vert', 'sirop citron vert.jpg', 'Sirop Saveurs citron vert', 'Sirops', 15],
  ['sirop-mangue', 'sirop manque.jpg', 'Sirop Saveurs mangue', 'Sirops', 15],
  ['sirop-melon', 'sirop melon.jpg', 'Sirop Saveurs melon', 'Sirops', 15],
  ['sirop-noisette', 'Sirop Noisette.jpg', 'Sirop Saveurs noisette', 'Sirops', 15],
  ['sirop-pasteque', 'SIROP PASTEQUE.jpg', 'Sirop Saveurs pastèque', 'Sirops', 15],
  ['sirop-peche', 'sirop peche.jpg', 'Sirop Saveurs pêche', 'Sirops', 15],
  ['base-frappe-cafe', 'smoothie base frappé.jpg', 'Base frappé goût café', 'Bases boissons', 35],
  ['base-smoothie-neutre', 'smoothie base neutre.jpg', 'Base smoothie neutre', 'Bases boissons', 30],
  ['creme-pistache', 'Smoothie base PISTACHIO.jpg', 'Crème à tartiner pistache', 'Épicerie fine', 28],
  ['tasses-the', 'Tasses.jpg', 'Tasses à thé Brasiliano', 'Verrerie et tasses', 18],
  ['cafe-dor-moulu-pur', 'cafe dor moulu pur.jpg', "Café d'Or moulu pur", 'Cafés', 4.5],
  ['cafe-premium-uganda', 'cafe premium uganda.jpg', 'Café premium Uganda', 'Cafés', 38],
  ['cafe-premium-vietnam', 'cafe premium vietnam.jpg', 'Café premium Vietnam', 'Cafés', 38],
  ['caffe-dor-expresso', 'caffe_dor_expresso.jpg', "Caffè d'Or espresso", 'Cafés', 34.5],
  ['cafe-dor-moulu-pur-selection', "café d'or moulu pur.jpg", "Café d'Or moulu pur, sélection", 'Cafés', 8.5],
  ['chicha-bleue', 'chichableue.jpg', 'Chicha bleue', 'Chichas', 145],
  ['chicha-gold', 'chichagold.jpg', 'Chicha Gold', 'Chichas', 145],
  ['chicha-purple', 'chichapurple.jpg', 'Chicha Purple', 'Chichas', 145],
  ['chicha-red', 'chichared.jpg', 'Chicha Red', 'Chichas', 145],
  ['creme-caramel', 'creme caramel.jpg', 'Crème caramel', 'Crèmes et garnitures', 9],
  ['creme-chantilly', 'creme chantilly.jpg', 'Crème chantilly', 'Crèmes et garnitures', 9],
  ['creme-chocolat', 'creme chocolat.jpg', 'Crème chocolat', 'Crèmes et garnitures', 9],
  ['creme-dokrem-fropping', 'creme dokrem fropping.jpg', 'Crème Dokrem Fropping', 'Crèmes et garnitures', 9],
  ['creme-fraise', 'creme fraise.jpg', 'Crème fraise', 'Crèmes et garnitures', 9],
  ['creme-framboise', 'creme framboise.jpg', 'Crème framboise', 'Crèmes et garnitures', 9],
  ['creme-noisette', 'creme noisette.jpg', 'Crème noisette', 'Crèmes et garnitures', 9],
  ['cup-small', 'cup small.jpg', 'Petite tasse', 'Verrerie et tasses', 15],
  ['cup', 'cup.jpg', 'Tasse', 'Verrerie et tasses', 25],
  ['dokrem-caramel', 'dokrem caramel.jpg', 'Dokrem caramel', 'Préparations Dokrem', 13],
  ['dokrem-vanille', 'dokren vanille.jpg', 'Dokrem vanille', 'Préparations Dokrem', 13],
  ['fremigel-banane', 'fremigel banane.jpg', 'Fremigel banane', 'Fremigel', 13],
  ['fremigel-blue-curacao', 'fremigel blue curacao.jpg', 'Fremigel blue curaçao', 'Fremigel', 13],
  ['fremigel-caramel', 'fremigel caramel.jpg', 'Fremigel caramel', 'Fremigel', 13],
  ['fremigel-chocolat-chaud', 'fremigel chaucolat chaud.jpg', 'Fremigel chocolat chaud', 'Fremigel', 13],
  ['fremigel-fraise', 'fremigel fraise.jpg', 'Fremigel fraise', 'Fremigel', 13],
  ['fremigel-mangue', 'fremigel manque.jpg', 'Fremigel mangue', 'Fremigel', 13],
  ['fremigel-mojito', 'fremigel mojito.jpg', 'Fremigel mojito', 'Fremigel', 13],
  ['fremigel-noisette', 'fremigel noisette.jpg', 'Fremigel noisette', 'Fremigel', 13],
  ['fremigel-pasteque', 'fremigel pastéque.jpg', 'Fremigel pastèque', 'Fremigel', 13],
  ['fremigel-peche', 'fremigel peche.jpg', 'Fremigel pêche', 'Fremigel', 13],
  ['fremigel-pinacolada', 'fremigel pinacolada.jpg', 'Fremigel piña colada', 'Fremigel', 13],
  ['fremigel-roseberry', 'fremigel roseberry.jpg', 'Fremigel roseberry', 'Fremigel', 13],
  ['fremigel-vanille', 'fremigel vanille.jpg', 'Fremigel vanille', 'Fremigel', 13],
  ['fropping-caramel', 'fropping caramel.jpg', 'Fropping caramel', 'Fropping et toppings', 9],
  ['fropping-chocolat-noir', 'fropping chocolat noir.jpg', 'Fropping chocolat noir', 'Fropping et toppings', 9],
  ['fropping-fraise', 'fropping fraise.jpg', 'Fropping fraise', 'Fropping et toppings', 9],
  ['fropping-framboise', 'fropping framboise.jpg', 'Fropping framboise', 'Fropping et toppings', 9],
  ['fropping-kiwi', 'fropping kiwi.jpg', 'Fropping kiwi', 'Fropping et toppings', 9],
  ['fropping-noisette', 'fropping noisette.jpg', 'Fropping noisette', 'Fropping et toppings', 9],
  ['fropping-vanille', 'fropping vanille.jpg', 'Fropping vanille', 'Fropping et toppings', 9],
  ['fructa-banane', 'fructa banane.jpg', 'Fructa banane', 'Fructa', 30],
  ['fructa-cerise', 'fructa cherry.jpg', 'Fructa cerise', 'Fructa', 30],
  ['fructa-kiwi', 'fructa kiwi.jpg', 'Fructa kiwi', 'Fructa', 30],
  ['fructa-mangue', 'fructa manque.jpg', 'Fructa mangue', 'Fructa', 30],
  ['fructa-peche', 'fructa peach.jpg', 'Fructa pêche', 'Fructa', 30],
  ['fructa-pomme', 'fructa pomme.jpg', 'Fructa pomme', 'Fructa', 30],
  ['fructa-douceur-de-fruits', 'fructaa douceur de fruits.jpg', 'Fructa douceur de fruits', 'Fructa', 35],
  ['verre-the-ohio', 'glaass the ohio.jpg', 'Verre à thé Ohio', 'Verrerie et tasses', 11],
  ['verre-casual', 'glass casual.jpg', 'Verre Casual', 'Verrerie et tasses', 18],
  ['mug-the-eduador', 'glass eduador tea mug.jpg', 'Mug à thé Eduador', 'Verrerie et tasses', 14],
  ['boite-verre-conservation', 'glass food storage.jpg', 'Boîte de conservation en verre', 'Verrerie et tasses', 35],
  ['verre-glint-lines', 'glass glint lines.jpg', 'Verre Glint Lines', 'Verrerie et tasses', 12],
  ['verre-in-love', 'glass in love.jpg', 'Verre In Love', 'Verrerie et tasses', 13],
  ['verre-sicilly', 'glass sicilly.jpg', 'Verre Sicilly', 'Verrerie et tasses', 16],
  ['creme-kremy-chantilly', 'kremy creme chantitty.jpg', 'Crème Kremy chantilly', 'Crèmes et garnitures', 9],
  ['briquets', 'lighters.jpg', 'Briquets', 'Accessoires', 0.6],
  ['sauce-caramel', 'sauce caramel.jpg', 'Sauce caramel', 'Sauces et nappages', 60],
  ['saveurs-ananas', 'saveurs ananas.jpg', 'Saveurs ananas', 'Saveurs', 35],
  ['saveurs-ananas-selection', 'saveurs ananass.jpg', 'Saveurs ananas, sélection', 'Saveurs', 35],
  ['saveurs-banane', 'saveurs banane.jpg', 'Saveurs banane', 'Saveurs', 35],
  ['saveurs-cerise', 'saveurs cerise.jpg', 'Saveurs cerise', 'Saveurs', 35],
  ['saveurs-chocolat-chaud', 'saveurs chocolat chaud.jpg', 'Saveurs chocolat chaud', 'Saveurs', 35],
  ['saveurs-framboise', 'saveurs framboise.jpg', 'Saveurs framboise', 'Saveurs', 35],
  ['saveurs-fruit-passion', 'saveurs fruit de la passion.jpg', 'Saveurs fruit de la passion', 'Saveurs', 35],
  ['saveurs-kiwi', 'saveurs kiwi.jpg', 'Saveurs kiwi', 'Saveurs', 35],
  ['saveurs-litchi', 'saveurs litchi.jpg', 'Saveurs litchi', 'Saveurs', 35],
  ['saveurs-noix-coco', 'saveurs Noix de coco.jpg', 'Saveurs noix de coco', 'Saveurs', 35],
  ['saveurs-peche', 'saveurs péche.jpg', 'Saveurs pêche', 'Saveurs', 35],
  ['saveurs-pomme-verte', 'saveurs pomme verte.jpg', 'Saveurs pomme verte', 'Saveurs', 35],
]

export const products = productAssets.map(([handle, file, title, category, price]) => ({
  handle,
  title,
  category,
  price,
  compareAt: null,
  badge: 'New',
  images: [`/products/${encodeURIComponent(file)}`],
  description: `${title}, sélectionné par Big House.`,
  highlights: ['Sélection Big House', 'Livraison selon disponibilité'],
  similarHandles: [],
  hidePrice: false,
}))

export const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

export function getProduct(handle) {
  return products.find((p) => p.handle === handle)
}

export function getProductsByCategory(category) {
  if (!category || category === 'All') return products
  return products.filter((p) => p.category === category)
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.highlights || []).some((h) => h.toLowerCase().includes(q)),
  )
}

export function formatPrice(n, locale = 'fr') {
  const code = String(locale || 'fr').slice(0, 2)
  const loc = code === 'ar' ? 'ar-TN' : code === 'en' ? 'en-TN' : 'fr-TN'
  return `${new Intl.NumberFormat(loc).format(n)} DT`
}

/** Prefer explicit similarHandles, then same category + close price. */
export function getRelated(product, limit = 4) {
  const byHandle = (product.similarHandles || [])
    .map((h) => getProduct(h))
    .filter(Boolean)

  if (byHandle.length >= limit) return byHandle.slice(0, limit)

  const rest = products
    .filter((p) => p.handle !== product.handle && !byHandle.some((b) => b.handle === p.handle))
    .map((p) => ({
      p,
      score:
        (p.category === product.category ? 100 : 0) +
        (p.price === product.price ? 50 : 0) +
        Math.max(0, 40 - Math.abs(p.price - product.price) / 20),
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p)

  return [...byHandle, ...rest].slice(0, limit)
}

export const heroImage = products[6].images[0]
