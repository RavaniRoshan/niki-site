import { useEffect, useState } from 'react'
import { Reveal } from './motion.jsx'
import FeatureScroller from './FeatureScroller'
import { DemoClip } from './DemoClip'

const FEATURES = [
  {
    clipKey: 'red',
    title: 'Red team, on by default',
    body: 'An adversarial agent challenges the Coder and Reviewer on every run. It never approves — it only raises falsifiable risks.',
  },
  {
    clipKey: 'synthesizer', tag: 'parallel',
    title: 'Synthesizer',
    body: 'Enable [parallel] and several Coders run in separate worktrees; the Synthesizer merges them into one git-apply-able diff.',
  },
  {
    clipKey: 'security', badge: 'Opt-in · security',
    title: 'Security Auditor',
    body: 'With [security] on, it scans the diff for injection, authz, secrets, and sandbox-escape risks. Recorded as an artifact; it does not gate the loop by default.',
  },
  {
    clipKey: 'solo', badge: 'Auto · Low complexity',
    title: 'Solo fast-path',
    body: 'At Low complexity, Auto collapses Planner/Coder/Tester/Red into one solo session. Fast — but it trades away independent review.',
  },
]

function prefersReduced() {
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HowItWorks() {
  const [paused, setPaused] = useState(false)
  const [motionOk, setMotionOk] = useState(() => !prefersReduced())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setMotionOk(!mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  return (
    <section className="section hiw" data-od-id="how-it-works" id="how">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">How it works</h2>
          <p className="body mb-xxl" style={{ maxWidth: '60ch' }}>
            Niki splits work across isolated agents. Default topology runs five of them — Planner →
            Coder → Tester → Red → Reviewer — and hands you back a reviewable branch. Each agent has
            one job, one artifact, and its own focused demo.
          </p>
        </Reveal>

        <FeatureScroller motionOk={motionOk} paused={paused} />

        <div className="hiw-controls" data-od-id="hiw-controls">
          <button type="button" className="hiw-pause"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}>
            {paused ? '▶ Play demos' : '❚❚ Pause demos'}
          </button>
          {!motionOk && (
            <button type="button" className="hiw-pause" onClick={() => setMotionOk(true)}>
              Show animations
            </button>
          )}
          <span className="caption">Looping demos. Pause to stop them all; click a step on the left to jump to it.</span>
        </div>

        <Reveal className="hiw-optin" data-od-id="hiw-optin">
          <h3 className="heading mb-lg">Opt-in modes &amp; specialties</h3>
          <p className="body mb-xl" style={{ maxWidth: '62ch' }}>
            The default loop runs five agents. Flip these modes and specialties on when the task
            calls for them — each is its own toggle, not a rewrite of the system.
          </p>

          <div className="hiw-grid">
            {FEATURES.map((f) => (
              <article key={f.clipKey} className="hiw-card"
                data-od-id={`hiw-feature-${f.clipKey}`}>
                <div className="hiw-card-media">
                  <DemoClip clipKey={f.clipKey} motionOk={motionOk} paused={paused}
                    label={`${f.title} demo`} />
                </div>
                <div className="hiw-card-text">
                  {f.badge && <span className="badge">{f.badge}</span>}
                  <h4 className="hiw-feature-title">
                    {f.title}
                    {f.tag && <span className="hiw-feature-tag">{f.tag}</span>}
                  </h4>
                  <p className="body">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
