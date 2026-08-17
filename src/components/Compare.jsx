const ROWS = [
  ['Agent topology', 'One model, shared context', 'Four isolated roles · typed handoffs'],
  ['Filesystem safety', 'Edits live workspace', 'Podman / Docker / worktree sandbox on a copy'],
  ['Output shape', 'Opaque file churn', 'niki/<id> branch + patch + report'],
  ['Model policy', 'Vendor lock-in common', 'BYOK · mix providers per agent'],
  ['Audit trail', 'Chat scrollback', 'JSON artifacts + optional security pass'],
  ['Runtime', 'Proprietary cloud agents', 'Rust CLI · Podman / Docker / worktree / cloud'],
  ['Revision loop', 'Manual steering', 'Reviewer bounces back to Coder until approved'],
  ['Security', 'Trust the model', 'CapDrop ALL · network off · secret redaction · spend cap'],
]

import { Reveal } from './motion.jsx'

export default function Compare() {
  return (
    <section className="section section--warm" data-od-id="compare" id="compare">
      <Reveal className="container">
        <h2 className="heading mb-lg">Four agents, one verified branch</h2>
        <p className="body mb-xxl" style={{ maxWidth: '48ch' }}>
          Open source. Rust CLI. Runs where Podman or Docker does. Fire-and-forget, then review like any human
          PR.
        </p>
        <table className="ds-table compare-table" data-od-id="compare-table">
          <thead>
            <tr>
              <th>Capability</th>
              <th>Single-agent chat tools</th>
              <th>Niki</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([cap, single, niki]) => (
              <tr key={cap}>
                <td>{cap}</td>
                <td>{single}</td>
                <td>{niki}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  )
}
