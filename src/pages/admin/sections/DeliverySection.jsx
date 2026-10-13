import { useState } from 'react'
import { formatAdminDT, getAdminSettings, updateAdminSettings } from '../../../lib/adminStorage'
import { tAdmin } from '../adminI18n'

export default function DeliverySection({ lang, onChange }) {
  const t = (k) => tAdmin(lang, k)
  const settings = getAdminSettings()
  const [deliveryFee, setDeliveryFee] = useState(String(settings.deliveryFee))
  const [freeShippingFrom, setFreeShippingFrom] = useState(String(settings.freeShippingFrom))
  const [lowStockThreshold, setLowStockThreshold] = useState(String(settings.lowStockThreshold ?? 5))

  const save = (e) => {
    e.preventDefault()
    updateAdminSettings({
      deliveryFee: Number(deliveryFee),
      freeShippingFrom: Number(freeShippingFrom),
      lowStockThreshold: Number(lowStockThreshold),
    })
    onChange()
    alert(t('saved'))
  }

  return (
    <section className="admin-card">
      <h2>{t('deliveryTitle')}</h2>
      <p className="admin-card-sub">{t('deliverySub')}</p>
      <form className="admin-form-grid" onSubmit={save}>
        <label>
          {t('deliveryFee')}
          <input type="number" min="0" step="1" required value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} />
        </label>
        <label>
          {t('freeFrom')}
          <input
            type="number"
            min="0"
            step="1"
            required
            value={freeShippingFrom}
            onChange={(e) => setFreeShippingFrom(e.target.value)}
          />
        </label>
        <label>
          {t('lowStock')} ≤
          <input
            type="number"
            min="0"
            step="1"
            required
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" className="admin-btn admin-btn-primary">
            {t('save')}
          </button>
        </div>
      </form>
      <div className="admin-delivery-preview">
        <p>
          {lang === 'en' ? 'Example cart 200 DT → delivery' : 'Exemple panier 200 DT → livraison'}{' '}
          <strong>{formatAdminDT(Number(deliveryFee) || 0, lang)}</strong>
        </p>
        <p>
          {lang === 'en' ? 'Cart ≥' : 'Panier ≥'} {freeShippingFrom} DT → <strong>{t('free')}</strong>
        </p>
      </div>
    </section>
  )
}
