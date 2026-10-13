import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { isAdminLoggedIn, loginAdmin } from '../../lib/adminAuth'
import { brand } from '../../data/brand'
import { tAdmin } from './adminI18n'
import '../../styles/admin.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [lang] = useState(() => localStorage.getItem('bpa-admin-lang') || 'fr')
  const t = (k) => tAdmin(lang, k)

  if (isAdminLoggedIn()) return <Navigate to="/admin" replace />

  const onSubmit = (e) => {
    e.preventDefault()
    if (loginAdmin(email, password)) {
      navigate('/admin', { replace: true })
      return
    }
    setError(t('badCredentials'))
  }

  return (
    <div className="admin-login" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="admin-login-brand">
          <img className="admin-login-logo" src="/brand/logo.jpg" alt={brand.name} />
          <div>
            <h1>{brand.name}</h1>
            <p>{t('loginTitle')}</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="admin-login-form">
          <label htmlFor="admin-email">{t('email')}</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            placeholder="email@example.com"
            required
          />
          <label htmlFor="admin-pass">{t('password')}</label>
          <input
            id="admin-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            placeholder="••••••••"
            required
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', marginTop: 6 }}>
            {t('signIn')}
          </button>
        </form>
        <Link to="/" className="admin-back-link">
          {t('back')}
        </Link>
      </motion.div>
    </div>
  )
}
