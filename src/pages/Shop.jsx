import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'
import { useLiveCatalog } from '../lib/catalog'
import { getAdminSettings } from '../lib/adminStorage'

const PAGE_SIZE = 12

export default function Shop() {
  const { t } = useTranslation()
  const { products, categories } = useLiveCatalog()
  const settings = getAdminSettings()
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'All'
  const q = params.get('q') || ''
  const [sort, setSort] = useState('featured')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [view, setView] = useState('grid')
  const [maxPrice, setMaxPrice] = useState(1500)

  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [category, q, sort, maxPrice])

  const filtered = useMemo(() => {
    let list = category === 'All' ? [...products] : products.filter((p) => p.category === category)
    if (q) {
      const needle = q.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle) ||
          p.description.toLowerCase().includes(needle) ||
          t(`products.${p.handle}.title`, { defaultValue: '' }).toLowerCase().includes(needle) ||
          t(`products.${p.handle}.description`, { defaultValue: '' }).toLowerCase().includes(needle),
      )
    }
    list = list.filter((p) => p.price <= maxPrice)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') {
      list.sort((a, b) =>
        t(`products.${a.handle}.title`).localeCompare(t(`products.${b.handle}.title`)),
      )
    }
    return list
  }, [category, sort, q, maxPrice, t, products])

  const shown = filtered.slice(0, visible)

  const setCategory = (c) => {
    const next = new URLSearchParams(params)
    if (c === 'All') next.delete('category')
    else next.set('category', c)
    setParams(next)
  }

  const bannerSub = q
    ? t('shop.resultsFor', { q })
    : category === 'All'
      ? t('shop.allCollections')
      : t(`categories.${category}`, { defaultValue: category })

  return (
    <div className="shop-page">
      <div className="page-banner shop-banner">
        <div className="container">
          <p className="eyebrow">{t('brand.name')}</p>
          <h1>{t('shop.title')}</h1>
          <p className="banner-sub">
            {bannerSub}
            {' — '}
            {t('shop.items', { count: filtered.length })}
          </p>
        </div>
      </div>

      <div className="container shop-layout">
        <aside className="shop-filters">
          <div className="filter-block">
            <h3>{t('shop.categories')}</h3>
            <div className="filter-list">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={category === c ? 'active' : ''}
                  onClick={() => setCategory(c)}
                >
                  {t(`categories.${c}`, { defaultValue: c })}
                  <span>
                    {c === 'All' ? products.length : products.filter((p) => p.category === c).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h3>{t('shop.maxPrice')}</h3>
            <input
              type="range"
              min="50"
              max="1500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="price-label">{t('shop.upTo', { price: maxPrice })}</div>
          </div>

          <div className="filter-promo">
            <strong>{t('shop.freeShipping')}</strong>
            <p>
              {t('shop.freeShippingText')} ({settings.freeShippingFrom} DT)
            </p>
          </div>
        </aside>

        <div>
          <div className="shop-toolbar">
            <span>{t('shop.showing', { shown: shown.length, total: filtered.length })}</span>
            <div className="toolbar-right">
              <div className="view-toggle" role="group" aria-label={t('shop.viewMode')}>
                <button type="button" className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>
                  {t('shop.grid')}
                </button>
                <button type="button" className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
                  {t('shop.list')}
                </button>
              </div>
              <label>
                {t('shop.sort')}{' '}
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="featured">{t('shop.featured')}</option>
                  <option value="price-asc">{t('shop.priceAsc')}</option>
                  <option value="price-desc">{t('shop.priceDesc')}</option>
                  <option value="name">{t('shop.name')}</option>
                </select>
              </label>
            </div>
          </div>

          {shown.length === 0 ? (
            <div className="shop-empty">
              <h3>{t('shop.emptyTitle')}</h3>
              <p>{t('shop.emptyText')}</p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setParams({})
                  setMaxPrice(1500)
                }}
              >
                {t('shop.reset')}
              </button>
            </div>
          ) : (
            <div className={view === 'grid' ? 'product-grid' : 'product-list'}>
              {shown.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          )}

          {visible < filtered.length && (
            <div className="load-more-wrap">
              <button type="button" className="btn btn-outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                {t('common.loadMore')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
