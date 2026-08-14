import { Link } from 'react-router-dom'
import { Reveal } from './motion.jsx'

export default function ProductHunt() {
  return (
    <section className="section" data-od-id="producthunt" id="producthunt">
      <Reveal className="container">
        <h2 className="heading mb-lg">Product Hunt launch — August 18</h2>
        <p className="body mb-xl" style={{ maxWidth: '52ch' }}>
          Niki launches on Product Hunt Tuesday August 18. Try Niki now for free,
          self-hosted — no waitlist required for the open-source build.
        </p>
        <div className="producthunt-card">
          <div className="hero-cta">
            <Link
              className="btn btn-primary"
              to="/waitlist?segment=Product%20Hunt%20launch"
              data-od-id="producthunt"
            >
              Join the cloud beta waitlist
            </Link>
            <a className="btn btn-secondary" href="#start">
              Install now
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}