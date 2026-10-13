import { useMemo, useState } from 'react'
import { Printer } from 'lucide-react'
import { brand } from '../../../data/brand'
import { formatAdminDT, formatReceivedAt, getAdminSettings, getOrders } from '../../../lib/adminStorage'
import { tAdmin } from '../adminI18n'

function printInvoiceElement(el, title) {
  if (!el) return
  const prevTitle = document.title
  document.title = title || brand.name

  const win = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1100')
  if (!win) {
    window.print()
    document.title = prevTitle
    return
  }

  const styles = [...document.querySelectorAll('link[rel="stylesheet"], style')]
    .map((node) => node.outerHTML)
    .join('\n')

  win.document.open()
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title || brand.name}</title>
  ${styles}
  <style>
    @page { size: A4; margin: 12mm; }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body { padding: 8mm !important; }
    .invoice-print {
      position: static !important;
      visibility: visible !important;
      width: 100% !important;
      border: 0 !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      padding: 0 !important;
    }
    .no-print { display: none !important; }
  </style>
</head>
<body>
  ${el.outerHTML}
</body>
</html>`)
  win.document.close()

  const doPrint = () => {
    win.focus()
    win.print()
    window.setTimeout(() => {
      try {
        win.close()
      } catch {
        /* ignore */
      }
      document.title = prevTitle
    }, 300)
  }

  if (win.document.readyState === 'complete') {
    window.setTimeout(doPrint, 250)
  } else {
    win.onload = () => window.setTimeout(doPrint, 250)
  }
}

export default function InvoiceSection({ lang }) {
  const t = (k) => tAdmin(lang, k)
  const orders = getOrders()
  const settings = getAdminSettings()
  const [orderId, setOrderId] = useState(orders[0]?.id || '')
  const order = useMemo(() => orders.find((o) => o.id === orderId) || null, [orders, orderId])

  const onPrint = () => {
    const sheet = document.getElementById('bpa-invoice-sheet')
    printInvoiceElement(sheet, `${settings.storeName || brand.name} — ${order?.id || t('invoiceTitle')}`)
  }

  return (
    <div className="admin-stack">
      <div className="admin-card no-print">
        <div className="admin-card-head" style={{ marginBottom: 0 }}>
          <div>
            <h2>{t('invoiceTitle')}</h2>
            <p className="admin-card-sub">{t('pickOrder')}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <select value={orderId} onChange={(e) => setOrderId(e.target.value)} style={{ minWidth: 220 }}>
              {orders.length === 0 && <option value="">{t('noOrders')}</option>}
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} — {o.customerName}
                </option>
              ))}
            </select>
            <button type="button" className="admin-btn admin-btn-primary" disabled={!order} onClick={onPrint}>
              <Printer size={16} /> {t('printInvoice')}
            </button>
          </div>
        </div>
      </div>

      {order ? (
        <div id="bpa-invoice-sheet" className="invoice-sheet invoice-print">
          <header className="invoice-top">
            <div className="invoice-brand-block">
              <img src="/logo.jpg" alt={settings.storeName || brand.name} className="invoice-logo" />
              <div className="invoice-brand-text">
                <strong>{settings.storeName || brand.name}</strong>
                <span>{brand.tagline}</span>
                <span>
                  {brand.address} · {brand.phone}
                </span>
                <span>{brand.email}</span>
              </div>
            </div>
            <div className="invoice-title-block">
              <p className="invoice-kicker">{t('invoiceTitle')}</p>
              <h2>{order.id}</h2>
              <dl className="invoice-meta-list">
                <div>
                  <dt>{lang === 'en' ? 'Date' : lang === 'ar' ? 'التاريخ' : 'Date'}</dt>
                  <dd>{formatReceivedAt(order.createdAt, lang)}</dd>
                </div>
                <div>
                  <dt>{t('status')}</dt>
                  <dd>
                    <span className={`admin-pill ${order.status}`}>{order.status}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <section className="invoice-parties">
            <div className="invoice-party">
              <h3>{t('billTo')}</h3>
              <p className="invoice-party-name">{order.customerName}</p>
              <p>{order.phone || '—'}</p>
              <p>{order.email || '—'}</p>
              <p>{[order.address, order.city].filter(Boolean).join(', ') || '—'}</p>
            </div>
          </section>

          <div className="invoice-table-wrap">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th className="col-item">{t('items')}</th>
                  <th className="col-qty">{t('qty')}</th>
                  <th className="col-unit">{t('unit')}</th>
                  <th className="col-total">{t('total')}</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((it) => (
                  <tr key={`${order.id}-${it.handle}`}>
                    <td className="col-item">{it.title}</td>
                    <td className="col-qty">{it.qty}</td>
                    <td className="col-unit">{formatAdminDT(it.price, lang)}</td>
                    <td className="col-total">{formatAdminDT((it.price || 0) * (it.qty || 1), lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="invoice-footer">
            <p className="invoice-thanks">
              {lang === 'en'
                ? 'Thank you for your order.'
                : lang === 'ar'
                  ? 'شكرًا لطلبك.'
                  : 'Merci pour votre commande.'}
            </p>
            <div className="invoice-totals">
              <div>
                <span>{t('subtotal')}</span>
                <strong>{formatAdminDT(order.subtotal ?? order.total, lang)}</strong>
              </div>
              <div>
                <span>{t('shipping')}</span>
                <strong>{order.shipping === 0 ? t('free') : formatAdminDT(order.shipping || 0, lang)}</strong>
              </div>
              <div className="invoice-grand">
                <span>{t('total')}</span>
                <strong>{formatAdminDT(order.total, lang)}</strong>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <section className="admin-card">
          <p className="admin-empty">{t('noOrders')}</p>
        </section>
      )}
    </div>
  )
}
