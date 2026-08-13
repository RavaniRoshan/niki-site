import { useState } from 'react'
import { Reveal } from './motion.jsx'

const ARCHITECTURE_NODES = [
  {
    id: 'planner',
    label: '◈ Planner',
    desc: 'Analyzes requirements and writes a strict TaskSpec.',
    code: `name: planner
capabilities:
  - read_codebase
  - search_docs
output: TaskSpec.md
constraints:
  - no_code_execution
  - require_test_plan: true`
  },
  {
    id: 'coder',
    label: '⟠ Coder',
    desc: 'Executes the TaskSpec and generates unified diffs.',
    code: `name: coder
capabilities:
  - write_files
  - replace_content
input: TaskSpec.md
sandbox: podman
limits:
  max_tokens: 8192
  timeout: 300s`
  },
  {
    id: 'tester',
    label: '◉ Tester',
    desc: 'Runs test suites against the Coder\'s sandbox.',
    code: `name: tester
capabilities:
  - run_commands
environment:
  NODE_ENV: test
  CI: true
commands:
  - npm run lint
  - npm run test`
  },
  {
    id: 'reviewer',
    label: '◆ Reviewer',
    desc: 'Audits diffs for security, logic, and style.',
    code: `name: reviewer
capabilities:
  - read_diff
policies:
  - require_clean_architecture
  - no_hardcoded_secrets
  - enforce_types
actions:
  - approve
  - request_changes`
  }
]

export default function HowItWorks() {
  const [activeNode, setActiveNode] = useState(ARCHITECTURE_NODES[0])

  return (
    <section className="section section--cool hiw" data-od-id="how-it-works" id="how">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">Architecture as Code</h2>
          <p className="body mb-xxl" style={{ maxWidth: '60ch' }}>
            Niki splits work across isolated agents. Default topology runs a structured pipeline,
            handling tasks via hermetic agent execution. Hover over the blueprint to see how 
            each agent is configured under the hood.
          </p>
        </Reveal>

        <Reveal className="architecture-blueprint" data-od-id="architecture">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '24px', 
            background: 'var(--surface-dark)', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            border: '1px solid var(--border)'
          }}>
            
            {/* Interactive Diagram Pane */}
            <div className="diagram-pane" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                System Topology
              </div>
              {ARCHITECTURE_NODES.map(node => (
                <div 
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node)}
                  onClick={() => setActiveNode(node)}
                  style={{
                    padding: '16px',
                    background: activeNode.id === node.id ? 'var(--tui-accent)' : 'var(--surface-soft)',
                    color: activeNode.id === node.id ? 'var(--bg)' : 'var(--fg)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    border: '1px solid',
                    borderColor: activeNode.id === node.id ? 'var(--tui-accent)' : 'transparent',
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{node.label}</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>{node.desc}</div>
                </div>
              ))}
            </div>

            {/* Code Snippet Pane */}
            <div className="code-pane" style={{ background: '#111', borderRadius: '8px', padding: '24px', overflowX: 'auto', border: '1px solid #222' }}>
              <div style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                {activeNode.id}.yaml
              </div>
              <pre style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#e0e0e0', fontFamily: 'var(--font-mono)' }}>
                <code>{activeNode.code}</code>
              </pre>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}
