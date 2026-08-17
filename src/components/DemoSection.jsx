import { Reveal } from './motion.jsx'

export default function DemoSection() {
  return (
    <section className="section" data-od-id="demo" id="demo">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">See it run</h2>
          <p className="body mb-xl" style={{ maxWidth: '52ch' }}>
            Open <code className="ink">niki chat</code> in your terminal. Describe what you want
            in plain English. Niki streams back code, explanations, and follow-ups — all
            in a rich chat interface with syntax highlighting.
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
              alt="Niki chat interface showing a conversation about adding dark mode toggle"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
              loading="lazy"
            />
          </div>
          <p className="caption mt-md" style={{ textAlign: 'center', opacity: 0.6 }}>
            Real terminal output — niki chat in action
          </p>
        </Reveal>
      </div>
    </section>
  )
}
