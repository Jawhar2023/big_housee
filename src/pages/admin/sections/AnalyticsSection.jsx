import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatAdminDT, getMonthlyOrderStats, getOrders } from '../../../lib/adminStorage'
import { tAdmin } from '../adminI18n'

const tip = {
  background: '#fff',
  border: '1px solid #e6ebf0',
  borderRadius: 10,
  fontSize: 12,
}

const ACCENT = '#D9A12E'
const NAVY = '#38251A'

export default function AnalyticsSection({ lang }) {
  const t = (k) => tAdmin(lang, k)
  const monthly = getMonthlyOrderStats(getOrders())

  return (
    <div className="admin-stack">
      <p className="admin-muted" style={{ margin: 0 }}>
        {t('analyticsSub')}
      </p>
      <div className="admin-grid-2">
        <div className="admin-card">
          <h2>{t('orderTrends')}</h2>
          <p className="admin-card-sub">{t('orders')}</p>
          <div style={{ width: '100%', height: 300, marginTop: 12 }}>
            <ResponsiveContainer>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6ebf0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} angle={-30} textAnchor="end" height={50} />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip contentStyle={tip} />
                <Bar dataKey="bookings" name="bookings" fill={NAVY} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="admin-card">
          <h2>{t('revenueTrend')}</h2>
          <p className="admin-card-sub">{t('revenue')}</p>
          <div style={{ width: '100%', height: 300, marginTop: 12 }}>
            <ResponsiveContainer>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6ebf0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} angle={-30} textAnchor="end" height={50} />
                <YAxis stroke="#94a3b8" tickFormatter={(v) => `${v}`} />
                <Tooltip contentStyle={tip} formatter={(v) => [formatAdminDT(v, lang), t('revenue').split('(')[0].trim()]} />
                <Line type="monotone" dataKey="revenue" stroke={ACCENT} strokeWidth={2.5} dot={{ fill: ACCENT, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
