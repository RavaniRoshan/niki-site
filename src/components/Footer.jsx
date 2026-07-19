import { Reveal } from './motion.jsx'

const GITHUB_URL = 'https://github.com/RavaniRoshan/niki'

export default function Footer() {
  return (
    <footer className="pagefoot" data-od-id="footer">
      <Reveal className="container">
        <div className="foot-links" data-od-id="footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noopener">GitHub</a>
          <a href="#why">Why</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#start">Install</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Niki · BUSL-1.1 · Built in Rust</span>
          <span>
            <a href={GITHUB_URL} target="_blank" rel="noopener">Source</a>
            · Hermetic agents · BYOK
          </span>
        </div>
      </Reveal>
    </footer>
  )
}
