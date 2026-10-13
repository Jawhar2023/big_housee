import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { products } from '../data/products'
import { brand } from '../data/brand'

export default function About() {
  const { t } = useTranslation()

  return (
    <div>
      <section className="about-hero">
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
            {t('brand.name')}
          </p>
          <h1>{t('about.title')}</h1>
          <p>{t('about.intro')}</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn">
              {t('about.seeShop')}
            </Link>
            <a href={brand.facebook} target="_blank" rel="noreferrer" className="btn btn-outline">
              {t('nav.facebook')}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <img src="/brand/logo.jpg" alt={t('brand.name')} className="about-logo-full" />
          <div>
            <h2>{t('about.mission')}</h2>
            <p>{t('about.missionP1')}</p>
            <p>{t('about.missionP2')}</p>
            <a href={brand.facebook} target="_blank" rel="noreferrer" className="btn btn-accent">
              {t('about.openFacebook')}
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(255,255,255,0.7)' }}>
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

      <section className="section">
        <div className="container about-gallery">
          <img src={products[1].images[0]} alt="" />
          <img src={products[6].images[0]} alt="" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <h2>{t('about.ready')}</h2>
          <p>{t('about.readySub')}</p>
          <Link to="/shop" className="btn btn-accent">
            {t('about.shop')}
          </Link>
        </div>
      </section>
    </div>
  )
}
