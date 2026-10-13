import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { brand } from '../data/brand'
import { formatPrice } from '../data/products'
import { addOrder, getAdminSettings } from '../lib/adminStorage'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: 'Tunis',
  address: '',
  notes: '',
  payment: 'cod',
}

export default function Checkout() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { items, subtotal, clearCart, setQty, removeItem } = useCart()
  const [form, setForm] = useState(emptyForm)
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const settings = getAdminSettings()
  const shipping =
    subtotal >= settings.freeShippingFrom ? 0 : items.length ? settings.deliveryFee : 0
  const total = subtotal + shipping

  const cities = useMemo(
    () => [
      'Tunis',
      'Ariana',
      'Ben Arous',
      'Manouba',
      'Sousse',
      'Sfax',
      'Nabeul',
      'Bizerte',
      'Monastir',
      'Gabès',
    ],
    [],
  )

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!items.length) return
    setPlacing(true)

    const id = `BPA-${Date.now().toString().slice(-8)}`
    const paymentLabel =
      form.payment === 'cod'
        ? t('checkout.payCod')
        : form.payment === 'transfer'
          ? t('checkout.payTransfer')
          : t('checkout.payCard')

    const lines = items
      .map((item) => {
        const title = t(`products.${item.handle}.title`, { defaultValue: item.title })
        return `• ${title} x${item.qty} — ${formatPrice(item.price * item.qty, i18n.language)}`
      })
      .join('\n')

    const message = [
      `🛒 *${t('brand.name')}* — ${t('checkout.title')}`,
      `${t('checkout.orderId')}: *${id}*`,
      '',
      `👤 ${form.firstName} ${form.lastName}`,
      `📞 ${form.phone}`,
      `✉️ ${form.email}`,
      `📍 ${form.address}, ${form.city}`,
      form.notes ? `📝 ${form.notes}` : null,
      '',
      `*${t('checkout.summary')}*`,
      lines,
      '',
      `${t('cart.subtotal')}: ${formatPrice(subtotal, i18n.language)}`,
      `${t('checkout.shipping')}: ${shipping === 0 ? t('checkout.freeShipping') : formatPrice(shipping, i18n.language)}`,
      `${t('checkout.total')}: *${formatPrice(total, i18n.language)}*`,
      `${t('checkout.paymentTitle')}: ${paymentLabel}`,
    ]
      .filter(Boolean)
      .join('\n')

    addOrder({
      id,
      customerName: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      phone: form.phone,
      city: form.city,
      address: form.address,
      notes: form.notes,
      payment: form.payment,
      items: items.map((item) => ({
        handle: item.handle,
        title: t(`products.${item.handle}.title`, { defaultValue: item.title }),
        qty: item.qty,
        price: item.price,
      })),
      subtotal,
      shipping,
      total,
    })

    const waUrl = `${brand.whatsappUrl}?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')

    window.setTimeout(() => {
      setOrderId(id)
      clearCart()
      setPlacing(false)
    }, 400)
  }

  if (orderId) {
    return (
      <div className="checkout-page">
        <div className="page-banner checkout-banner">
          <div className="container">
            <p className="eyebrow">{t('brand.name')}</p>
            <h1>{t('checkout.successTitle')}</h1>
          </div>
        </div>
        <div className="container checkout-success">
          <div className="checkout-success-card">
            <div className="checkout-success-icon" aria-hidden>
              ✓
            </div>
            <h2>{t('checkout.successHeading')}</h2>
            <p>{t('checkout.successText')}</p>
            <div className="checkout-order-id">
              <span>{t('checkout.orderId')}</span>
              <strong>{orderId}</strong>
            </div>
            <div className="checkout-success-actions">
              <a
                href={`${brand.whatsappUrl}?text=${encodeURIComponent(`${t('checkout.orderId')}: ${orderId}`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent"
              >
                WhatsApp
              </a>
              <Link to="/shop" className="btn btn-outline">
                {t('common.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="checkout-page">
        <div className="page-banner checkout-banner">
          <div className="container">
            <p className="eyebrow">{t('brand.name')}</p>
            <h1>{t('checkout.title')}</h1>
          </div>
        </div>
        <div className="container checkout-empty">
          <h2>{t('cart.empty')}</h2>
          <p>{t('checkout.emptyHint')}</p>
          <Link to="/shop" className="btn btn-accent">
            {t('common.continueShopping')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="page-banner checkout-banner">
        <div className="container">
          <p className="eyebrow">{t('brand.name')}</p>
          <h1>{t('checkout.title')}</h1>
          <p className="banner-sub">{t('checkout.subtitle')}</p>
        </div>
      </div>

      <div className="container checkout-layout">
        <form className="checkout-form" onSubmit={onSubmit}>
          <section className="checkout-card">
            <div className="checkout-card-head">
              <span className="checkout-step">1</span>
              <div>
                <h2>{t('checkout.contactTitle')}</h2>
                <p>{t('checkout.contactSub')}</p>
              </div>
            </div>
            <div className="checkout-grid-2">
              <div className="form-row">
                <label htmlFor="firstName">{t('checkout.firstName')}</label>
                <input id="firstName" name="firstName" required value={form.firstName} onChange={onChange} />
              </div>
              <div className="form-row">
                <label htmlFor="lastName">{t('checkout.lastName')}</label>
                <input id="lastName" name="lastName" required value={form.lastName} onChange={onChange} />
              </div>
              <div className="form-row">
                <label htmlFor="email">{t('checkout.email')}</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={onChange} />
              </div>
              <div className="form-row">
                <label htmlFor="phone">{t('checkout.phone')}</label>
                <input
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+216 ..."
                />
              </div>
            </div>
          </section>

          <section className="checkout-card">
            <div className="checkout-card-head">
              <span className="checkout-step">2</span>
              <div>
                <h2>{t('checkout.shippingTitle')}</h2>
                <p>{t('checkout.shippingSub')}</p>
              </div>
            </div>
            <div className="checkout-grid-2">
              <div className="form-row">
                <label htmlFor="city">{t('checkout.city')}</label>
                <select id="city" name="city" required value={form.city} onChange={onChange}>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="address">{t('checkout.address')}</label>
                <input id="address" name="address" required value={form.address} onChange={onChange} />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="notes">{t('checkout.notes')}</label>
              <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={onChange} />
            </div>
          </section>

          <section className="checkout-card">
            <div className="checkout-card-head">
              <span className="checkout-step">3</span>
              <div>
                <h2>{t('checkout.paymentTitle')}</h2>
                <p>{t('checkout.paymentSub')}</p>
              </div>
            </div>
            <div className="payment-options">
              {[
                { id: 'cod', label: t('checkout.payCod'), hint: t('checkout.payCodHint') },
                { id: 'transfer', label: t('checkout.payTransfer'), hint: t('checkout.payTransferHint') },
                { id: 'card', label: t('checkout.payCard'), hint: t('checkout.payCardHint') },
              ].map((opt) => (
                <label key={opt.id} className={`payment-option ${form.payment === opt.id ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={opt.id}
                    checked={form.payment === opt.id}
                    onChange={onChange}
                  />
                  <span>
                    <strong>{opt.label}</strong>
                    <small>{opt.hint}</small>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <div className="checkout-submit-row">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/shop')}>
              {t('common.continueShopping')}
            </button>
            <button type="submit" className="btn btn-accent checkout-place-btn" disabled={placing}>
              {placing ? t('checkout.placing') : t('checkout.placeOrder')}
            </button>
          </div>
        </form>

        <aside className="checkout-summary">
          <div className="checkout-summary-card">
            <h2>{t('checkout.summary')}</h2>
            <div className="checkout-lines">
              {items.map((item) => {
                const title = t(`products.${item.handle}.title`, { defaultValue: item.title })
                return (
                  <div className="checkout-line" key={item.handle}>
                    <img src={item.image} alt="" />
                    <div className="checkout-line-info">
                      <strong>{title}</strong>
                      <div className="checkout-line-meta">
                        <div className="qty-control compact">
                          <button type="button" onClick={() => setQty(item.handle, item.qty - 1)} aria-label="-">
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button type="button" onClick={() => setQty(item.handle, item.qty + 1)} aria-label="+">
                            +
                          </button>
                        </div>
                        <button type="button" className="checkout-remove" onClick={() => removeItem(item.handle)}>
                          {t('cart.remove')}
                        </button>
                      </div>
                    </div>
                    <div className="checkout-line-price">
                      {formatPrice(item.price * item.qty, i18n.language)}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="checkout-totals">
              <div>
                <span>{t('cart.subtotal')}</span>
                <span>{formatPrice(subtotal, i18n.language)}</span>
              </div>
              <div>
                <span>{t('checkout.shipping')}</span>
                <span>{shipping === 0 ? t('checkout.freeShipping') : formatPrice(shipping, i18n.language)}</span>
              </div>
              <div className="checkout-total">
                <span>{t('checkout.total')}</span>
                <strong>{formatPrice(total, i18n.language)}</strong>
              </div>
            </div>

            <div className="checkout-trust">
              <p>{t('checkout.trustSecure')}</p>
              <p>{t('checkout.trustDelivery')}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
