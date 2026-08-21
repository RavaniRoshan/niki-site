import { Link } from 'react-router-dom'
import { Reveal } from './motion.jsx'

const GITHUB_URL = 'https://github.com/RavaniRoshan/niki'
const RELEASES_URL = 'https://github.com/RavaniRoshan/niki/releases'
const DOCS_URL = 'https://ravaniroshan.github.io/niki/'

export default function Footer() {
  return (
    <footer className="pagefoot" data-od-id="footer">
      <Reveal className="container">
        <div className="foot-links" data-od-id="footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">Releases</a>
          <Link to="/privacy">Privacy</Link>
          <Link to="/#why">Why</Link>
          <Link to="/#how">Pipeline</Link>
          <Link to="/#pricing">Pricing</Link>
          <Link to="/downloads">Downloads</Link>
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">Docs</a>
          <Link to="/proof">Proof</Link>
          <Link to="/waitlist">Waitlist</Link>
          <Link to="/#faq">FAQ</Link>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Niki · Apache-2.0 · Built in Rust</span>
          <span>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">Source</a>
            · Hermetic agents · BYOK
          </span>
        </div>
      </Reveal>
    </footer>
  )
}
