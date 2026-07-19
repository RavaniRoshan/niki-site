const ITEMS = [
  ['Parallel coders + synthesizer', '— N Coders in isolated worktrees; synthesis merges the best diff'],
  ['User-defined pipeline topology', '— ordered [pipeline] stages with per-role provider/model'],
  ['Security Auditor agent', '— adversarial vulnerability pass after Reviewer via [security]'],
  ['Sandbox trait', '— Docker · git worktree · cloud beta'],
  ['Dashboard + cost analytics', '— token usage, latency, HTML diff viewer'],
  ['External knowledge ingestion', '— doc globs + URLs into every agent prompt'],
]

import { Reveal, Stagger, StaggerItem } from './motion.jsx'

export default function Shipped() {
  return (
    <section className="section" data-od-id="shipped" id="shipped">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">Shipped in v2</h2>
        </Reveal>
        <Stagger>
          {ITEMS.map(([label, desc]) => (
            <StaggerItem className="list-row" key={label}>
              <span className="mark">[x]</span>
              <div>
                <span className="label">{label}</span> {desc}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
