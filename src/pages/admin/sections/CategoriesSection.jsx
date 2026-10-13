import { useState } from 'react'
import { Plus, Sparkles, Trash2 } from 'lucide-react'
import {
  addAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  updateAdminCategory,
} from '../../../lib/adminStorage'
import { translateCategoryLabels } from '../../../lib/aiCategoryLabels'
import { tAdmin } from '../adminI18n'

export default function CategoriesSection({ lang, onChange }) {
  const t = (k) => tAdmin(lang, k)
  const cats = getAdminCategories()
  const [form, setForm] = useState({ slug: '', nameFr: '', nameEn: '', nameAr: '' })
  const [aiLoading, setAiLoading] = useState(false)

  const onAdd = (e) => {
    e.preventDefault()
    const row = addAdminCategory(form)
    if (!row) {
      alert(lang === 'en' ? 'Invalid or duplicate slug' : 'Slug invalide ou déjà utilisé')
      return
    }
    setForm({ slug: '', nameFr: '', nameEn: '', nameAr: '' })
    onChange()
  }

  const onAiTranslate = async () => {
    const source = (form.nameFr || form.slug || '').trim()
    if (!source) {
      alert(t('aiNeedText'))
      return
    }
    setAiLoading(true)
    try {
      const triplet = await translateCategoryLabels(source)
      setForm((f) => ({
        slug: f.slug.trim() || source.replace(/\s+/g, '-'),
        nameFr: triplet.labelFr,
        nameEn: triplet.labelEn,
        nameAr: triplet.labelAr,
      }))
      alert(t('aiOk'))
    } catch {
      alert(t('aiFail'))
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="admin-stack">
      <section className="admin-card">
        <h2>{t('addCategory')}</h2>
        <p className="admin-card-sub">{t('categoryHint')}</p>
        <form className="admin-form-grid cols-4" onSubmit={onAdd}>
          <label>
            {t('slug')}
            <input
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="maison"
            />
          </label>
          <label>
            {t('labelFr')}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                required
                value={form.nameFr}
                onChange={(e) => setForm({ ...form, nameFr: e.target.value })}
                placeholder="Maison"
                style={{ flex: 1, minWidth: 0 }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-outline"
                disabled={aiLoading || !(form.slug.trim() || form.nameFr.trim())}
                onClick={onAiTranslate}
                title={t('aiTranslate')}
                style={{
                  paddingInline: 12,
                  borderColor: 'rgba(255,153,0,0.45)',
                  background: 'rgba(255,153,0,0.1)',
                  color: '#b86b00',
                }}
              >
                {aiLoading ? '…' : <Sparkles size={16} />}
              </button>
            </div>
          </label>
          <label>
            {t('labelEn')}
            <input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} />
          </label>
          <label>
            {t('labelAr')}
            <input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} />
          </label>
          <div className="span-2" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <Plus size={16} /> {t('add')}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              disabled={aiLoading || !(form.slug.trim() || form.nameFr.trim())}
              onClick={onAiTranslate}
              style={{
                borderColor: 'rgba(255,153,0,0.45)',
                background: 'rgba(255,153,0,0.1)',
                color: '#b86b00',
              }}
            >
              <Sparkles size={16} />
              {aiLoading ? '…' : t('aiTranslate')}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 18px', borderBottom: '1px solid #e6ebf0' }}>
          <h2 className="admin-card-title">
            {t('customCategories')} ({cats.length})
          </h2>
        </div>
        <div className="admin-table-wrap" style={{ marginTop: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('slug')}</th>
                <th>FR</th>
                <th>EN</th>
                <th>AR</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.id}>
                  <td className="mono accent">{c.slug}</td>
                  <td>
                    <input
                      className="admin-inline"
                      value={c.nameFr}
                      onChange={(e) => {
                        updateAdminCategory(c.id, { nameFr: e.target.value })
                        onChange()
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="admin-inline"
                      value={c.nameEn}
                      onChange={(e) => {
                        updateAdminCategory(c.id, { nameEn: e.target.value })
                        onChange()
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="admin-inline"
                      value={c.nameAr}
                      onChange={(e) => {
                        updateAdminCategory(c.id, { nameAr: e.target.value })
                        onChange()
                      }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => {
                        if (!confirm(`${t('delete')} « ${c.slug} » ?`)) return
                        deleteAdminCategory(c.id)
                        onChange()
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {cats.length === 0 && <p className="admin-empty">{t('none')}</p>}
        </div>
      </section>
    </div>
  )
}
