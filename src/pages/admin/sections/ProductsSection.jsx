import { useMemo, useRef, useState } from 'react'
import { ImagePlus, Pencil, Plus, Search, Star, Trash2, Upload } from 'lucide-react'
import {
  addCustomProduct,
  clearProductOverride,
  getAdminCatalogRows,
  getAdminCategories,
  getProductOverrides,
  removeCatalogProduct,
  setProductOverride,
  updateCustomProduct,
} from '../../../lib/adminStorage'
import { filesToProductDataUrls } from '../../../lib/productImages'
import { products as seedProducts } from '../../../data/products'
import { tAdmin } from '../adminI18n'

const emptyDraft = (cats) => ({
  title: '',
  category: cats[0]?.slug || 'Maison',
  price: '',
  discountPercent: '',
  stock: '25',
  description: '',
  urlDraft: '',
  images: [],
  hidePrice: false,
})

export default function ProductsSection({ lang, onChange }) {
  const t = (k) => tAdmin(lang, k)
  const catalog = getAdminCatalogRows()
  const overrides = getProductOverrides()
  const cats = getAdminCategories()
  const fileRef = useRef(null)
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [draft, setDraft] = useState(() => emptyDraft(cats))

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return catalog
    return catalog.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.handle.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s),
    )
  }, [catalog, q])

  const resetForm = () => {
    setEditing(null)
    setDraft(emptyDraft(cats))
    if (fileRef.current) fileRef.current.value = ''
  }

  const openNew = () => {
    resetForm()
    setOpen(true)
  }

  const openEdit = (p) => {
    setEditing(p)
    setDraft({
      title: p.title,
      category: p.category,
      price: String(p.price ?? ''),
      discountPercent: String(p.discountPercent || 0),
      stock: String(p.stock ?? 25),
      description: p.description || '',
      urlDraft: '',
      images: [...(p.images || []).filter(Boolean)],
      hidePrice: Boolean(p.hidePrice),
    })
    setOpen(true)
  }

  const onFiles = async (e) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    try {
      const { urls, large } = await filesToProductDataUrls(files)
      if (!urls.length) {
        alert(lang === 'en' ? 'No valid images' : 'Aucune image valide')
        return
      }
      setDraft((d) => ({ ...d, images: [...d.images, ...urls] }))
      if (large) alert(t('photosLarge'))
    } catch {
      alert(lang === 'en' ? 'Upload failed' : 'Échec de l’import')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const addUrl = () => {
    const url = draft.urlDraft.trim()
    if (!url) return
    setDraft((d) => ({ ...d, images: [...d.images, url], urlDraft: '' }))
  }

  const removeAt = (idx) => {
    setDraft((d) => ({ ...d, images: d.images.filter((_, i) => i !== idx) }))
  }

  const setCover = (idx) => {
    if (idx === 0) return
    setDraft((d) => {
      const next = [...d.images]
      const [item] = next.splice(idx, 1)
      next.unshift(item)
      return { ...d, images: next }
    })
  }

  const deleteProduct = (product) => {
    const name = product?.title || editing?.title || ''
    const ok = confirm(
      lang === 'en'
        ? `Delete « ${name} »?`
        : lang === 'ar'
          ? `حذف « ${name} »؟`
          : `Supprimer « ${name} » ?`,
    )
    if (!ok) return
    removeCatalogProduct(product.handle)
    if (editing?.handle === product.handle) {
      setOpen(false)
      resetForm()
    }
    onChange()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const images = draft.images.filter(Boolean)
    if (!images.length) {
      alert(t('needPhoto'))
      return
    }
    const payload = {
      title: draft.title.trim(),
      category: draft.category,
      price: Number(draft.price),
      discountPercent: Number(draft.discountPercent) || 0,
      stock: Number(draft.stock) || 0,
      description: draft.description,
      hidePrice: draft.hidePrice,
      images,
    }

    if (editing) {
      if (editing.custom) {
        updateCustomProduct(editing.handle, payload)
      } else {
        setProductOverride(editing.handle, {
          ...payload,
          updatedAt: Date.now(),
        })
      }
    } else {
      addCustomProduct({
        ...payload,
        images: images.length ? images : seedProducts[0]?.images?.slice(0, 1) || [],
      })
    }

    resetForm()
    setOpen(false)
    onChange()
  }

  return (
    <div className="admin-stack">
      <div className="admin-card-head" style={{ marginBottom: 0 }}>
        <div className="admin-search-wrap">
          <Search />
          <input className="admin-search" placeholder={t('search')} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openNew}>
          <Plus size={16} /> {t('newProduct')}
        </button>
      </div>

      {open && (
        <div
          className="admin-modal-backdrop"
          onClick={() => {
            setOpen(false)
            resetForm()
          }}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 720 }}>
            <h3>{editing ? t('editProduct') : t('newProduct')}</h3>
            <p className="admin-muted">{t('uploadHint')}</p>
            <form className="admin-form-grid" onSubmit={onSubmit}>
              <label className="span-2">
                {t('title')}
                <input required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              </label>
              <label>
                {t('category')}
                <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
                  {cats.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {lang === 'en' ? c.nameEn : lang === 'ar' ? c.nameAr : c.nameFr}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t('price')}
                <input
                  required
                  type="number"
                  min="0"
                  value={draft.price}
                  onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                />
              </label>
              <label>
                {t('discount')}
                <input
                  type="number"
                  min="0"
                  max="90"
                  value={draft.discountPercent}
                  onChange={(e) => setDraft({ ...draft, discountPercent: e.target.value })}
                />
              </label>
              <label>
                Stock
                <input
                  type="number"
                  min="0"
                  value={draft.stock}
                  onChange={(e) => setDraft({ ...draft, stock: e.target.value })}
                />
              </label>

              <div className="span-2 admin-photos-block">
                <div className="admin-photos-head">
                  <strong>
                    {t('photos')} ({draft.images.length})
                  </strong>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={onFiles}
                    />
                    <button
                      type="button"
                      className="admin-btn admin-btn-primary admin-btn-sm"
                      disabled={uploading}
                      onClick={() => fileRef.current?.click()}
                    >
                      <Upload size={14} />
                      {uploading ? '…' : t('uploadPhotos')}
                    </button>
                  </div>
                </div>

                {draft.images.length > 0 ? (
                  <div className="admin-photo-grid">
                    {draft.images.map((src, idx) => (
                      <div key={`${idx}-${src.slice(0, 24)}`} className={`admin-photo-tile ${idx === 0 ? 'is-cover' : ''}`}>
                        <img src={src} alt="" />
                        {idx === 0 && <span className="admin-photo-badge">{t('cover')}</span>}
                        <div className="admin-photo-actions">
                          {idx !== 0 && (
                            <button type="button" title={t('setCover')} onClick={() => setCover(idx)}>
                              <Star size={14} />
                            </button>
                          )}
                          <button type="button" title={t('removePhoto')} onClick={() => removeAt(idx)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="admin-photo-drop"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                  >
                    <ImagePlus size={28} />
                    <span>{t('uploadPhotos')}</span>
                    <small>{t('uploadHint')}</small>
                  </button>
                )}

                <div className="admin-url-row">
                  <input
                    value={draft.urlDraft}
                    onChange={(e) => setDraft({ ...draft, urlDraft: e.target.value })}
                    placeholder={t('imageUrl') + ' https://…'}
                  />
                  <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addUrl}>
                    {t('addUrl')}
                  </button>
                </div>
              </div>

              <label className="span-2">
                {t('description')}
                <input
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                />
              </label>
              <div className="span-2 switch-row">
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>{t('hidePrice')}</strong>
                  <p>{lang === 'en' ? 'Hide amount on storefront cards.' : 'Masquer le montant sur la boutique.'}</p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.hidePrice}
                  onChange={(e) => setDraft({ ...draft, hidePrice: e.target.checked })}
                />
              </div>
              <div className="span-2 admin-modal-actions" style={{ justifyContent: 'space-between' }}>
                {editing ? (
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    onClick={() => deleteProduct(editing)}
                  >
                    <Trash2 size={16} /> {t('delete')}
                  </button>
                ) : (
                  <span />
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="admin-btn admin-btn-outline"
                    onClick={() => {
                      setOpen(false)
                      resetForm()
                    }}
                  >
                    {t('cancel')}
                  </button>
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
                    {editing ? t('save') : t('add')}
                  </button>
                </div>
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
                <th>{t('products')}</th>
                <th>{t('category')}</th>
                <th>{t('price')}</th>
                <th>{t('discount')}</th>
                <th>{t('hidePrice')}</th>
                <th>{t('active')}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const o = overrides[p.handle] || {}
                const isCustom = Boolean(p.custom)
                return (
                  <tr key={p.handle}>
                    <td>
                      <div className="admin-prod-cell">
                        {p.images?.[0] && <img src={p.images[0]} alt="" />}
                        <div>
                          <strong>{p.title}</strong>
                          <span className="mono">{p.handle}</span>
                          {p.images?.length > 1 && (
                            <span className="admin-muted" style={{ fontSize: '0.72rem' }}>
                              {p.images.length} photos
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <select
                        value={p.category}
                        onChange={(e) => {
                          if (isCustom) updateCustomProduct(p.handle, { category: e.target.value })
                          else setProductOverride(p.handle, { category: e.target.value })
                          onChange()
                        }}
                      >
                        {cats.map((c) => (
                          <option key={c.id} value={c.slug}>
                            {c.nameFr}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="admin-inline narrow"
                        defaultValue={p.price}
                        key={`${p.handle}-price-${p.price}`}
                        onBlur={(e) => {
                          const price = Number(e.target.value)
                          if (Number.isNaN(price)) return
                          if (isCustom) updateCustomProduct(p.handle, { price })
                          else setProductOverride(p.handle, { price })
                          onChange()
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="90"
                        className="admin-inline narrow"
                        defaultValue={p.discountPercent || 0}
                        key={`${p.handle}-disc-${p.discountPercent}`}
                        onBlur={(e) => {
                          const discountPercent = Math.min(90, Math.max(0, Number(e.target.value) || 0))
                          if (isCustom) updateCustomProduct(p.handle, { discountPercent })
                          else setProductOverride(p.handle, { discountPercent })
                          onChange()
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={Boolean(p.hidePrice)}
                        onChange={(e) => {
                          if (isCustom) updateCustomProduct(p.handle, { hidePrice: e.target.checked })
                          else setProductOverride(p.handle, { hidePrice: e.target.checked })
                          onChange()
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={p.active !== false}
                        onChange={(e) => {
                          if (isCustom) updateCustomProduct(p.handle, { active: e.target.checked })
                          else setProductOverride(p.handle, { active: e.target.checked })
                          onChange()
                        }}
                      />
                    </td>
                    <td>
                      <div style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="admin-btn admin-btn-outline admin-btn-sm"
                          onClick={() => openEdit(p)}
                          title={t('edit')}
                        >
                          <Pencil size={14} /> {t('edit')}
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={() => deleteProduct(p)}
                          title={t('delete')}
                        >
                          <Trash2 size={14} /> {t('delete')}
                        </button>
                        {!isCustom &&
                        (o.price != null ||
                          o.discountPercent ||
                          o.category ||
                          o.hidePrice ||
                          o.images) ? (
                          <button
                            type="button"
                            className="admin-btn admin-btn-ghost admin-btn-sm"
                            onClick={() => {
                              clearProductOverride(p.handle)
                              onChange()
                            }}
                          >
                            {t('reset')}
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="admin-empty">{t('none')}</p>}
        </div>
      </section>
    </div>
  )
}
