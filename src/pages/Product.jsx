import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { getLiveProduct, getLiveRelated, useLiveCatalog } from '../lib/catalog'
import { localizeProduct } from '../i18n/localize'
import { brand } from '../data/brand'

export default function Product() {
  const { t, i18n } = useTranslation()
  const { slug } = useParams()
  useLiveCatalog()
  const raw = getLiveProduct(slug)
  const product = localizeProduct(raw, t)
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  const [zoomOpen, setZoomOpen] = useState(false)

  useEffect(() => {
    setActiveImage(0)
    setQty(1)
    setTab('description')
    setZoomOpen(false)
  }, [slug])

  useEffect(() => {
    document.body.style.overflow = zoomOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [zoomOpen])

  if (!raw) {
    return (
      <div className="container section">
        <h1>{t('product.notFound')}</h1>
        <Link to="/shop" className="btn">
          {t('product.backToShop')}
        </Link>
      </div>
    )
  }

  const related = getLiveRelated(raw)
  const mainSrc = raw.images[activeImage] || raw.images[0]
  const priceStr = formatPrice(raw.price, i18n.language)

  return (
    <div className="container pdp-page">
      <div className="pdp pdp-large">
        <div className="pdp-gallery">
          <button
            type="button"
            className="pdp-gallery-main"
            onClick={() => setZoomOpen(true)}
            aria-label={t('product.enlarge')}
          >
            <img src={mainSrc} alt={product.title} />
            <span className="zoom-hint">{t('product.clickEnlarge')}</span>
          </button>
          <div className="pdp-thumbs">
            {raw.images.map((src, i) => (
              <button
                key={`${raw.handle}-${i}`}
                type="button"
                className={i === activeImage ? 'active' : ''}
                onClick={() => setActiveImage(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <div className="category-label">{product.categoryLabel}</div>
          <h1>{product.title}</h1>
          <div className="price-row" style={{ fontSize: '1.45rem', marginBottom: '1rem' }}>
            {raw.hidePrice ? (
              <span className="price-hidden">{t('common.priceOnRequest')}</span>
            ) : (
              <>
                <span className={raw.compareAt ? 'price-sale' : ''}>{priceStr}</span>
                {raw.compareAt && (
                  <span className="price-compare">{formatPrice(raw.compareAt, i18n.language)}</span>
                )}
              </>
            )}
          </div>
          {(raw.outOfStock || raw.stock === 0) && (
            <p className="pdp-oos-banner">{t('common.outOfStock')}</p>
          )}
          {raw.discountPercent > 0 && !raw.outOfStock && (
            <p className="pdp-discount-banner">-{raw.discountPercent}%</p>
          )}
          <p className="pdp-lead">{product.description}</p>

          {product.highlights?.length > 0 && (
            <ul className="pdp-highlights">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}

          <div className="pdp-actions">
            <div className="pdp-qty">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label={t('product.decrease')}
                disabled={raw.outOfStock || raw.stock === 0}
              >
                −
              </button>
              <span>{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label={t('product.increase')}
                disabled={raw.outOfStock || raw.stock === 0}
              >
                +
              </button>
            </div>
            {raw.hidePrice ? (
              <a className="btn" href={`${brand.whatsappUrl}?text=${encodeURIComponent(product.title)}`} target="_blank" rel="noreferrer">
                {t('common.priceOnRequest')}
              </a>
            ) : (
              <button
                type="button"
                className="btn"
                disabled={raw.outOfStock || raw.stock === 0}
                onClick={() => !(raw.outOfStock || raw.stock === 0) && addItem(raw, qty)}
              >
                {raw.outOfStock || raw.stock === 0 ? t('common.outOfStock') : t('product.addToCart')}
              </button>
            )}
          </div>

          <div className="pdp-tabs">
            <div className="pdp-tab-btns">
              <button
                type="button"
                className={tab === 'description' ? 'active' : ''}
                onClick={() => setTab('description')}
              >
                {t('product.description')}
              </button>
              <button
                type="button"
                className={tab === 'shipping' ? 'active' : ''}
                onClick={() => setTab('shipping')}
              >
                {t('product.shipping')}
              </button>
              <button
                type="button"
                className={tab === 'returns' ? 'active' : ''}
                onClick={() => setTab('returns')}
              >
                {t('product.returns')}
              </button>
            </div>
            {tab === 'description' && (
              <div className="pdp-tab-panel">
                <p>{product.description}</p>
                {product.highlights?.length > 0 && (
                  <ul className="pdp-highlights compact">
                    {product.highlights.map((h) => (
                      <li key={`tab-${h}`}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {tab === 'shipping' && <p>{t('product.shippingText')}</p>}
            {tab === 'returns' && <p>{t('product.returnsText')}</p>}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section similar-section">
          <div className="section-head">
            <div>
              <h2>{t('product.similar')}</h2>
              <p>
                {t('product.similarSub', { price: priceStr })}
                {raw.compareAt
                  ? t('product.insteadOf', { price: formatPrice(raw.compareAt, i18n.language) })
                  : ''}
              </p>
            </div>
            <Link to={`/shop?category=${encodeURIComponent(raw.category)}`} className="btn btn-outline">
              {t('product.viewCategory')}
            </Link>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <div key={p.handle} className="similar-card-wrap">
                <ProductCard product={p} />
                {p.price === raw.price && (
                  <span className="same-price-tag">
                    {t('product.samePrice', { price: formatPrice(p.price, i18n.language) })}
                  </span>
                )}
                {p.price !== raw.price && Math.abs(p.price - raw.price) <= 200 && (
                  <span className="same-price-tag soft">
                    {t('product.closePrice', { price: formatPrice(p.price, i18n.language) })}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {zoomOpen && (
        <div
          className="image-lightbox open"
          role="dialog"
          aria-modal="true"
          aria-label={t('product.enlarge')}
        >
          <button
            type="button"
            className="lightbox-backdrop"
            aria-label={t('common.close')}
            onClick={() => setZoomOpen(false)}
          />
          <div className="lightbox-panel">
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setZoomOpen(false)}
              aria-label={t('common.close')}
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-nav prev"
              onClick={() => setActiveImage((i) => (i - 1 + raw.images.length) % raw.images.length)}
              aria-label={t('product.previous')}
            >
              ‹
            </button>
            <img src={mainSrc} alt={product.title} />
            <button
              type="button"
              className="lightbox-nav next"
              onClick={() => setActiveImage((i) => (i + 1) % raw.images.length)}
              aria-label={t('product.next')}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
