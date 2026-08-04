import { Reveal } from './motion.jsx'

const PH_URL = 'https://www.producthunt.com/products/niki-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-niki-3'
const PH_BADGE_URL = 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1214430&theme=dark&t=1785823659937'

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
        <div className="producthunt-card">
          <a className="producthunt-badge" href={PH_URL} target="_blank" rel="noopener noreferrer">
            <img
              alt="Niki - Describe it. Niki ships the pull request | Product Hunt"
              width="250"
              height="54"
              src={PH_BADGE_URL}
            />
          </a>
          <div className="hero-cta">
            <a className="btn btn-primary" href={PH_URL} target="_blank" rel="noopener noreferrer">
              Follow on Product Hunt
            </a>
            <a className="btn btn-secondary" href="#start">
              Install now
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}