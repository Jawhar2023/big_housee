import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import { localizeProduct } from '../i18n/localize'
import { brand } from '../data/brand'

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation()
  const { addItem } = useCart()
  const p = localizeProduct(product, t)
  const secondary = product.images[1]
  const outOfStock = product.outOfStock || product.stock === 0
  const badgeClass = outOfStock
    ? 'oos'
    : product.discountPercent > 0
      ? 'sale'
      : product.badge === 'New'
        ? 'new'
        : product.badge === 'Hot'
          ? 'hot'
          : ''
  const badgeText = outOfStock
    ? t('common.outOfStock')
    : product.discountPercent > 0
      ? `-${product.discountPercent}%`
      : p.badgeLabel

  return (
    <article className={`product-card ${outOfStock ? 'is-oos' : ''}`}>
      <div className="product-card-media">
        {badgeText && <span className={`badge ${badgeClass}`}>{badgeText}</span>}
        <Link to={`/product/${product.handle}`}>
          <img className="primary" src={product.images[0]} alt={p.title} loading="lazy" />
          {secondary && <img className="secondary" src={secondary} alt="" loading="lazy" />}
        </Link>
        <div className="product-card-actions">
          {product.hidePrice ? (
            <a className="btn" href={`${brand.whatsappUrl}?text=${encodeURIComponent(p.title)}`} target="_blank" rel="noreferrer">
              {t('common.priceOnRequest')}
            </a>
          ) : (
            <button
              type="button"
              className="btn"
              disabled={outOfStock}
              onClick={() => !outOfStock && addItem(product)}
            >
              {outOfStock ? t('common.outOfStock') : t('common.addToCart')}
            </button>
          )}
        </div>
      </div>
      <div className="product-card-info">
        <Link to={`/product/${product.handle}`}>
          <h3>{p.title}</h3>
        </Link>
        <div className="price-row">
          {product.hidePrice ? (
            <span className="price-hidden">{t('common.priceOnRequest')}</span>
          ) : (
            <>
              <span className={product.compareAt ? 'price-sale' : ''}>
                {formatPrice(product.price, i18n.language)}
              </span>
              {product.compareAt && (
                <span className="price-compare">{formatPrice(product.compareAt, i18n.language)}</span>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}
