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
        <span className="label">Hermetic by default</span> — All work happens in a Podman or Docker sandbox
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
            Niki is a hermetic multi-agent AI coding system for teams that want safer,
            reviewable software changes. Instead of one long AI conversation, it splits work across
            Planner, Coder, Tester, and Reviewer agents. Each agent gets a bounded job, runs inside
            an isolated sandbox, and helps produce a branch you can inspect before anything lands.
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
