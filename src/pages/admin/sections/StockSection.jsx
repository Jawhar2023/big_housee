import { useMemo, useState } from 'react'
import { adjustStock, getAdminCatalogRows, getAdminSettings } from '../../../lib/adminStorage'
import { tAdmin } from '../adminI18n'

export default function StockSection({ lang, onChange }) {
  const t = (k) => tAdmin(lang, k)
  const settings = getAdminSettings()
  const threshold = settings.lowStockThreshold ?? 5
  const rows = getAdminCatalogRows()
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    let data = [...rows]
    if (filter === 'low') data = data.filter((p) => p.stock > 0 && p.stock <= threshold)
    if (filter === 'out') data = data.filter((p) => p.stock <= 0)
    const s = q.trim().toLowerCase()
    if (s) data = data.filter((p) => p.title.toLowerCase().includes(s) || p.handle.toLowerCase().includes(s))
    return data.sort((a, b) => a.stock - b.stock)
  }, [rows, filter, q, threshold])

  return (
    <div className="admin-stack">
      <div className="admin-card-head" style={{ marginBottom: 0 }}>
        <div className="admin-filters">
          <button type="button" className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            {t('allStock')}
          </button>
          <button type="button" className={filter === 'low' ? 'active' : ''} onClick={() => setFilter('low')}>
            {t('lowStock')} (≤{threshold})
          </button>
          <button type="button" className={filter === 'out' ? 'active' : ''} onClick={() => setFilter('out')}>
            {t('outOfStock')}
          </button>
        </div>
        <input className="admin-search" style={{ maxWidth: 260 }} placeholder={t('search')} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <section className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap" style={{ marginTop: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('products')}</th>
                <th>{t('category')}</th>
                <th>{t('stockLevel')}</th>
                <th>{t('adjust')}</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.handle}>
                  <td>
                    <div className="admin-prod-cell">
                      {p.images?.[0] && <img src={p.images[0]} alt="" />}
                      <div>
                        <strong>{p.title}</strong>
                        <span className="mono">{p.handle}</span>
                      </div>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td className={p.stock <= 0 ? 'stock-out' : p.stock <= threshold ? 'stock-low' : ''}>{p.stock}</td>
                  <td>
                    <div className="stock-actions">
                      <button
                        type="button"
                        onClick={() => {
                          adjustStock(p.handle, p.stock - 1)
                          onChange()
                        }}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="admin-inline narrow"
                        defaultValue={p.stock}
                        key={`${p.handle}-${p.stock}`}
                        onBlur={(e) => {
                          adjustStock(p.handle, e.target.value)
                          onChange()
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          adjustStock(p.handle, p.stock + 1)
                          onChange()
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <p className="admin-empty">{t('none')}</p>}
        </div>
      </section>
    </div>
  )
}
