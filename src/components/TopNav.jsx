import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import LogoWordmark from './LogoWordmark.jsx'

const GITHUB_URL = 'https://github.com/RavaniRoshan/niki'
const DOCS_URL = 'https://ravaniroshan.github.io/niki/'

export default function TopNav() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  return (
    <header className={`topnav${open ? ' is-open' : ''}`} data-od-id="topnav" id="topnav">
      <div className="topnav-inner">
        <LogoWordmark ariaLabel="Niki" dataOdId="logo" />
        <nav className="topnav-links" data-od-id="nav-links">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link to="/#why">Why</Link>
          <Link to="/#how">Pipeline</Link>
          <Link to="/#pricing">Pricing</Link>
          <div className="nav-menu">
            <button type="button" className="nav-menu-trigger" aria-haspopup="true">
              Resources ▾
            </button>
            <div className="nav-menu-panel" role="menu">
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" role="menuitem">Docs</a>
              <Link to="/downloads" role="menuitem">Downloads</Link>
              <Link to="/waitlist" role="menuitem">Waitlist</Link>
            </div>
          </div>
          <Link to="/#faq">FAQ</Link>
        </nav>
        <div className="topnav-actions" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            type="button"
            className="theme-toggle"
            data-od-id="theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggle}
          >
            {theme === 'dark' ? '☀' : '☾'}
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
          <a className="btn btn-primary" data-od-id="nav-cta" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub ↓
          </a>
        </div>
      </div>
    </header>
  )
}
