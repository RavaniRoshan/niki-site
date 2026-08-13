import { useState } from 'react'
import { Reveal } from './motion.jsx'
import { SEGMENT_MANAGED_CLOUD } from '../lib/waitlist.js'

const GITHUB_URL = 'https://github.com/RavaniRoshan/niki'
const ENTERPRISE_MAILTO = 'mailto:enterprise@niki.dev?subject=NIKI%20Enterprise'

export default function Pricing() {
  const [tokens, setTokens] = useState(1)
  const proPrice = tokens * 15 // Base $15 per M tokens
  const enterpriseWaitlist = `/waitlist?segment=${encodeURIComponent(SEGMENT_MANAGED_CLOUD)}`

  return (
    <section className="section section--warm" data-od-id="pricing" id="pricing">
      <Reveal className="container">
        <h2 className="heading mb-lg">Pricing</h2>
        <p className="body mb-xxl" style={{ maxWidth: '56ch' }}>
          Two ways to run NIKI. The core value — hermetic, reviewable multi-agent coding —
          is fully available self-hosted and free. Cloud is optional.
        </p>

        <div className="tiers" data-od-id="tiers" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* ── Open Source ── */}
          <div className="tier" data-od-id="tier-free">
            <div className="tier-head">
              <h3 className="tier-name text-gradient">Open Source</h3>
              <div className="tier-price">$0</div>
              <p className="tier-lede">
Run NIKI on your own infrastructure. Bring your own API keys, run on local
                 Podman or Docker, or a git worktree. The majority path — fully functional today.
              </p>
            </div>

            <ul className="tier-features">
              <li><span className="mark">[x]</span> Your keys, your infra (BYOK)</li>
              <li><span className="mark">[x]</span> Podman/Docker or git-worktree isolation</li>
              <li><span className="mark">[x]</span> Review the branch before you merge</li>
              <li><span className="mark">[x]</span> Unlimited local agents &amp; use cases</li>
            </ul>

            <div className="tier-cta" style={{ display: 'flex', gap: '8px' }}>
              <a className="btn btn-primary" href="#start" style={{ flex: 1 }}>Install Free</a>
              <a className="btn btn-secondary" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </div>
          </div>

          {/* ── Pro / Usage Based ── */}
          <div className="tier" data-od-id="tier-pro" style={{ borderColor: 'var(--tui-accent)', boxShadow: 'var(--shadow-elevated)' }}>
            <div className="tier-head">
              <span className="tier-badge" style={{ background: 'var(--tui-accent)', color: 'var(--bg)', border: 'none' }}>Most Popular</span>
              <h3 className="tier-name text-gradient">Pro (Managed)</h3>
              <div className="tier-price">${proPrice}<span style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '400' }}>/mo</span></div>
              <p className="tier-lede">
                Managed infrastructure for fast execution. Pricing scales with token usage.
              </p>
              
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                  <span>Usage: {tokens}M Tokens</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={tokens}
                  onChange={(e) => setTokens(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--tui-accent)' }} 
                />
              </div>
            </div>

            <ul className="tier-features">
              <li><span className="mark">[x]</span> Zero config infrastructure</li>
              <li><span className="mark">[x]</span> Unlimited sandboxed workflows</li>
              <li><span className="mark">[x]</span> Priority model access</li>
              <li><span className="mark">[x]</span> Review branch before merge</li>
            </ul>

            <div className="tier-cta" style={{ display: 'flex', gap: '8px' }}>
              <a className="btn btn-primary" href={enterpriseWaitlist} style={{ flex: 1, background: 'var(--tui-accent)', borderColor: 'var(--tui-accent)' }}>Start Trial</a>
            </div>
          </div>

          {/* ── Enterprise ── */}
          <div className="tier" data-od-id="tier-enterprise" style={{ background: 'var(--surface-soft)' }}>
            <div className="tier-head">
              <h3 className="tier-name">Enterprise</h3>
              <div className="tier-price" style={{ fontSize: '24px' }}>Custom</div>
              <p className="tier-lede">
                NIKI provides all managed infrastructure. Run an effectively unlimited number
                of agents and use cases without owning compute. Same hermetic safety guarantee —
                proof is still computed client-side.
              </p>
              <p className="tier-note">
                Cloud is optional — not required for core value, and not part of the free tier.
              </p>
            </div>

            <ul className="tier-features">
              <li><span className="mark">[x]</span> Fully managed infrastructure</li>
              <li><span className="mark">[x]</span> No compute to own or operate</li>
              <li><span className="mark">[x]</span> Effectively unlimited scale</li>
              <li><span className="mark">[x]</span> Enterprise support &amp; SSO (planned)</li>
            </ul>

            <div className="tier-cta" style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <a
                className="btn btn-secondary"
                href={ENTERPRISE_MAILTO}
                data-od-id="enterprise-talk"
                style={{ width: '100%' }}
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
