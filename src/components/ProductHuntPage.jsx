import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import TopNav from './TopNav.jsx'
import Footer from './Footer.jsx'
import { Seo } from '../seo.jsx'
import { SEGMENT_PRODUCT_HUNT } from '../lib/waitlist.js'

export default function ProductHuntPage() {
  return (
    <>
      <Seo
        title="Niki — Backed by open source · Product Hunt"
        description="Niki is a hermetic multi-agent AI coding system. Self-hosted and open source. Try it free today."
        path="/producthunt"
        robots="noindex"
      />
      <TopNav />
      <main id="content">
        <section className="section" data-od-id="ph-landing-hero">
          <div className="container" style={{ maxWidth: '68ch', textAlign: 'center', margin: '0 auto' }}>
            <span className="badge" style={{ marginBottom: 24, display: 'inline-block' }}>Backed by open source</span>
            <h1 className="display mb-lg">Describe it. Niki ships the pull request.</h1>
            <p className="lede mb-xl" style={{ margin: '0 auto' }}>
              Four isolated AI agents — Planner, Coder, Tester, Reviewer — collaborate inside a
              sandbox and hand you a clean, reviewable branch. Your working tree is never touched.
            </p>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <Link
                className="btn btn-primary"
                to="/#start"
                data-od-id="ph-install-cta"
                onClick={() => track('ph_cta_install')}
              >
                Install now
              </Link>
              <Link
                className="btn btn-secondary"
                to={`/waitlist?segment=${encodeURIComponent(SEGMENT_PRODUCT_HUNT)}`}
                data-od-id="ph-waitlist-cta"
                onClick={() => track('ph_cta_waitlist')}
              >
                Join cloud beta
              </Link>
            </div>
          </div>
        </section>

        <section className="section" data-od-id="ph-landing-value" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 className="heading mb-lg">Why teams choose Niki</h2>
            <div className="tiers" data-od-id="ph-value-props">
              <div className="tier" data-od-id="ph-value-oss">
                <h3 className="tier-name">Open source</h3>
                <p className="tier-lede">
                  The entire system is open source. Self-host on your own infrastructure
                  with your own API keys — no vendor lock-in.
                </p>
              </div>
              <div className="tier" data-od-id="ph-value-hermetic">
                <h3 className="tier-name">Hermetic agents</h3>
                <p className="tier-lede">
                  Each agent runs in an isolated sandbox. No agent can touch your working
                  tree or see your secrets.
                </p>
              </div>
              <div className="tier" data-od-id="ph-value-reviewable">
                <h3 className="tier-name">Reviewable output</h3>
                <p className="tier-lede">
                  Every change comes as a clean branch you can review, test, and merge
                  on your terms. Full audit trail included.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" data-od-id="ph-landing-cta" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="heading mb-lg">Ready to try it?</h2>
            <p className="body mb-xl" style={{ maxWidth: '52ch', margin: '0 auto' }}>
              Self-hosted Niki is free and available now. Or join the waitlist for the
              managed cloud beta.
            </p>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <Link
                className="btn btn-primary"
                to="/#start"
                data-od-id="ph-final-install"
              >
                Install now
              </Link>
              <Link
                className="btn btn-secondary"
                to={`/waitlist?segment=${encodeURIComponent(SEGMENT_PRODUCT_HUNT)}`}
                data-od-id="ph-final-waitlist"
              >
                Join cloud beta
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
