const ROWS = [
  ['Agent topology', 'One model, shared context', 'Four isolated roles · typed handoffs'],
  ['Filesystem safety', 'Edits live workspace', 'Docker / worktree sandbox on a copy'],
  ['Output shape', 'Opaque file churn', 'niki/<id> branch + patch + report'],
  ['Model policy', 'Vendor lock-in common', 'BYOK · mix providers per agent'],
  ['Audit trail', 'Chat scrollback', 'JSON artifacts + optional security pass'],
  ['Runtime', 'Proprietary cloud agents', 'Rust CLI · Docker / worktree / cloud'],
]

import { Reveal } from './motion.jsx'

export default function Compare() {
  return (
    <section className="section" data-od-id="compare" id="compare">
      <Reveal className="container">
        <h2 className="heading mb-lg">Built for review, not auto-merge theater</h2>
        <p className="body mb-xxl" style={{ maxWidth: '48ch' }}>
          Open source. Rust CLI. Runs where Docker does. Fire-and-forget, then review like any human
          PR.
        </p>
        <table className="ds-table" data-od-id="compare-table">
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
