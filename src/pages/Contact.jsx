import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { brand } from '../data/brand'

export default function Contact() {
  const { t } = useTranslation()
  const [toast, setToast] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    setToast(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setToast(false), 2800)
  }

  return (
    <div>
      <section className="contact-hero">
        <div className="container">
          <p
            style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
            }}
          >
            {t('contact.eyebrow')}
          </p>
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.intro')}</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={brand.facebook} target="_blank" rel="noreferrer" className="btn btn-accent">
              {t('contact.fbMessage')}
            </a>
            <a href={brand.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              {t('contact.openMaps')}
            </a>
          </div>
        </div>
      </section>

      <div className="container contact-grid">
        <div>
          <div className="contact-details">
            <div className="contact-detail">
              <h3>{t('contact.location')}</h3>
              <p style={{ margin: 0 }}>
                <a href={brand.mapsUrl} target="_blank" rel="noreferrer">
                  {t('contact.address')}
                </a>
              </p>
            </div>
            <div className="contact-detail">
              <h3>{t('contact.facebook')}</h3>
              <p style={{ margin: 0 }}>
                <a href={brand.facebook} target="_blank" rel="noreferrer">
                  {t('brand.name')}
                </a>
              </p>
            </div>
            <div className="contact-detail">
              <h3>{t('contact.email')}</h3>
              <p style={{ margin: 0 }}>{brand.email}</p>
            </div>
            <div className="contact-detail">
              <h3>{t('contact.phone')}</h3>
              <p style={{ margin: 0 }}>{brand.phone}</p>
            </div>
            <div className="contact-detail">
              <h3>{t('contact.hours')}</h3>
              <p style={{ margin: 0 }}>{t('brand.hours')}</p>
            </div>
          </div>

          <div className="map-block">
            <div className="map-block-head">
              <div>
                <strong>{t('contact.mapTitle')}</strong>
                <p>{t('contact.mapText')}</p>
              </div>
              <a href={brand.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-accent map-open-btn">
                {t('contact.openMaps')}
              </a>
            </div>
            <div className="map-embed">
              <iframe
                title={t('contact.mapTitle')}
                src={brand.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <h2 style={{ marginBottom: '1rem' }}>{t('contact.sendMessage')}</h2>
          <div className="form-row">
            <label htmlFor="name">{t('contact.name')}</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('contact.namePh')}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">{t('contact.email')}</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t('contact.emailPh')}
            />
          </div>
          <div className="form-row">
            <label htmlFor="message">{t('contact.message')}</label>
            <textarea
              id="message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t('contact.messagePh')}
            />
          </div>
          <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>
            {t('contact.send')}
          </button>
        </form>
      </div>

      <div className={`toast ${toast ? 'show' : ''}`} role="status">
        {t('contact.toast')}
      </div>
    </div>
  )
}
