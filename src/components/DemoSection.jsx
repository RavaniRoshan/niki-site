import { Reveal } from './motion.jsx'

export default function DemoSection() {
  return (
    <section className="section" data-od-id="demo" id="demo">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">See it run</h2>
          <p className="body mb-xl" style={{ maxWidth: '52ch' }}>
            Describe a change in plain English. Niki runs a four-stage agent pipeline
            in an isolated container and gives you back a branch to review.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="demo-frame" style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-elevated)',
            background: '#0d1117',
          }}>
            <img
              src="/demo.gif"
              alt="Niki demo showing Planner, Coder, Tester, and Reviewer agents running"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
              loading="lazy"
            />
          </div>
          <p className="caption mt-md" style={{ textAlign: 'center', opacity: 0.6 }}>
            Real output — no tricks, no sped-up footage
          </p>
        </Reveal>
      </div>
    </section>
  )
}
