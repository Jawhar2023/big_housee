import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { brand } from '../data/brand'
import { IconCart, IconHome, IconSearch, IconUser } from './Icons'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <p>{t('brand.tagline')}</p>
            <a className="footer-facebook" href={brand.facebook} target="_blank" rel="noreferrer">
              {t('footer.followFb')}
            </a>
          </div>
          <div>
            <h4>{t('footer.quickLinks')}</h4>
            <div className="footer-links">
              <Link to="/shop">{t('nav.shop')}</Link>
              <Link to="/about">{t('nav.about')}</Link>
              <Link to="/contact">{t('nav.contact')}</Link>
              <Link to="/admin/login">Admin</Link>
              <a href={brand.facebook} target="_blank" rel="noreferrer">
                {t('nav.facebook')}
              </a>
            </div>
          </div>
          <div>
            <h4>{t('footer.help')}</h4>
            <div className="footer-links">
              <Link to="/contact">{t('footer.support')}</Link>
              <a href={brand.mapsUrl} target="_blank" rel="noreferrer">
                {t('footer.location')}
              </a>
              <a href="#shipping">{t('footer.shipping')}</a>
              <a href="#returns">{t('footer.returns')}</a>
              <a href="#faq">{t('footer.faq')}</a>
            </div>
          </div>
          <div>
            <h4>{t('footer.newsletter')}</h4>
            <p>{t('footer.newsletterText')}</p>
            <form
              className="newsletter"
              onSubmit={(e) => {
                e.preventDefault()
                e.currentTarget.reset()
                alert(t('footer.thanks'))
              }}
            >
              <input type="email" required placeholder={t('footer.emailPh')} aria-label={t('contact.email')} />
              <button className="btn btn-accent" type="submit">
                {t('footer.ok')}
              </button>
            </form>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {t('brand.name')}
          </span>
          <a href={brand.facebook} target="_blank" rel="noreferrer">
            Facebook · Big House
          </a>
        </div>
      </footer>
      <MobileBottomBar />
    </>
  )
}

function MobileBottomBar() {
  const { t } = useTranslation()
  const { setIsOpen, setSearchOpen, count } = useCart()
  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile">
      <Link to="/">
        <IconHome />
        {t('mobile.home')}
      </Link>
      <Link to="/shop">
        <IconUser />
        {t('mobile.shop')}
      </Link>
      <button type="button" onClick={() => setSearchOpen(true)}>
        <IconSearch />
        {t('mobile.search')}
      </button>
      <button type="button" onClick={() => setIsOpen(true)}>
        <span style={{ position: 'relative' }}>
          <IconCart />
          {count > 0 && (
            <span className="cart-count" style={{ top: '-6px', right: '-10px', position: 'absolute' }}>
              {count}
            </span>
          )}
        </span>
        {t('mobile.cart')}
      </button>
    </nav>
  )
}
