import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { searchLiveProducts, useLiveCatalog } from '../lib/catalog'
import { localizeProduct } from '../i18n/localize'
import { IconClose } from './Icons'

export default function SearchOverlay() {
  const { t, i18n } = useTranslation()
  const { searchOpen, setSearchOpen } = useCart()
  const { tick } = useLiveCatalog()
  const [query, setQuery] = useState('')
  const results = useMemo(
    () => searchLiveProducts(query).map((p) => localizeProduct(p, t)),
    [query, t, i18n.language, tick],
  )

  const close = () => {
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <div className={`search-overlay ${searchOpen ? 'open' : ''}`} aria-hidden={!searchOpen}>
      <button type="button" className="drawer-backdrop" aria-label={t('search.close')} onClick={close} />
      <div className="search-panel" role="dialog" aria-label={t('search.title')}>
        <div className="search-header" style={{ border: 0, padding: 0, marginBottom: '0.5rem' }}>
          <h3>{t('search.title')}</h3>
          <button type="button" className="icon-btn" onClick={close} aria-label={t('search.close')}>
            <IconClose />
          </button>
        </div>
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          autoFocus={searchOpen}
        />
        <div className="search-results">
          {query && results.length === 0 && <p>{t('search.none', { q: query })}</p>}
          {results.map((p) => (
            <Link key={p.handle} to={`/product/${p.handle}`} className="search-result" onClick={close}>
              <img src={p.images[0]} alt="" />
              <div>
                <strong>{p.title}</strong>
                <div style={{ fontSize: '0.85rem', color: '#777' }}>{p.categoryLabel}</div>
              </div>
              <span>{p.hidePrice ? t('common.priceOnRequest') : formatPrice(p.price, i18n.language)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
