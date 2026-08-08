import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { LazyMotion, domMax } from 'framer-motion'
import App from './App.jsx'
const WaitlistPage = React.lazy(() => import('./components/WaitlistPage.jsx'))
const DownloadsPage = React.lazy(() => import('./components/DownloadsPage.jsx'))
const PrivacyPage = React.lazy(() => import('./components/PrivacyPage.jsx'))
const ProductHuntPage = React.lazy(() => import('./components/ProductHuntPage.jsx'))
const NotFound = React.lazy(() => import('./components/NotFound.jsx'))
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
        <LazyMotion features={domMax} strict>
          <ScrollManager />
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/producthunt" element={<ProductHuntPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <SiteAnalytics />
        </LazyMotion>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
