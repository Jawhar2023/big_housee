import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { heroSlides } from '../data/homeSections'

export default function HeroSlider() {
  const { t } = useTranslation()
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const videoRefs = useRef({})

  useEffect(() => {
    heroSlides.forEach((s, i) => {
      const el = videoRefs.current[s.id]
      if (!el) return
      if (i === slide && s.video) {
        el.currentTime = 0
        const play = el.play()
        if (play?.catch) play.catch(() => {})
      } else {
        el.pause()
      }
    })
  }, [slide])

  useEffect(() => {
    if (heroSlides.length < 2) return undefined
    if (paused) return undefined
    const active = heroSlides[slide]
    const delay = active?.video ? 12000 : 5500
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), delay)
    return () => clearInterval(id)
  }, [paused, slide])

  const prev = () => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)
  const next = () => setSlide((s) => (s + 1) % heroSlides.length)

  return (
    <section
      className="hero-stage"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`hero-frame ${heroSlides[slide]?.video ? 'has-video' : ''}`}>
        {heroSlides.map((s, i) => {
          const copy = t(`hero.slides.${i}`, { returnObjects: true })
          return (
            <article
              key={s.id || s.to}
              className={`hero-slide ${i === slide ? 'active' : ''} ${s.video ? 'has-video' : ''}`}
              aria-hidden={i !== slide}
            >
              {s.video ? (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[s.id] = el
                  }}
                  className="hero-slide-img hero-slide-video"
                  src={s.video}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  poster={s.image}
                />
              ) : (
                <img src={s.image} alt="" className="hero-slide-img" />
              )}
              <div className="hero-shade" />
              {s.video ? (
                <Link to={s.to} className="btn btn-pill hero-cta hero-video-cta">
                  {s.cta}
                </Link>
              ) : (
                <div className="hero-copy">
                  <span className="hero-eyebrow">{copy.eyebrow || s.eyebrow}</span>
                  <h1>{copy.title || s.title}</h1>
                  <p>{copy.text || s.text}</p>
                  <Link to={s.to} className="btn btn-pill hero-cta">
                    {copy.cta || s.cta}
                  </Link>
                </div>
              )}
            </article>
          )
        })}

        {heroSlides.length > 1 && (
          <>
            <button type="button" className="hero-nav prev" onClick={prev} aria-label={t('product.previous')}>
              ‹
            </button>
            <button type="button" className="hero-nav next" onClick={next} aria-label={t('product.next')}>
              ›
            </button>
            <div className="hero-dots">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id || s.to}
                  type="button"
                  className={i === slide ? 'active' : ''}
                  aria-label={`${i + 1}`}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
