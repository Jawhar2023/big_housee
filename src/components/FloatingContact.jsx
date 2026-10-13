import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { brand } from '../data/brand'

/** Official WhatsApp glyph (white mark on brand green button) */
function IconWhatsApp({ size = 28, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden {...props}>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  )
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  )
}

function IconTikTok(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M7 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16.5 12.5 21 14v3a2 2 0 0 1-2.2 2A16 16 0 0 1 5 7.2 2 2 0 0 1 7 3z" />
    </svg>
  )
}

export default function FloatingContact() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const phoneHref = `tel:${brand.phone.replace(/\s/g, '')}`

  return (
    <div className={`fab-contact ${open ? 'open' : ''}`}>
      {open && (
        <button type="button" className="fab-backdrop" aria-label={t('common.close')} onClick={() => setOpen(false)} />
      )}

      <div className="fab-stack" role="menu" aria-hidden={!open}>
        <a
          className="fab-item fab-instagram"
          href={brand.instagram}
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          aria-label="Instagram"
          title="Instagram"
          onClick={() => setOpen(false)}
        >
          <IconInstagram />
        </a>
        <a
          className="fab-item fab-tiktok"
          href={brand.tiktok}
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          aria-label="TikTok"
          title="TikTok"
          onClick={() => setOpen(false)}
        >
          <IconTikTok />
        </a>
        <a
          className="fab-item fab-facebook"
          href={brand.facebook}
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          aria-label={t('nav.facebook')}
          title={t('nav.facebook')}
          onClick={() => setOpen(false)}
        >
          <IconFacebook />
        </a>
        <a
          className="fab-item fab-whatsapp"
          href={brand.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          role="menuitem"
          aria-label="WhatsApp"
          title="WhatsApp"
          onClick={() => setOpen(false)}
        >
          <IconWhatsApp size={24} />
        </a>
        <a
          className="fab-item fab-call"
          href={phoneHref}
          role="menuitem"
          aria-label={t('contact.phone')}
          title={brand.phone}
          onClick={() => setOpen(false)}
        >
          <IconPhone />
        </a>
      </div>

      <button
        type="button"
        className={`fab-main fab-whatsapp ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-label={open ? t('common.close') : 'WhatsApp'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <span className="fab-x">×</span> : <IconWhatsApp size={30} />}
      </button>
    </div>
  )
}
