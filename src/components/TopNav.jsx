import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import LogoWordmark from './LogoWordmark.jsx'

const GITHUB_URL = 'https://github.com/RavaniRoshan/niki'

export default function TopNav() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  return (
    <header className={`topnav${open ? ' is-open' : ''}`} data-od-id="topnav" id="topnav">
      <div className="topnav-inner">
        <LogoWordmark ariaLabel="Niki" dataOdId="logo" />
        <nav className="topnav-links" data-od-id="nav-links">
          <a href={GITHUB_URL} target="_blank" rel="noopener">GitHub</a>
          <Link to="/#why">Why</Link>
          <Link to="/#pipeline">Pipeline</Link>
          <Link to="/#pricing">Pricing</Link>
          <Link to="/#start">Install</Link>
          <Link to="/waitlist">Waitlist</Link>
          <Link to="/#faq">FAQ</Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            className="theme-toggle"
            data-od-id="theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggle}
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
          <button
            type="button"
            className="nav-toggle"
            data-od-id="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="topnav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '[x]' : '[=]'}
          </button>
          <a className="btn btn-primary" data-od-id="nav-cta" href={GITHUB_URL} target="_blank" rel="noopener">
            GitHub ↓
          </a>
        </div>
      </div>
    </header>
  )
}
