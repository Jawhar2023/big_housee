const SESSION_KEY = 'bighouse-admin-session'
/** Change these in production / env */
export const ADMIN_EMAIL = 'bighouse@gmail.com'
export const ADMIN_PASSWORD = 'tarekadmin'

export function isAdminLoggedIn() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function loginAdmin(email, password) {
  const e = String(email || '')
    .trim()
    .toLowerCase()
  const p = String(password || '')
  if (e === ADMIN_EMAIL.toLowerCase() && p === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, '1')
    return true
  }
  return false
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY)
}
