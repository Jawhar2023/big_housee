/** Localize a product object with the current i18n `t` function. */
export function localizeProduct(product, t) {
  if (!product) return product
  const base = `products.${product.handle}`
  const highlights = t(`${base}.highlights`, { returnObjects: true })
  return {
    ...product,
    title: t(`${base}.title`, { defaultValue: product.title }),
    description: t(`${base}.description`, { defaultValue: product.description }),
    categoryLabel: t(`categories.${product.category}`, { defaultValue: product.category }),
    highlights: Array.isArray(highlights) ? highlights : product.highlights || [],
    badgeLabel: product.badge
      ? t(`badges.${product.badge}`, { defaultValue: product.badge })
      : null,
  }
}

export function localizeProducts(list, t) {
  return list.map((p) => localizeProduct(p, t))
}
