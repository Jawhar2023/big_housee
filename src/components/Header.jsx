import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { brand, browseCategories } from '../data/homeSections'
import { formatPrice } from '../data/products'
import {
  IconCart,
  IconChevronDown,
  IconClose,
  IconFaq,
  IconFlash,
  IconMenu,
  IconPackage,
  IconPhone,
  IconPin,
  IconSearch,
  IconStore,
  IconUser,
} from './Icons'

const FACEBOOK_URL = brand.facebook

const linkDefs = [
  { to: '/', key: 'home' },
  { to: '/shop', key: 'shop' },
  { to: '/contact', key: 'contact' },
]

const quickDefs = [
  // Removed: Flash Sale, FAQs, Track Order, Our Store
]

function QuickIcon({ type }) {
  if (type === 'flash') return <IconFlash className="ql-flash" />
  if (type === 'faq') return <IconFaq />
  if (type === 'package') return <IconPackage />
  if (type === 'store') return <IconStore />
  return null
}

export default function Header() {
  const { t, i18n } = useTranslation()
  const { count, subtotal, setIsOpen, setSearchOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catsOpen, setCatsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  const [announceIdx, setAnnounceIdx] = useState(0)
  const announce = useMemo(
    () => [t('header.announce1'), t('header.announce2'), t('header.announce3')],
    [t, i18n.language],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!catsOpen) return undefined
    const close = () => setCatsOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [catsOpen])

  const onSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) {
      setSearchOpen(true)
      return
    }
    navigate(`/shop?q=${encodeURIComponent(q)}`)
    setQuery('')
  }

  const setLang = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <div className={`header-stack ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="topbar topbar-rich">
          <div className="container topbar-grid">
            <div className="topbar-left">
              <span>{t('brand.welcome')}</span>
              <div className="social-row" aria-label="Social">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook Big House"
                  className="social-facebook"
                >
                  f
                </a>
              </div>
            </div>
            <div className="topbar-center">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => setAnnounceIdx((i) => (i - 1 + announce.length) % announce.length)}
              >
                ‹
              </button>
              <span key={`${announceIdx}-${i18n.language}`} className="announce-text">
                {announce[announceIdx]}
              </span>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setAnnounceIdx((i) => (i + 1) % announce.length)}
              >
                ›
              </button>
            </div>
            <div className="topbar-right">
              <span>{t('header.tunisia')}</span>
              <label className="lang-switch" aria-label={t('header.language')}>
                <select
                  value={
                    i18n.language?.startsWith('ar')
                      ? 'ar'
                      : i18n.language?.startsWith('fr')
                        ? 'fr'
                        : 'en'
                  }
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="fr">{t('header.french')}</option>
                  <option value="en">{t('header.english')}</option>
                  <option value="ar">{t('header.arabic')}</option>
                </select>
              </label>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="topbar-fb">
                {t('nav.facebook')}
              </a>
              <Link to="/admin/login" className="topbar-login">
                {t('header.logIn')}
              </Link>
            </div>
          </div>
        </div>

        <header className="site-header site-header-rich">
          <div className="container header-main">
            <button
              type="button"
              className="icon-btn menu-toggle"
              aria-label={t('nav.openMenu')}
              onClick={() => setMobileOpen(true)}
            >
              <IconMenu />
            </button>

            <Link to="/" className="brand brand-text" aria-label={brand.name}>
              <span className="brand-word-big">Big</span>
              <span className="brand-word-house">House</span>
            </Link>

            <nav className="nav-links" aria-label="Main">
              {linkDefs.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.to === '/'}>
                  {t(`nav.${l.key}`)}
                </NavLink>
              ))}
            </nav>

            <div className="header-utils">
              <div className="header-phone">
                <IconPhone className="header-phone-ico" />
                <div className="header-phone-text">
                  <strong>{brand.phone}</strong>
                  <span>{t('brand.hours')}</span>
                </div>
              </div>

              <a
                href={brand.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="icon-btn location-btn"
                aria-label={t('header.location')}
                title={t('header.location')}
              >
                <IconPin />
              </a>

              <Link to="/admin/login" className="account-chip" aria-label={t('header.logIn')}>
                <IconUser />
                <span className="cart-chip-label">
                  {t('header.logIn')}
                  <strong>{t('header.account')}</strong>
                </span>
              </Link>

              <button
                type="button"
                className="cart-chip"
                onClick={() => setIsOpen(true)}
                aria-label={t('header.openCart')}
              >
                <span className="icon-btn">
                  <IconCart />
                  <span className="cart-count soft">{count}</span>
                </span>
                <span className="cart-chip-label">
                  {t('header.cart')}
                  <strong>{formatPrice(subtotal, i18n.language)}</strong>
                </span>
              </button>
            </div>
          </div>

          <div className="search-bar-wrap">
            <div className="container search-bar">
              <div className={`browse-wrap ${catsOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button type="button" className="browse-btn" onClick={() => setCatsOpen((v) => !v)}>
                  <IconMenu />
                  <span className="browse-label">{t('header.browseCategories')}</span>
                  <IconChevronDown className="browse-chevron" />
                </button>
                {catsOpen && (
                  <div className="browse-menu">
                    {browseCategories.map((c) => (
                      <Link key={c} to={`/shop?category=${c}`} onClick={() => setCatsOpen(false)}>
                        {t(`categories.${c}`)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <form className="header-search" onSubmit={onSearch}>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('header.lookingFor')}
                  aria-label={t('header.search')}
                />
                <button type="submit" className="search-submit">
                  <IconSearch />
                  <span className="search-label">{t('header.search')}</span>
                </button>
              </form>

              <div className="quick-links">
                {quickDefs.map((q) =>
                  q.external ? (
                    <a key={q.key} href={q.href} target="_blank" rel="noreferrer" className="quick-link">
                      <span className={`quick-ico quick-ico-${q.icon}`} aria-hidden>
                        <QuickIcon type={q.icon} />
                      </span>
                      {t(`header.${q.key}`)}
                    </a>
                  ) : (
                    <Link key={q.key} to={q.to} className="quick-link">
                      <span className={`quick-ico quick-ico-${q.icon}`} aria-hidden>
                        <QuickIcon type={q.icon} />
                      </span>
                      {t(`header.${q.key}`)}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label={t('nav.closeMenu')}
          onClick={() => setMobileOpen(false)}
        />
        <div className="mobile-nav-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>{t('nav.menu')}</strong>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setMobileOpen(false)}
              aria-label={t('nav.closeMenu')}
            >
              <IconClose />
            </button>
          </div>
          {linkDefs.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>
              {t(`nav.${l.key}`)}
            </Link>
          ))}
          <div className="mobile-lang">
            <button
              type="button"
              className={i18n.language?.startsWith('fr') ? 'active' : ''}
              onClick={() => setLang('fr')}
            >
              Français
            </button>
            <button
              type="button"
              className={i18n.language?.startsWith('en') ? 'active' : ''}
              onClick={() => setLang('en')}
            >
              English
            </button>
            <button
              type="button"
              className={i18n.language?.startsWith('ar') ? 'active' : ''}
              onClick={() => setLang('ar')}
            >
              العربية
            </button>
          </div>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>
            {t('nav.facebook')}
          </a>
          <Link to="/admin/login" onClick={() => setMobileOpen(false)}>
            {t('header.logIn')}
          </Link>
        </div>
      </div>
    </>
  )
}
