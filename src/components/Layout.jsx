import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchOverlay from './SearchOverlay'
import FloatingContact from './FloatingContact'

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <FloatingContact />
    </div>
  )
}
