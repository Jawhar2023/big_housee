import { useMemo, useState } from 'react'
import { Eye, Plus, Search, Trash2 } from 'lucide-react'
import {
  addManualCustomer,
  deleteManualCustomer,
  deriveCustomersFromOrders,
  formatAdminDT,
  formatReceivedAt,
  getCustomerProfileForDerivedKey,
  getCustomerProfileForManual,
  getManualCustomers,
  getOrders,
  updateManualCustomer,
} from '../../../lib/adminStorage'
import { tAdmin } from '../adminI18n'

export default function CustomersSection({ lang, onChange }) {
  const t = (k) => tAdmin(lang, k)
  const orders = getOrders()
  const derived = deriveCustomersFromOrders(orders)
  const manual = getManualCustomers()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', notes: '' })
  const [profileTarget, setProfileTarget] = useState(null)

  const rows = useMemo(() => {
    const fromOrder = derived.map((c) => ({
      id: `d-${c.key}`,
      kind: 'derived',
      key: c.key,
      name: c.name,
      email: c.email || '—',
      phone: c.phone,
      address: c.address || '—',
      source: t('sourceOrder'),
      bookings: c.bookingCount,
      joined: c.joined ? new Date(c.joined).toISOString().slice(0, 10) : '—',
    }))
    const fromManual = manual.map((m) => ({
      id: m.id,
      kind: 'manual',
      key: m.id,
      name: m.name,
      email: m.email,
      phone: m.phone,
      address: m.address || '—',
      source: t('sourceManual'),
      bookings: 0,
      joined: m.createdAt ? new Date(m.createdAt).toISOString().slice(0, 10) : '—',
    }))
    const merged = [...fromManual, ...fromOrder]
    const s = q.trim().toLowerCase()
    if (!s) return merged
    return merged.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.email.toLowerCase().includes(s) ||
        String(r.phone).toLowerCase().includes(s),
    )
  }, [derived, manual, q, lang])

  const profile = useMemo(() => {
    if (!profileTarget) return null
    if (profileTarget.kind === 'manual') return getCustomerProfileForManual(profileTarget.key, orders)
    return getCustomerProfileForDerivedKey(profileTarget.key, orders)
  }, [profileTarget, orders])

  const submit = (e) => {
    e.preventDefault()
    addManualCustomer(form)
    setOpen(false)
    setForm({ name: '', email: '', phone: '', address: '', notes: '' })
    onChange()
  }

  return (
    <div className="admin-stack">
      <div className="admin-card-head" style={{ marginBottom: 0 }}>
        <div className="admin-search-wrap">
          <Search />
          <input className="admin-search" placeholder={t('search')} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={() => setOpen(true)}>
          <Plus size={16} /> {t('newCustomer')}
        </button>
      </div>

      {open && (
        <div className="admin-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{t('newCustomer')}</h3>
            <form className="admin-form-grid" onSubmit={submit}>
              <label>
                {t('name')}
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>
                {t('email')}
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label>
                {t('phone')}
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
              <label>
                {t('address')}
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </label>
              <label className="span-2">
                {t('notes')}
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </label>
              <div className="span-2 admin-modal-actions">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setOpen(false)}>
                  {t('cancel')}
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap" style={{ marginTop: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('customer')}</th>
                <th>{t('address')}</th>
                <th>{t('sourceOrder')}</th>
                <th>{t('orders')}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.name}</strong>
                    <div className="admin-muted" style={{ fontSize: '0.8rem' }}>
                      {r.email}
                      <br />
                      {r.phone}
                    </div>
                  </td>
                  <td style={{ maxWidth: 200, fontSize: '0.82rem', color: '#64748b' }}>{r.address}</td>
                  <td>{r.source}</td>
                  <td>{r.bookings}</td>
                  <td>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn-outline admin-btn-sm"
                        onClick={() => setProfileTarget({ kind: r.kind, key: r.key })}
                      >
                        <Eye size={14} /> {t('profile')}
                      </button>
                      {r.kind === 'manual' && (
                        <button
                          type="button"
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={() => {
                            deleteManualCustomer(r.key)
                            onChange()
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="admin-empty">{t('none')}</p>}
        </div>
      </section>

      {profile && (
        <div className="admin-modal-backdrop" onClick={() => setProfileTarget(null)}>
          <div className="admin-modal wide" onClick={(e) => e.stopPropagation()}>
            <ProfileView profile={profile} lang={lang} onChange={onChange} onClose={() => setProfileTarget(null)} />
          </div>
        </div>
      )}
    </div>
  )
}

function ProfileView({ profile, lang, onChange, onClose }) {
  const t = (k) => tAdmin(lang, k)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    notes: profile.notes,
  })
  const initials =
    (profile.name || '?')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('') || '?'

  const save = () => {
    if (!profile.manualId) return
    updateManualCustomer(profile.manualId, form)
    setEditing(false)
    onChange()
  }

  return (
    <>
      <div className="profile-hero">
        <div className="profile-hero-row">
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div className="profile-avatar">{initials}</div>
            <div>
              <h3 style={{ margin: 0 }}>{profile.name}</h3>
              <p className="admin-muted" style={{ margin: '4px 0 0' }}>
                {profile.source === 'manual' ? t('sourceManual') : t('sourceOrder')} · {profile.joined}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {profile.source === 'manual' && (
              <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => (editing ? save() : setEditing(true))}>
                {editing ? t('save') : t('edit')}
              </button>
            )}
            <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={onClose}>
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-stats">
          <div className="profile-stat">
            <span>{t('orders')}</span>
            <strong>{profile.bookingCount}</strong>
          </div>
          <div className="profile-stat">
            <span>{t('spent')}</span>
            <strong>{formatAdminDT(profile.totalSpentTND, lang)}</strong>
          </div>
          <div className="profile-stat">
            <span>{t('pending')}</span>
            <strong>{profile.pendingBookings}</strong>
          </div>
          <div className="profile-stat">
            <span>{t('lastOrder')}</span>
            <strong style={{ fontSize: '0.85rem' }}>
              {profile.lastOrderAt ? formatReceivedAt(profile.lastOrderAt, lang).split(',')[0] : '—'}
            </strong>
          </div>
        </div>

        {editing ? (
          <div className="admin-form-grid">
            <label>
              {t('name')}
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              {t('email')}
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label>
              {t('phone')}
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>
            <label>
              {t('address')}
              <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </label>
            <label className="span-2">
              {t('notes')}
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </label>
          </div>
        ) : (
          <div className="admin-card" style={{ boxShadow: 'none' }}>
            <p style={{ margin: '0 0 6px' }}>
              <strong>{t('email')}:</strong> {profile.email || '—'}
            </p>
            <p style={{ margin: '0 0 6px' }}>
              <strong>{t('phone')}:</strong> {profile.phone || '—'}
            </p>
            <p style={{ margin: '0 0 6px' }}>
              <strong>{t('address')}:</strong> {profile.address || '—'}
            </p>
            <p style={{ margin: 0 }}>
              <strong>{t('notes')}:</strong> {profile.notes || '—'}
            </p>
          </div>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{t('status')}</th>
                <th style={{ textAlign: 'right' }}>{t('total')}</th>
              </tr>
            </thead>
            <tbody>
              {profile.bookings.map((b) => (
                <tr key={b.id}>
                  <td className="mono">{b.id}</td>
                  <td>
                    <span className={`admin-pill ${b.status}`}>{b.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>{formatAdminDT(b.total, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {profile.bookings.length === 0 && <p className="admin-empty">{t('noOrders')}</p>}
        </div>
      </div>
    </>
  )
}
