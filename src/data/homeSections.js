import { products } from './products'
import { brand as brandInfo, trustPoints } from './brand'

export const brand = brandInfo
export { trustPoints }

export const browseCategories = Array.from(new Set(products.map((product) => product.category)))

export const heroSlides = [
  {
    id: 'big-house',
    video: '/video/big-house-hero.mp4',
    cta: 'Acheter',
    to: '/shop',
  },
]

export const packeryBanners = [
  {
    title: 'Sirop de pastèque',
    image: '/products/sirop pasthéque.jpg',
    to: `/product/${products[10].handle}`,
    size: 'large',
  },
  {
    title: 'Chocolat blanc',
    image: '/products/creme 1.jpg',
    to: `/product/${products[3].handle}`,
    size: 'small',
  },
  {
    title: 'Smoothie maison',
    image: '/products/smoothie 1.jpg',
    to: `/product/${products[13].handle}`,
    size: 'small',
  },
  {
    title: 'Sirop de pêche',
    image: '/products/sirop peche 1.jpg',
    to: `/product/${products[11].handle}`,
    size: 'medium',
  },
  {
    title: 'Tasses Brasiliano',
    image: '/products/glass 1.jpg',
    to: `/product/${products[15].handle}`,
    size: 'medium',
  },
]

export const collectionTabs = browseCategories.slice(0, 3).map((category, index) => ({
  id: `collection-${index}`,
  label: category,
  category,
}))

export const testimonials = [
  {
    name: 'Amelia R.',
    role: 'Cliente vérifiée',
    text: 'Une sélection soignée pour les petits plaisirs du quotidien.',
    rating: 5,
    avatar: products[1].images[0],
  },
  {
    name: 'Noah K.',
    role: 'Client vérifié',
    text: 'De belles idées gourmandes, à découvrir et à partager.',
    rating: 5,
    avatar: products[6].images[0],
  },
  {
    name: 'Sofia M.',
    role: 'Cliente vérifiée',
    text: 'Des essentiels choisis avec soin par Big House.',
    rating: 5,
    avatar: products[15].images[0],
  },
]

export const iconBoxes = trustPoints

export const helpTopics = [
  { title: 'Suivi commande', text: 'Suivez votre colis en temps réel.', icon: 'truck' },
  { title: 'Retours', text: 'Retours simples sous 30 jours.', icon: 'refresh' },
  { title: 'Paiement', text: 'Paiement sécurisé et flexible.', icon: 'card' },
  { title: 'Support', text: 'Notre équipe est à votre écoute.', icon: 'chat' },
]

export const brandLogos = products.slice(0, 5).map((product) => product.images[0])

export const scrollingWords = [
  'Big House Papetrie',
  'Saveurs à partager',
  'Les essentiels du quotidien',
  'Une sélection soignée',
  'Gourmandises et boissons',
  'Bienvenue chez Big House',
]
