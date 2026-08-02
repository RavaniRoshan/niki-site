import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import App from './App.jsx'
import WaitlistPage from './components/WaitlistPage.jsx'
import { ThemeProvider } from './theme.jsx'
import SiteAnalytics from './analytics.jsx'
import './tailwind.css'
import './styles.css'

// On route change: scroll to the hash target if present (in-page nav from any
// route), otherwise scroll to top.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
        </Routes>
        <SiteAnalytics />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
