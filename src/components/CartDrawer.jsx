import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { IconClose } from './Icons'

export default function CartDrawer() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { items, isOpen, setIsOpen, removeItem, setQty, subtotal, clearCart } = useCart()

  const goCheckout = () => {
    setIsOpen(false)
    navigate('/checkout')
  }

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <button
        type="button"
        className="drawer-backdrop"
        aria-label={t('cart.close')}
        onClick={() => setIsOpen(false)}
      />
      <aside className="cart-panel" role="dialog" aria-label={t('header.cart')}>
        <div className="cart-header">
          <h3>{t('cart.title', { count: items.length })}</h3>
          <button type="button" className="icon-btn" onClick={() => setIsOpen(false)} aria-label={t('common.close')}>
            <IconClose />
          </button>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>{t('cart.empty')}</p>
              <Link to="/shop" className="btn" onClick={() => setIsOpen(false)}>
                {t('common.continueShopping')}
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const title = t(`products.${item.handle}.title`, { defaultValue: item.title })
              return (
                <div className="cart-line" key={item.handle}>
                  <Link to={`/product/${item.handle}`} onClick={() => setIsOpen(false)}>
                    <img src={item.image} alt={title} />
                  </Link>
                  <div>
                    <Link to={`/product/${item.handle}`} onClick={() => setIsOpen(false)}>
                      <h4>{title}</h4>
                    </Link>
                    <div>{formatPrice(item.price, i18n.language)}</div>
                    <div className="qty-control">
                      <button
                        type="button"
                        onClick={() => setQty(item.handle, item.qty - 1)}
                        aria-label={t('cart.decrease')}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.handle, item.qty + 1)}
                        aria-label={t('cart.increase')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => removeItem(item.handle)}
                      aria-label={t('cart.remove')}
                    >
                      <IconClose />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>{t('cart.subtotal')}</span>
              <span>{formatPrice(subtotal, i18n.language)}</span>
            </div>
            <button type="button" className="btn" style={{ width: '100%', marginBottom: '0.65rem' }} onClick={goCheckout}>
              {t('cart.checkout')}
            </button>
            <button type="button" className="btn btn-outline" style={{ width: '100%' }} onClick={clearCart}>
              {t('cart.clear')}
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
