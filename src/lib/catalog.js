import { useEffect, useState } from 'react'
import {
  getAdminCategories,
  getMergedCatalog,
  subscribeAdminStorage,
} from './adminStorage'

/** Live catalog (seed + admin overrides/custom + discounts) */
export function useLiveCatalog() {
  const [tick, setTick] = useState(0)
  useEffect(() => subscribeAdminStorage(() => setTick((n) => n + 1)), [])
  void tick
  const products = getMergedCatalog()
  const categorySlugs = getAdminCategories().map((c) => c.slug)
  const fromProducts = Array.from(new Set(products.map((p) => p.category)))
  const merged = Array.from(new Set([...categorySlugs, ...fromProducts]))
  const categories = ['All', ...merged]
  return { products, categories, tick }
}

export function getLiveProduct(handle) {
  return getMergedCatalog().find((p) => p.handle === handle)
}

export function getLiveRelated(product, limit = 4) {
  const catalog = getMergedCatalog()
  const byHandle = (product.similarHandles || [])
    .map((h) => catalog.find((p) => p.handle === h))
    .filter(Boolean)
  if (byHandle.length >= limit) return byHandle.slice(0, limit)
  const rest = catalog
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

export function searchLiveProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return getMergedCatalog().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.highlights || []).some((h) => String(h).toLowerCase().includes(q)),
  )
}
