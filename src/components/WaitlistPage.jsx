import { Link } from 'react-router-dom'
import TopNav from './TopNav.jsx'
import Waitlist from './Waitlist.jsx'
import Footer from './Footer.jsx'
import { Seo } from '../seo.jsx'

export default function WaitlistPage() {
  return (
    <>
      <Seo
        title="Join the Niki cloud beta · Multi-agent coding pipeline"
        description="Request access to Niki's managed cloud beta — the open-source multi-agent coding pipeline that plans, codes, tests, and reviews in hermetic sandboxes."
        path="/waitlist"
      />
      <TopNav />
      <main id="content">
        <Waitlist />
        <BrandNudge />
      </main>
      <Footer />
    </>
  )
}

// Lightweight context under the form so visitors can still reach the product page.
function BrandNudge() {
  return (
    <section className="section" data-od-id="waitlist-nudge" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <p className="body" style={{ maxWidth: '52ch' }}>
          Want to read more first?{' '}
          <Link className="ink" to="/#why" data-od-id="wl-back">
            See how NIKI works
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
