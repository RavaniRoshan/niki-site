const STAGES = [
  {
    role: '01',
    name: '◈ Planner',
    desc: 'Reads the task plus current files. Emits which paths to touch and the approach.',
    out: 'TaskSpec',
  },
  {
    role: '02',
    name: '⟠ Coder',
    desc: 'Produces a unified diff applied only inside the sandboxed workspace copy.',
    out: 'unified diff',
  },
  {
    role: '03',
    name: '◉ Tester',
    desc: 'Reasons about the change against the diff and reports which tests pass or fail.',
    out: 'test results',
  },
  {
    role: '04',
    name: '✗ Red',
    desc: 'Adversarial agent (on by default) raises challenges about what Coder and Reviewer missed.',
    out: 'RedChallenge',
  },
  {
    role: '05',
    name: '◆ Reviewer',
    desc: 'Approves or requests changes. On bounce-back, Coder revises until pass or cap.',
    out: 'branch + report',
  },
]

import { Reveal, Stagger, StaggerItem } from './motion.jsx'

export default function Pipeline() {
  return (
    <section className="section" data-od-id="pipeline" id="pipeline">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">How it works</h2>
          <p className="body mb-xxl" style={{ maxWidth: '52ch' }}>
            Default topology: Planner → Coder → Tester → Red → Reviewer. Replace it with your own ordered
            [pipeline] in niki.toml.
          </p>
        </Reveal>
        <Stagger className="pipeline" data-od-id="pipeline-grid">
          {STAGES.map((s) => (
            <StaggerItem className="pipe-cell" key={s.role}>
              <div className="role">{s.role}</div>
              <div className="name">{s.name}</div>
              <div className="desc">{s.desc}</div>
              <div className="out">out → <strong>{s.out}</strong></div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
