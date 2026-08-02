import { Reveal } from './motion.jsx'

const PH_URL = 'https://www.producthunt.com/products/niki'

export default function ProductHunt() {
  return (
    <section className="section" data-od-id="producthunt" id="producthunt">
      <Reveal className="container">
        <h2 className="heading mb-lg">Launching on Product Hunt</h2>
        <p className="body mb-xl" style={{ maxWidth: '52ch' }}>
          Niki is about to launch on Product Hunt. Join the waitlist, follow the
          launch, and be among the first to try the hermetic multi-agent coding
          system that ships reviewable pull requests.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href={PH_URL} target="_blank" rel="noopener">
            Follow on Product Hunt
          </a>
          <a className="btn btn-secondary" href="#start">
            Install now
          </a>
        </div>
      </Reveal>
    </section>
  )
}