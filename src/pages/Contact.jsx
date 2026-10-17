import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { brand } from '../data/brand'

export default function Contact() {
  const { t } = useTranslation()
  const [toast, setToast] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setToast(true)
      setForm({ name: '', email: '', phone: '', message: '' })
      setIsSubmitting(false)
      setTimeout(() => setToast(false), 3500)
    }, 800)
  }

  return (
    <div className="fade-in">
      {/* Premium Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <p
            style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              marginBottom: '1rem',
            }}
          >
            {t('contact.eyebrow')}
          </p>
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.intro')}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <a href={brand.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-accent btn-large">
              {t('contact.whatsapp', 'WhatsApp')}
            </a>
            <a href={brand.facebook} target="_blank" rel="noreferrer" className="btn btn-outline btn-large">
              {t('contact.fbMessage')}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <div className="container contact-grid">
        {/* Contact Information */}
        <div>
          <div className="contact-details">
            <div className="contact-detail">
              <h3>{t('contact.location')}</h3>
              <p style={{ margin: 0 }}>
                <a href={brand.mapsUrl} target="_blank" rel="noreferrer">
                  {brand.address}
                </a>
              </p>
            </div>

            <div className="contact-detail">
              <h3>{t('contact.phone')}</h3>
              <p style={{ margin: 0 }}>
                <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
              </p>
            </div>

            <div className="contact-detail">
              <h3>{t('contact.email')}</h3>
              <p style={{ margin: 0 }}>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </p>
            </div>

            <div className="contact-detail">
              <h3>{t('contact.whatsapp', 'WhatsApp')}</h3>
              <p style={{ margin: 0 }}>
                <a href={brand.whatsappUrl} target="_blank" rel="noreferrer">
                  {brand.phone}
                </a>
              </p>
            </div>

            <div className="contact-detail">
              <h3>{t('contact.hours')}</h3>
              <p style={{ margin: 0 }}>{t('brand.hours')}</p>
            </div>
          </div>

          {/* Map Block */}
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

        {/* Premium Contact Form */}
        <form className="contact-form" onSubmit={onSubmit}>
          <h2>{t('contact.sendMessage')}</h2>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
            {t('contact.formIntro', 'Fill out the form below and we\'ll get back to you as soon as possible.')}
          </p>

          <div className="form-row">
            <label htmlFor="name">{t('contact.name')}</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('contact.namePh')}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <label htmlFor="phone">{t('contact.phone')}</label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder={t('contact.phonePh', '+216 XX XXX XXX')}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-accent btn-large" 
            style={{ width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.sending', 'Sending...') : t('contact.send')}
          </button>
        </form>
      </div>

      {/* Toast Notification */}
      <div className={`toast ${toast ? 'show' : ''}`} role="status">
        {t('contact.toast')}
      </div>
    </div>
  )
}
