const FEATURES = [
  {
    id: 'feat-multi',
    text: (
      <>
        <span className="label">Multi-agent, not monolithic</span> — Planning, coding, testing, and
        review are separate agents with their own prompts and models.
      </>
    ),
  },
  {
    id: 'feat-hermetic',
    text: (
      <>
        <span className="label">Hermetic by default</span> — All work happens in a Docker sandbox
        bind-mounted to a copy of your project. Your tree is never mutated mid-run.
      </>
    ),
  },
  {
    id: 'feat-branch',
    text: (
      <>
        <span className="label">Output is a git branch</span> — You get{' '}
        <strong className="ink">niki/&lt;id&gt;</strong> with a real commit, a diff, and artifacts.
        Nothing lands on main until you say so.
      </>
    ),
  },
  {
    id: 'feat-byok',
    text: (
      <>
        <span className="label">BYOK &amp; provider-mixing</span> — Bring your own keys. Give Planner
        a strong reasoner and Tester a cheap model.
      </>
    ),
  },
  {
    id: 'feat-revisions',
    text: (
      <>
        <span className="label">Reviewer-driven revisions</span> — The Reviewer can bounce work back
        to the Coder for up to max_revision_rounds.
      </>
    ),
  },
  {
    id: 'feat-audit',
    text: (
      <>
        <span className="label">Fully auditable</span> — report.md, changes.patch, and
        artifacts/*.json capture what every agent decided, and why.
      </>
    ),
  },
]

import { Reveal, Stagger, StaggerItem } from './motion.jsx'

export default function WhatIsNiki() {
  return (
    <section className="section" data-od-id="what" id="why">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">What is Niki?</h2>
          <p className="body mb-xl" style={{ maxWidth: '58ch' }}>
            Today’s AI coding tools run on a single agent in one long conversation. Context collapses,
            tests get skipped, and changes land where you didn’t ask. Niki splits the work across
            independent agents that can’t influence one another — isolated at the filesystem and the
            context layer.
          </p>
        </Reveal>
        <Stagger className="stack-lg">
          {FEATURES.map((f) => (
            <StaggerItem className="list-row" data-od-id={f.id} key={f.id}>
              <span className="mark">[+]</span>
              <div>{f.text}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
