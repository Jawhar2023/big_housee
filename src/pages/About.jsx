import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { products } from '../data/products'
import { brand } from '../data/brand'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="fade-in">
      {/* Premium Hero Section */}
      <section className="about-hero">
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
            {t('brand.name')}
          </p>
          <h1>{t('about.title')}</h1>
          <p>{t('about.intro')}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link to="/shop" className="btn btn-accent btn-large">
              {t('about.seeShop')}
            </Link>
            <Link to="/contact" className="btn btn-outline btn-large">
              {t('contact.title')}
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section">
        <div className="container about-story">
          <img src="/brand/logo.jpg" alt={t('brand.name')} className="about-logo-full" />
          <div className="slide-in-right">
            <h2>{t('about.mission')}</h2>
            <p>{t('about.missionP1')}</p>
            <p>{t('about.missionP2')}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a href={brand.facebook} target="_blank" rel="noreferrer" className="btn btn-accent">
                {t('about.openFacebook')}
              </a>
              <a href={brand.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                {t('contact.whatsapp', 'WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section" style={{ background: 'var(--color-soft)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>{t('about.why')}</h2>
              <p>{t('about.whySub')}</p>
            </div>
          </div>
          <div className="values">
            <div className="value-item">
              <h3>{t('about.v1Title')}</h3>
              <p>{t('about.v1Text')}</p>
            </div>
            <div className="value-item">
              <h3>{t('about.v2Title')}</h3>
              <p>{t('about.v2Text')}</p>
            </div>
            <div className="value-item">
              <h3>{t('about.v3Title')}</h3>
              <p>{t('about.v3Text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Gallery */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{t('about.products', 'Our Products')}</h2>
            <Link to="/shop" className="btn btn-outline">
              {t('about.seeShop')}
            </Link>
          </div>
          <div className="about-gallery">
            <img src={products[1].images[0]} alt="" loading="lazy" />
            <img src={products[6].images[0]} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <h2>{t('about.ready')}</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>{t('about.readySub')}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-accent btn-large">
              {t('about.shop')}
            </Link>
            <Link to="/contact" className="btn btn-outline btn-large">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
