import { products as seedProducts } from '../data/products'

const KEY = 'bpa-admin-v2'
const LEGACY_KEY = 'bpa-admin-v1'
const EVT = 'bpa-admin-storage'
const DEFAULT_STOCK = 25
const DEFAULT_LOW = 5

const DEFAULT_SETTINGS = {
  deliveryFee: 12,
  freeShippingFrom: 299,
  storeName: 'Big House',
  lowStockThreshold: DEFAULT_LOW,
}

const DEFAULT_CATEGORIES = [...new Set(seedProducts.map((product) => product.category))].map((name, index) => ({
  id: `cat-${index + 1}`,
  slug: name,
  nameFr: name,
  nameEn: name,
  nameAr: name,
}))

const PIE_COLORS = ['#D9A12E', '#38251A', '#734225', '#A66B3F', '#E2C58A', '#8C5B3D', '#C98E55', '#5B3927']

function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

function read() {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
  window.dispatchEvent(new Event(EVT))
}

function ensure() {
  const cur = read()
  if (cur?.settings && cur?.categories && cur?.overrides && Array.isArray(cur?.orders)) {
    if ((cur.catalogVersion || 0) < 2) {
      cur.settings.storeName = 'Big House'
      cur.categories = DEFAULT_CATEGORIES
      cur.overrides = {}
      cur.customProducts = []
      cur.removedHandles = []
      cur.catalogVersion = 2
    }
    if (cur.catalogVersion < 3) {
      const existingSlugs = new Set(cur.categories.map((category) => category.slug.toLowerCase()))
      cur.categories = [
        ...cur.categories,
        ...DEFAULT_CATEGORIES.filter((category) => !existingSlugs.has(category.slug.toLowerCase())),
      ]
      cur.catalogVersion = 3
      write(cur)
    }
    if (!Array.isArray(cur.customProducts)) cur.customProducts = []
    if (!Array.isArray(cur.manualCustomers)) cur.manualCustomers = []
    if (!Array.isArray(cur.removedHandles)) cur.removedHandles = []
    if (cur.settings.lowStockThreshold == null) cur.settings.lowStockThreshold = DEFAULT_LOW
    return cur
  }
  const seed = {
    settings: { ...DEFAULT_SETTINGS },
    categories: DEFAULT_CATEGORIES,
    overrides: {},
    customProducts: [],
    orders: [],
    manualCustomers: [],
    removedHandles: [],
    catalogVersion: 3,
  }
  write(seed)
  return seed
}

export function subscribeAdminStorage(cb) {
  const handler = () => cb()
  window.addEventListener(EVT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(EVT, handler)
    window.removeEventListener('storage', handler)
  }
}

export function getAdminSettings() {
  return { ...DEFAULT_SETTINGS, ...ensure().settings }
}

export function updateAdminSettings(patch) {
  const data = ensure()
  data.settings = {
    ...data.settings,
    ...patch,
    deliveryFee: Math.max(0, Number(patch.deliveryFee ?? data.settings.deliveryFee) || 0),
    freeShippingFrom: Math.max(0, Number(patch.freeShippingFrom ?? data.settings.freeShippingFrom) || 0),
    lowStockThreshold: Math.max(
      0,
      Number(patch.lowStockThreshold ?? data.settings.lowStockThreshold) || DEFAULT_LOW,
    ),
  }
  write(data)
  return data.settings
}

export function getAdminCategories() {
  return [...ensure().categories]
}

export function addAdminCategory({ slug, nameFr, nameEn, nameAr }) {
  const data = ensure()
  const clean = String(slug || '')
    .trim()
    .replace(/\s+/g, '-')
  if (!clean) return null
  if (data.categories.some((c) => c.slug.toLowerCase() === clean.toLowerCase())) return null
  const row = {
    id: uid('cat'),
    slug: clean,
    nameFr: nameFr?.trim() || clean,
    nameEn: nameEn?.trim() || nameFr?.trim() || clean,
    nameAr: nameAr?.trim() || nameFr?.trim() || clean,
  }
  data.categories.push(row)
  write(data)
  return row
}

export function updateAdminCategory(id, patch) {
  const data = ensure()
  data.categories = data.categories.map((c) => (c.id === id ? { ...c, ...patch } : c))
  write(data)
}

export function deleteAdminCategory(id) {
  const data = ensure()
  data.categories = data.categories.filter((c) => c.id !== id)
  write(data)
}

export function getProductOverrides() {
  return { ...ensure().overrides }
}

export function setProductOverride(handle, patch) {
  const data = ensure()
  data.overrides[handle] = { ...(data.overrides[handle] || {}), ...patch, handle }
  write(data)
  return data.overrides[handle]
}

export function clearProductOverride(handle) {
  const data = ensure()
  delete data.overrides[handle]
  write(data)
}

export function getCustomProducts() {
  return [...ensure().customProducts]
}

export function addCustomProduct(product) {
  const data = ensure()
  const row = {
    handle: product.handle || uid('p'),
    title: product.title,
    category: product.category || 'Maison',
    price: Number(product.price) || 0,
    compareAt: product.compareAt ? Number(product.compareAt) : null,
    discountPercent: Number(product.discountPercent) || 0,
    badge: product.badge || null,
    description: product.description || '',
    images: product.images?.length ? product.images : [''],
    stock: product.stock != null ? Math.max(0, Math.floor(Number(product.stock))) : DEFAULT_STOCK,
    hidePrice: Boolean(product.hidePrice),
    active: product.active !== false,
    custom: true,
    updatedAt: Date.now(),
  }
  data.customProducts.unshift(row)
  write(data)
  return row
}

export function updateCustomProduct(handle, patch) {
  const data = ensure()
  data.customProducts = data.customProducts.map((p) =>
    p.handle === handle ? { ...p, ...patch, updatedAt: Date.now() } : p,
  )
  write(data)
}

export function deleteCustomProduct(handle) {
  const data = ensure()
  data.customProducts = data.customProducts.filter((p) => p.handle !== handle)
  write(data)
}

/** Remove a product from admin + storefront (custom delete, seed hide). */
export function removeCatalogProduct(handle) {
  const data = ensure()
  const isCustom = data.customProducts.some((p) => p.handle === handle)
  if (isCustom) {
    data.customProducts = data.customProducts.filter((p) => p.handle !== handle)
    delete data.overrides[handle]
  } else {
    if (!data.removedHandles.includes(handle)) data.removedHandles.push(handle)
    delete data.overrides[handle]
  }
  write(data)
}

function resolveStock(handle, override, custom) {
  if (custom && custom.stock != null) return Math.max(0, Math.floor(Number(custom.stock)))
  if (override && override.stock != null) return Math.max(0, Math.floor(Number(override.stock)))
  return DEFAULT_STOCK
}

/** Catalog rows for admin editing (base price + discount %, not sale-applied) */
export function getAdminCatalogRows() {
  const { overrides, customProducts, removedHandles } = ensure()
  const removed = new Set(removedHandles || [])
  const base = seedProducts
    .filter((p) => !removed.has(p.handle))
    .map((p) => {
      const o = overrides[p.handle] || {}
      const images =
        Array.isArray(o.images) && o.images.filter(Boolean).length ? o.images.filter(Boolean) : p.images
      return {
        ...p,
        price: o.price != null ? Number(o.price) : p.price,
        compareAt: o.compareAt != null ? Number(o.compareAt) : p.compareAt,
        discountPercent: Number(o.discountPercent) || 0,
        category: o.category || p.category,
        active: o.active !== false,
        hidePrice: o.hidePrice == null ? Boolean(p.hidePrice) : Boolean(o.hidePrice),
        title: o.title || p.title,
        description: o.description || p.description,
        images,
        stock: resolveStock(p.handle, o, null),
        updatedAt: o.updatedAt || null,
        custom: false,
      }
    })
  const customs = customProducts.map((p) => ({
    ...p,
    price: Number(p.price) || 0,
    discountPercent: Number(p.discountPercent) || 0,
    stock: resolveStock(p.handle, null, p),
    hidePrice: Boolean(p.hidePrice),
    images: (p.images || []).filter(Boolean).length ? p.images : seedProducts[0]?.images || [],
    custom: true,
  }))
  return [...customs, ...base]
}

/** Merge seed catalog + overrides + custom products for storefront */
export function getMergedCatalog() {
  const { overrides, customProducts, removedHandles } = ensure()
  const removed = new Set(removedHandles || [])
  const base = seedProducts.filter((p) => !removed.has(p.handle)).map((p) => {
    const o = overrides[p.handle] || {}
    const discountPercent = Number(o.discountPercent) || 0
    let price = o.price != null ? Number(o.price) : p.price
    let compareAt = o.compareAt != null ? Number(o.compareAt) : p.compareAt
    if (discountPercent > 0) {
      const basePrice = compareAt && compareAt > price ? compareAt : price
      compareAt = basePrice
      price = Math.round(basePrice * (1 - discountPercent / 100))
    }
    const stock = resolveStock(p.handle, o, null)
    const images =
      Array.isArray(o.images) && o.images.filter(Boolean).length
        ? o.images.filter(Boolean)
        : p.images
    return {
      ...p,
      ...o,
      price,
      compareAt: compareAt && compareAt > price ? compareAt : null,
      discountPercent,
      category: o.category || p.category,
      active: o.active !== false,
      hidePrice: o.hidePrice == null ? Boolean(p.hidePrice) : Boolean(o.hidePrice),
      title: o.title || p.title,
      description: o.description || p.description,
      images,
      stock,
      outOfStock: stock <= 0,
    }
  })
  const customs = customProducts.map((p) => {
    const discountPercent = Number(p.discountPercent) || 0
    let price = Number(p.price) || 0
    let compareAt = p.compareAt ? Number(p.compareAt) : null
    if (discountPercent > 0) {
      const basePrice = compareAt && compareAt > price ? compareAt : price
      compareAt = basePrice
      price = Math.round(basePrice * (1 - discountPercent / 100))
    }
    const stock = resolveStock(p.handle, null, p)
    return {
      ...p,
      price,
      compareAt: compareAt && compareAt > price ? compareAt : null,
      images: (p.images || []).filter(Boolean).length ? p.images : seedProducts[0]?.images || [],
      highlights: p.highlights || [],
      similarHandles: p.similarHandles || [],
      stock,
      outOfStock: stock <= 0,
      hidePrice: Boolean(p.hidePrice),
    }
  })
  return [...customs, ...base].filter((p) => p.active !== false)
}

export function adjustStock(handle, next) {
  const value = Math.max(0, Math.floor(Number(next) || 0))
  const data = ensure()
  const custom = data.customProducts.find((p) => p.handle === handle)
  if (custom) {
    updateCustomProduct(handle, { stock: value })
    return value
  }
  setProductOverride(handle, { stock: value, updatedAt: Date.now() })
  return value
}

export function getOrders() {
  return [...ensure().orders].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
}

export function addOrder(order) {
  const data = ensure()
  const row = {
    id: order.id || `BPA-${Date.now().toString().slice(-8)}`,
    createdAt: Date.now(),
    status: 'pending',
    ...order,
  }
  data.orders.unshift(row)
  write(data)
  return row
}

export function updateOrderStatus(id, status) {
  const data = ensure()
  data.orders = data.orders.map((o) => (o.id === id ? { ...o, status } : o))
  write(data)
}

export function deleteOrder(id) {
  const data = ensure()
  data.orders = data.orders.filter((o) => o.id !== id)
  write(data)
}

export function getManualCustomers() {
  return [...ensure().manualCustomers].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
}

export function addManualCustomer({ name, email, phone, address, notes }) {
  const data = ensure()
  const row = {
    id: uid('cust'),
    name: String(name || '').trim(),
    email: String(email || '').trim(),
    phone: String(phone || '').trim(),
    address: String(address || '').trim(),
    notes: String(notes || '').trim(),
    createdAt: Date.now(),
  }
  data.manualCustomers.unshift(row)
  write(data)
  return row
}

export function updateManualCustomer(id, patch) {
  const data = ensure()
  data.manualCustomers = data.manualCustomers.map((c) => (c.id === id ? { ...c, ...patch } : c))
  write(data)
}

export function deleteManualCustomer(id) {
  const data = ensure()
  data.manualCustomers = data.manualCustomers.filter((c) => c.id !== id)
  write(data)
}

function normalizePhone(p) {
  return String(p || '').replace(/\D/g, '')
}

export function deriveCustomersFromOrders(orders = getOrders()) {
  const map = new Map()
  for (const o of orders) {
    const phone = normalizePhone(o.phone)
    const email = String(o.email || '').toLowerCase()
    const key = phone || email || o.id
    if (!map.has(key)) {
      map.set(key, {
        key,
        name: o.customerName || '—',
        email: o.email || '',
        phone: o.phone || '',
        address: [o.address, o.city].filter(Boolean).join(', '),
        bookingCount: 0,
        joined: o.createdAt,
        lastOrderAt: o.createdAt,
      })
    }
    const row = map.get(key)
    row.bookingCount += 1
    if (o.createdAt > row.lastOrderAt) {
      row.lastOrderAt = o.createdAt
      row.name = o.customerName || row.name
      row.email = o.email || row.email
      row.phone = o.phone || row.phone
      row.address = [o.address, o.city].filter(Boolean).join(', ') || row.address
    }
    if (o.createdAt < row.joined) row.joined = o.createdAt
  }
  return [...map.values()].sort((a, b) => b.lastOrderAt - a.lastOrderAt)
}

export function getCustomerProfileForManual(manualId, orders = getOrders()) {
  const c = getManualCustomers().find((x) => x.id === manualId)
  if (!c) return null
  const phone = normalizePhone(c.phone)
  const email = String(c.email || '').toLowerCase()
  const related = orders.filter((o) => {
    const op = normalizePhone(o.phone)
    const oe = String(o.email || '').toLowerCase()
    return (phone && op === phone) || (email && oe === email)
  })
  return buildProfile({
    name: c.name,
    email: c.email,
    phone: c.phone,
    address: c.address,
    notes: c.notes,
    source: 'manual',
    manualId: c.id,
    joined: c.createdAt,
    bookings: related,
  })
}

export function getCustomerProfileForDerivedKey(key, orders = getOrders()) {
  const derived = deriveCustomersFromOrders(orders).find((c) => c.key === key)
  if (!derived) return null
  const phone = normalizePhone(derived.phone)
  const email = String(derived.email || '').toLowerCase()
  const related = orders.filter((o) => {
    const op = normalizePhone(o.phone)
    const oe = String(o.email || '').toLowerCase()
    return (phone && op === phone) || (email && oe === email) || o.id === key
  })
  return buildProfile({
    name: derived.name,
    email: derived.email,
    phone: derived.phone,
    address: derived.address,
    notes: '',
    source: 'order',
    manualId: null,
    joined: derived.joined,
    bookings: related,
  })
}

function buildProfile({ name, email, phone, address, notes, source, manualId, joined, bookings }) {
  const active = bookings.filter((b) => b.status !== 'cancelled')
  const totalSpent = active.reduce((s, b) => s + (Number(b.total) || 0), 0)
  return {
    name,
    email,
    phone,
    address,
    notes: notes || '',
    source,
    manualId,
    joined: joined ? new Date(joined).toISOString().slice(0, 10) : '—',
    bookingCount: bookings.length,
    totalSpentTND: totalSpent,
    paidBookings: bookings.filter((b) => b.status === 'completed').length,
    pendingBookings: bookings.filter((b) => b.status === 'pending').length,
    lastOrderAt: bookings[0]?.createdAt || null,
    bookings: [...bookings].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
  }
}

export function getAdminStats() {
  const all = getOrders()
  const orders = all.filter((o) => o.status !== 'cancelled')
  const revenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0)
  const pending = all.filter((o) => o.status === 'pending').length
  const catalog = getMergedCatalog()
  const threshold = getAdminSettings().lowStockThreshold
  const lowStock = getAdminCatalogRows().filter((p) => p.stock <= threshold).length
  return {
    orderCount: all.length,
    revenue,
    pending,
    productCount: catalog.length,
    categoryCount: getAdminCategories().length,
    lowStock,
    customerCount: deriveCustomersFromOrders().length + getManualCustomers().length,
  }
}

export function getMonthlyOrderStats(orders = getOrders()) {
  const now = new Date()
  const months = []
  for (let i = 11; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    months.push({
      key,
      month: d.toLocaleDateString('fr-TN', { month: 'short', year: '2-digit' }),
      revenue: 0,
      bookings: 0,
    })
  }
  const index = Object.fromEntries(months.map((m, i) => [m.key, i]))
  for (const o of orders) {
    if (o.status === 'cancelled') continue
    const d = new Date(o.createdAt || Date.now())
    const key = `${d.getFullYear()}-${d.getMonth()}`
    const i = index[key]
    if (i == null) continue
    months[i].bookings += 1
    months[i].revenue += Number(o.total) || 0
  }
  return months
}

export function getProductMixForPie(orders = getOrders()) {
  const map = new Map()
  for (const o of orders) {
    if (o.status === 'cancelled') continue
    for (const line of o.items || []) {
      const name = line.title || line.handle || 'Produit'
      map.set(name, (map.get(name) || 0) + (Number(line.qty) || 1))
    }
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value], i) => ({
      name,
      value,
      color: PIE_COLORS[i % PIE_COLORS.length],
    }))
}

export function downloadOrdersCsv(orders = getOrders(), lang = 'fr') {
  const headers =
    lang === 'en'
      ? ['ID', 'Date', 'Customer', 'Phone', 'City', 'Status', 'Subtotal', 'Shipping', 'Total']
      : lang === 'ar'
        ? ['المعرف', 'التاريخ', 'العميل', 'الهاتف', 'المدينة', 'الحالة', 'المجموع', 'الشحن', 'الإجمالي']
        : ['ID', 'Date', 'Client', 'Téléphone', 'Ville', 'Statut', 'Sous-total', 'Livraison', 'Total']
  const rows = orders.map((o) => [
    o.id,
    new Date(o.createdAt).toLocaleString('fr-TN'),
    o.customerName || '',
    o.phone || '',
    o.city || '',
    o.status || '',
    o.subtotal ?? '',
    o.shipping ?? '',
    o.total ?? '',
  ])
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`
  const csv = [headers, ...rows].map((r) => r.map(esc).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `commandes-bonplan-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function formatAdminDT(n, locale = 'fr') {
  const code = String(locale || 'fr').slice(0, 2)
  const loc = code === 'ar' ? 'ar-TN' : code === 'en' ? 'en-TN' : 'fr-TN'
  return `${new Intl.NumberFormat(loc).format(Number(n) || 0)} DT`
}

export function formatReceivedAt(ts, locale = 'fr') {
  const code = String(locale || 'fr').slice(0, 2)
  const loc = code === 'ar' ? 'ar-TN' : code === 'en' ? 'en-TN' : 'fr-TN'
  return new Date(ts || Date.now()).toLocaleString(loc)
}

export { EVT as ADMIN_STORAGE_EVENT, DEFAULT_STOCK, DEFAULT_LOW }
