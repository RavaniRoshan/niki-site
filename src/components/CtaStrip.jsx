import { Reveal } from './motion.jsx'

const GITHUB_URL = 'https://github.com/RavaniRoshan/niki'

export default function CtaStrip() {
  return (
    <section className="section section--dark" data-od-id="cta-strip" style={{ textAlign: 'left' }}>
      <Reveal className="container">
        <h2 className="heading mb-lg">Read the code. Run a task. Review the branch.</h2>
        <p className="body mb-xl" style={{ maxWidth: '48ch' }}>
          Open source hermetic multi-agent coding — built in Rust, sandboxed in Podman or Docker, yours to fork.
        </p>
        <div className="hero-cta">
          <a className="btn btn-dark" data-od-id="footer-cta" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
          <a className="btn btn-secondary" href="#start">Install</a>
        </div>
      </Reveal>
    </section>
  )
}
