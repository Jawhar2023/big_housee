import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Activity, CalendarCheck, DollarSign, Package } from 'lucide-react'
import {
  formatAdminDT,
  getAdminStats,
  getMonthlyOrderStats,
  getOrders,
  getProductMixForPie,
} from '../../../lib/adminStorage'
import { tAdmin } from '../adminI18n'

const chartTip = {
  background: '#fff',
  border: '1px solid #e6ebf0',
  borderRadius: 10,
  fontSize: 12,
}

const ACCENT = '#D9A12E'

export default function OverviewSection({ lang }) {
  const t = (k) => tAdmin(lang, k)
  const stats = getAdminStats()
  const monthly = getMonthlyOrderStats()
  const pieMix = getProductMixForPie()
  const recent = getOrders().slice(0, 8)

  return (
    <div className="admin-stack">
      <div className="admin-stats">
        <StatCard tone="blue" icon={CalendarCheck} label={t('totalOrders')} value={String(stats.orderCount)} live={t('live')} />
        <StatCard tone="emerald" icon={DollarSign} label={t('revenue')} value={formatAdminDT(stats.revenue, lang)} live={t('live')} />
        <StatCard tone="violet" icon={Activity} label={t('pending')} value={String(stats.pending)} live={t('live')} />
        <StatCard tone="amber" icon={Package} label={t('catalog')} value={String(stats.productCount)} live={t('live')} />
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h2>{t('revenueChart')}</h2>
          <p className="admin-card-sub">{t('revenueChartSub')}</p>
          <div style={{ width: '100%', height: 280, marginTop: 12 }}>
            <ResponsiveContainer>
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="bpaRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ACCENT} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6ebf0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} angle={-30} textAnchor="end" height={50} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v}`} />
                <Tooltip
                  contentStyle={chartTip}
                  formatter={(value, name) =>
                    name === 'revenue' ? [formatAdminDT(value, lang), t('revenue').split('(')[0].trim()] : [value, t('orders')]
                  }
                />
                <Area type="monotone" dataKey="revenue" name="revenue" stroke={ACCENT} fill="url(#bpaRev)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-card">
          <h2>{t('productMix')}</h2>
          <p className="admin-card-sub">{t('productMixSub')}</p>
          {pieMix.length === 0 ? (
            <p className="admin-empty">{t('noData')}</p>
          ) : (
            <>
              <div style={{ width: '100%', height: 260, marginTop: 8 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={pieMix} cx="50%" cy="50%" innerRadius={58} outerRadius={96} dataKey="value" strokeWidth={0}>
                      {pieMix.map((entry, i) => (
                        <Cell key={`${entry.name}-${i}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={chartTip} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="legend-row">
                {pieMix.map((x) => (
                  <div key={x.name} className="legend-item">
                    <span className="legend-dot" style={{ background: x.color }} />
                    {x.name} ({x.value})
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #e6ebf0' }}>
          <h2 className="admin-card-title">{t('recentOrders')}</h2>
          <p className="admin-card-sub">{t('recentOrdersSub')}</p>
        </div>
        {recent.length === 0 ? (
          <p className="admin-empty">{t('noOrders')}</p>
        ) : (
          <div className="admin-table-wrap" style={{ marginTop: 0 }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('customer')}</th>
                  <th>{t('phone')}</th>
                  <th>{t('items')}</th>
                  <th>{t('status')}</th>
                  <th style={{ textAlign: 'right' }}>{t('total')}</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id}>
                    <td className="mono accent">{o.id}</td>
                    <td>{o.customerName}</td>
                    <td>{o.phone}</td>
                    <td style={{ maxWidth: 220, color: '#64748b', fontSize: '0.82rem' }}>
                      {(o.items || []).map((i) => `${i.qty}× ${i.title}`).join(', ')}
                    </td>
                    <td>
                      <span className={`admin-pill ${o.status}`}>{o.status}</span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{formatAdminDT(o.total, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, tone, live }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="admin-stat">
      <div className="admin-stat-top">
        <div className={`admin-stat-icon ${tone}`}>
          <Icon size={20} />
        </div>
        <span className="admin-live">{live}</span>
      </div>
      <strong>{value}</strong>
      <span>{label}</span>
    </motion.div>
  )
}
