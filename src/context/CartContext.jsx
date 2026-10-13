import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'

const CartContext = createContext(null)
const STORAGE_KEY = 'premium-market-cart'
const CATALOG_HANDLES = new Set(products.map((product) => product.handle))

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw).filter((item) => CATALOG_HANDLES.has(item.handle)) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.handle === product.handle)
      if (existing) {
        return prev.map((i) =>
          i.handle === product.handle ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [
        ...prev,
        {
          handle: product.handle,
          title: product.title,
          price: product.price,
          image: product.images[0],
          qty,
        },
      ]
    })
    setIsOpen(true)
  }

  const removeItem = (handle) => {
    setItems((prev) => prev.filter((i) => i.handle !== handle))
  }

  const setQty = (handle, qty) => {
    const next = Math.max(1, qty)
    setItems((prev) => prev.map((i) => (i.handle === handle ? { ...i, qty: next } : i)))
  }

  const clearCart = () => setItems([])

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])

  const value = {
    items,
    count,
    subtotal,
    isOpen,
    setIsOpen,
    searchOpen,
    setSearchOpen,
    addItem,
    removeItem,
    setQty,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
