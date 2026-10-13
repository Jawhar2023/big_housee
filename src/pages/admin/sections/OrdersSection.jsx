import { useMemo, useState } from 'react'
import { FileDown, Trash2 } from 'lucide-react'
import {
  deleteOrder,
  downloadOrdersCsv,
  formatAdminDT,
  formatReceivedAt,
  getOrders,
  updateOrderStatus,
} from '../../../lib/adminStorage'
import { tAdmin } from '../adminI18n'

const FILTERS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']

export default function OrdersSection({ lang, onChange }) {
  const t = (k) => tAdmin(lang, k)
  const orders = getOrders()
  const [filter, setFilter] = useState('all')
  const list = useMemo(
    () => (filter === 'all' ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter],
  )

  return (
    <div className="admin-stack">
      <div className="admin-card-head" style={{ marginBottom: 0 }}>
        <div className="admin-filters">
          {FILTERS.map((s) => (
            <button key={s} type="button" className={filter === s ? 'active' : ''} onClick={() => setFilter(s)}>
              {s === 'all' ? t('all') : s}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-outline"
          onClick={() => {
            downloadOrdersCsv(orders, lang)
            alert(t('exportOk'))
          }}
        >
          <FileDown size={16} /> {t('exportCsv')}
        </button>
      </div>

      {list.length === 0 ? (
        <section className="admin-card">
          <p className="admin-empty" style={{ padding: 24 }}>
            {t('noOrders')}
          </p>
        </section>
      ) : (
        list.map((o) => (
          <section key={o.id} className="admin-card order-card">
            <div className="order-card-inner">
              <div className="order-card-top">
                <div>
                  <p className="mono accent" style={{ margin: 0, fontWeight: 700 }}>
                    {o.id}
                  </p>
                  <p className="admin-muted" style={{ margin: '4px 0 0' }}>
                    {formatReceivedAt(o.createdAt, lang)}
                  </p>
                </div>
                <div className="order-card-actions">
                  <select
                    value={o.status}
                    onChange={(e) => {
                      updateOrderStatus(o.id, e.target.value)
                      onChange()
                    }}
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => {
                      deleteOrder(o.id)
                      onChange()
                    }}
                  >
                    <Trash2 size={14} /> {t('delete')}
                  </button>
                </div>
              </div>
              <div className="order-grid">
                <div>
                  <span>{t('customer')}</span>
                  <strong>{o.customerName}</strong>
                </div>
                <div>
                  <span>{t('phone')}</span>
                  <strong>{o.phone}</strong>
                </div>
                <div>
                  <span>{t('city')}</span>
                  <strong>{o.city || '—'}</strong>
                </div>
                <div>
                  <span>{t('total')}</span>
                  <strong>{formatAdminDT(o.total, lang)}</strong>
                </div>
              </div>
              <ul className="order-items">
                {(o.items || []).map((it) => (
                  <li key={`${o.id}-${it.handle}`}>
                    {it.qty}× {it.title} — {formatAdminDT((it.price || 0) * (it.qty || 1), lang)}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))
      )}
    </div>
  )
}
