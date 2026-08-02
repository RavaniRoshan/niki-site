import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'niki-theme'

const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

function getInitialTheme() {
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme) {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  }
  return 'light'
}

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [explicitTheme, setExplicitTheme] = useState(() => {
    if (typeof localStorage === 'undefined') return false
    try {
      return localStorage.getItem(STORAGE_KEY) !== null
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      if (explicitTheme) return
      const next = e.matches ? 'dark' : 'light'
      setTheme(next)
    }
    if (mq.addEventListener) {
      mq.addEventListener('change', handler)
    } else if (mq.addListener) {
      mq.addListener(handler)
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handler)
      } else if (mq.removeListener) {
        mq.removeListener(handler)
      }
    }
  }, [explicitTheme])

  const toggle = useCallback(() => {
    setExplicitTheme(true)
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
