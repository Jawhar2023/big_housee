import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  Layers,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react'
import { isAdminLoggedIn, logoutAdmin } from '../../lib/adminAuth'
import { subscribeAdminStorage } from '../../lib/adminStorage'
import { tAdmin } from './adminI18n'
import OverviewSection from './sections/OverviewSection'
import CategoriesSection from './sections/CategoriesSection'
import ProductsSection from './sections/ProductsSection'
import StockSection from './sections/StockSection'
import OrdersSection from './sections/OrdersSection'
import CustomersSection from './sections/CustomersSection'
import AnalyticsSection from './sections/AnalyticsSection'
import DeliverySection from './sections/DeliverySection'
import InvoiceSection from './sections/InvoiceSection'
import '../../styles/admin.css'

const TABS = [
  { id: 'overview', icon: LayoutDashboard, labelKey: 'overview' },
  { id: 'categories', icon: Layers, labelKey: 'categories' },
  { id: 'products', icon: Package, labelKey: 'products' },
  { id: 'stock', icon: Warehouse, labelKey: 'stock' },
  { id: 'orders', icon: ShoppingBag, labelKey: 'orders' },
  { id: 'customers', icon: Users, labelKey: 'customers' },
  { id: 'analytics', icon: BarChart3, labelKey: 'analytics' },
  { id: 'delivery', icon: Truck, labelKey: 'delivery' },
  { id: 'invoice', icon: FileText, labelKey: 'invoice' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [lang, setLang] = useState(() => localStorage.getItem('bpa-admin-lang') || 'fr')
  const [tick, setTick] = useState(0)

  useEffect(() => subscribeAdminStorage(() => setTick((n) => n + 1)), [])
  useEffect(() => {
    localStorage.setItem('bpa-admin-lang', lang)
  }, [lang])

  if (!isAdminLoggedIn()) return <Navigate to="/admin/login" replace />

  const t = (k) => tAdmin(lang, k)
  const refresh = () => setTick((n) => n + 1)
  const active = TABS.find((x) => x.id === tab)

  return (
    <div className="admin-root" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`admin-shell ${collapsed ? 'is-collapsed' : ''}`} data-tick={tick}>
        <motion.aside
          className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}
          animate={{ width: collapsed ? 78 : 248 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          <div className="admin-sidebar-brand">
            <img className="mark" src="/brand/logo.jpg" alt="Big House" />
            {!collapsed && (
              <div className="text">
                <strong>
                  BIG HOUSE
                </strong>
                <em>{t('admin')}</em>
              </div>
            )}
          </div>

          <nav>
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-btn ${tab === item.id ? 'active' : ''}`}
                onClick={() => setTab(item.id)}
                title={t(item.labelKey)}
              >
                <item.icon />
                {!collapsed && <span>{t(item.labelKey)}</span>}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-foot">
            <button
              type="button"
              className="admin-nav-btn danger"
              onClick={() => {
                logoutAdmin()
                navigate('/admin/login', { replace: true })
              }}
            >
              <LogOut />
              {!collapsed && <span>{t('logout')}</span>}
            </button>
            <button type="button" className="admin-nav-btn" onClick={() => setCollapsed((c) => !c)} title="Collapse">
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
              {!collapsed && <span>{collapsed ? '' : ' '}</span>}
            </button>
          </div>
        </motion.aside>

        <main className="admin-main">
          <header className="admin-top no-print">
            <h1>{active ? t(active.labelKey) : t('overview')}</h1>
            <div className="admin-top-actions">
              <div className="admin-lang">
                {(['fr', 'en', 'ar']).map((l) => (
                  <button key={l} type="button" className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>
                    {l}
                  </button>
                ))}
              </div>
              <Link to="/" className="admin-top-link">
                {t('back')}
              </Link>
            </div>
          </header>

          <div className="admin-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                {tab === 'overview' && <OverviewSection lang={lang} />}
                {tab === 'categories' && <CategoriesSection lang={lang} onChange={refresh} />}
                {tab === 'products' && <ProductsSection lang={lang} onChange={refresh} />}
                {tab === 'stock' && <StockSection lang={lang} onChange={refresh} />}
                {tab === 'orders' && <OrdersSection lang={lang} onChange={refresh} />}
                {tab === 'customers' && <CustomersSection lang={lang} onChange={refresh} />}
                {tab === 'analytics' && <AnalyticsSection lang={lang} />}
                {tab === 'delivery' && <DeliverySection lang={lang} onChange={refresh} />}
                {tab === 'invoice' && <InvoiceSection lang={lang} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
