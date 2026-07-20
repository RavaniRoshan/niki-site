import { Link } from 'react-router-dom'
import { Reveal } from './motion.jsx'
import { SEGMENT_MANAGED_CLOUD } from '../lib/waitlist.js'

const GITHUB_URL = 'https://github.com/RavaniRoshan/niki'
const ENTERPRISE_MAILTO = 'mailto:enterprise@niki.dev?subject=NIKI%20Enterprise'

export default function Pricing() {
  const enterpriseWaitlist = `/waitlist?segment=${encodeURIComponent(SEGMENT_MANAGED_CLOUD)}`

  return (
    <section className="section" data-od-id="pricing" id="pricing">
      <Reveal className="container">
        <h2 className="heading mb-lg">Pricing</h2>
        <p className="body mb-xxl" style={{ maxWidth: '56ch' }}>
          Two ways to run NIKI. The core value — hermetic, reviewable multi-agent coding —
          is fully available self-hosted and free. Cloud is optional.
        </p>

        <div className="tiers" data-od-id="tiers">
          {/* ── Free / Self-hosted ── */}
          <div className="tier" data-od-id="tier-free">
            <div className="tier-head">
              <span className="tier-badge tier-badge-ready">Available today</span>
              <h3 className="tier-name">Free / Self-hosted</h3>
              <div className="tier-price">$0</div>
              <p className="tier-lede">
                Run NIKI on your own infrastructure. Bring your own API keys, run on local
                Docker or a git worktree. The majority path — fully functional today.
              </p>
            </div>

            <ul className="tier-features">
              <li><span className="mark">[x]</span> Your keys, your infra (BYOK)</li>
              <li><span className="mark">[x]</span> Docker or git-worktree isolation</li>
              <li><span className="mark">[x]</span> Review the branch before you merge</li>
              <li><span className="mark">[x]</span> Unlimited local agents &amp; use cases</li>
            </ul>

            <div className="tier-cta">
              <a className="btn btn-primary" href="#start">Install</a>
              <a className="btn btn-secondary" href={GITHUB_URL} target="_blank" rel="noopener">
                GitHub
              </a>
            </div>
          </div>

          {/* ── Enterprise / Cloud ── */}
          <div className="tier is-upcoming" data-od-id="tier-enterprise">
            <div className="tier-head">
              <span className="tier-badge tier-badge-soon">Upcoming</span>
              <h3 className="tier-name">Enterprise / Cloud</h3>
              <div className="tier-price">Paid · enterprise</div>
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

            <div className="tier-cta">
              <Link
                className="btn btn-dark"
                to={enterpriseWaitlist}
                data-od-id="enterprise-waitlist"
              >
                Join enterprise waitlist
              </Link>
              <a
                className="btn btn-secondary"
                href={ENTERPRISE_MAILTO}
                data-od-id="enterprise-talk"
              >
                Talk to us
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
