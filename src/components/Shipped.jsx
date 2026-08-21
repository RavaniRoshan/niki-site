const ITEMS = [
  ['Parallel coders + synthesizer', '— N Coders in isolated worktrees; synthesis merges the best diff'],
  ['User-defined pipeline topology', '— ordered [pipeline] stages with per-role provider/model'],
  ['Security Auditor agent', '— adversarial vulnerability pass after Reviewer via [security]'],
  ['Sandbox trait', '— Podman · Docker · git worktree · cloud beta'],
  ['Podman-first runtime discovery', '— probes rootless/rootful Podman sockets, then Docker; no daemon, no root'],
  ['Dashboard + cost analytics', '— token usage, latency, HTML diff viewer'],
  ['External knowledge ingestion', '— doc globs + URLs into every agent prompt'],
  ['Visible draggable scrollbar', '— thumb + track in the chat viewport; click or drag to jump'],
  ['Mouse hover + click system', '— every surface responds to the cursor; flash + double-click word select'],
  ['Kill ring + yank', '— Ctrl+Y / Alt+Y; Ctrl+W/U/K delete into the ring'],
  ['Input undo/redo', '— Ctrl+Z / Ctrl+_ revert any edit'],
  ['Protected paths & destructive commands', '— .git, .ssh, rm -rf, sudo, git push always prompt'],
  ['Shared skills portability', '— read/write ~/.agents/skills/ across machines'],
  ['Kitty keyboard protocol', '— Shift+Enter disambiguation on Kitty/Ghostty/WezTerm'],
]

import { Reveal, Stagger, StaggerItem } from './motion.jsx'

export default function Shipped() {
  return (
    <section className="section section--cool" data-od-id="shipped" id="shipped">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">Shipped in v0.6.0</h2>
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
