import { useEffect, useRef, useState } from 'react'
import { Reveal } from './motion.jsx'
import { DemoClip } from './DemoClip'

const AGENTS = [
  {
    key: 'planner', glyph: '◈', name: 'Planner', color: '#3b9eff',
    verb: 'Plans', out: 'TaskSpec',
    body: 'Reads the task plus ranked context files and emits a TaskSpec — which paths to touch and the approach. Writes no code.',
  },
  {
    key: 'coder', glyph: '⟠', name: 'Coder', color: '#ff5cc8',
    verb: 'Codes', out: 'unified diff',
    body: 'Produces a unified diff applied only inside the sandboxed workspace copy. Your working tree is never mutated mid-run.',
  },
  {
    key: 'tester', glyph: '◉', name: 'Tester', color: '#30d158',
    verb: 'Tests (simulated)', out: 'TestReport',
    body: 'Reasons about the change against the diff and reports which tests pass or fail. Note: Niki reasons about tests — it does not execute them in the sandbox.',
  },
  {
    key: 'red', glyph: '✗', name: 'Red', color: '#ff453a',
    verb: 'Challenges', out: 'RedChallenge',
    body: 'Adversarial agent, on by default. Raises falsifiable challenges about what the Coder and Reviewer may have missed. Never approves.',
  },
  {
    key: 'reviewer', glyph: '◆', name: 'Reviewer', color: '#ffd60a',
    verb: 'Reviews', out: 'branch + report',
    body: 'Weighs the Coder against the Red critique and approves or bounces work back. Reconciles every Red challenge before a branch ships.',
  },
]

export default function FeatureScroller({ motionOk, paused }) {
  const [active, setActive] = useState(0)
  const cardRefs = useRef([])

  // Scroll-spy: the card centred in the viewport becomes the active step.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.dataset.idx)
            if (!Number.isNaN(idx)) setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    cardRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const goTo = (i) => {
    const el = cardRefs.current[i]
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }

  return (
    <div className="fs" data-od-id="hiw-scroller">
      <aside className="fs-nav" aria-label="Pipeline steps">
        <ol className="fs-nav-list">
          {AGENTS.map((a, i) => (
            <li key={a.key}>
              <button
                type="button"
                className={`fs-nav-item${i === active ? ' is-active' : ''}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => goTo(i)}
              >
                <span className="fs-nav-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="fs-nav-name">{a.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <div className="fs-cards">
        {AGENTS.map((a, i) => (
          <Reveal key={a.key} amount={0.25} y={20}>
            <article
              data-idx={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`fs-card${i === active ? ' is-active' : ''}`}
              data-od-id={`hiw-agent-${a.key}`}
            >
              <div className="fs-card-media">
                <DemoClip clipKey={a.key} motionOk={motionOk} paused={paused}
                  label={`${a.name} demo`} />
              </div>
              <div className="fs-card-text">
                <span className="fs-card-glyph" style={{ color: a.color }} aria-hidden="true">{a.glyph}</span>
                <h3 className="fs-card-title">
                  <span className="fs-card-num">{String(i + 1).padStart(2, '0')}</span> {a.name}
                </h3>
                <p className="body">{a.body}</p>
                <p className="caption">out → <strong>{a.out}</strong> · {a.verb}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
