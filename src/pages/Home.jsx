import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import {
  packeryBanners,
} from '../data/homeSections'
import { useLiveCatalog } from '../lib/catalog'

function chooseCategoryHighlights(products) {
  const grouped = new Map()
  products.forEach((product) => {
    if (!grouped.has(product.category)) grouped.set(product.category, [])
    grouped.get(product.category).push(product)
  })

  return Array.from(grouped, ([category, items]) => ({
    category,
    product: items[Math.floor(Math.random() * items.length)],
  }))
}

function useCountdown(hours = 18) {
  const [left, setLeft] = useState(() => hours * 3600)
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : hours * 3600)), 1000)
    return () => clearInterval(id)
  }, [hours])
  const h = String(Math.floor(left / 3600)).padStart(2, '0')
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, '0')
  const s = String(left % 60).padStart(2, '0')
  return { h, m, s }
}

export default function Home() {
  const { t } = useTranslation()
  const countdown = useCountdown(14)
  const { products } = useLiveCatalog()
  const deals = products.filter((p) => p.compareAt).slice(0, 4)
  const [categoryHighlights] = useState(() => chooseCategoryHighlights(products))
  const marquee = t('home.marquee', { returnObjects: true })
  const marqueeWords = Array.isArray(marquee) ? marquee : []

  return (
    <div className="home-page">
      <HeroSlider />

      {deals.length > 0 && <section className="section deal-section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>{t('home.dealTitle')}</h2>
              <p>{t('home.dealSub')}</p>
            </div>
            <div className="countdown" aria-label="Countdown">
              <span>{countdown.h}</span>:
              <span>{countdown.m}</span>:
              <span>{countdown.s}</span>
            </div>
          </div>
          <div className="product-grid">
            {deals.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </section>}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container packery">
          {packeryBanners.map((b, i) => (
            <Link key={b.to} to={b.to} className={`packery-item ${b.size}`}>
              <img src={b.image} alt={t(`home.packery${i}`)} />
              <div className="copy">
                <h3>{t(`home.packery${i}`)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={`${w}-${i}`}>
              {w} ·
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>{t('home.trendingTitle')}</h2>
              <p>{t('home.trendingSub')}</p>
            </div>
            <Link to="/shop" className="btn btn-outline">
              {t('common.shopNow')}
            </Link>
          </div>
          <div className="category-highlight-grid">
            {categoryHighlights.map(({ category, product }) => (
              <article key={category} className="category-highlight">
                <h3 className="category-highlight-heading">
                  {t(`categories.${category}`, { defaultValue: category })}
                </h3>
                <ProductCard product={product} />
                <Link
                  to={`/shop?category=${encodeURIComponent(category)}`}
                  className="btn btn-category-pro"
                >
                  {t('shop.viewCategory')}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
