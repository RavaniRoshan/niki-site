import TopNav from './TopNav.jsx'
import Footer from './Footer.jsx'
import { Seo } from '../seo.jsx'

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy · Niki"
        description="How Niki collects, uses, and protects your data. Plain-language privacy policy."
        path="/privacy"
      />
      <TopNav />
      <main id="content">
        <section className="section" data-od-id="privacy">
          <div className="container" style={{ maxWidth: '68ch' }}>
            <h1 className="heading mb-lg">Privacy Policy</h1>
            <p className="body mb-xl">Last updated: August 2026</p>

            <h2 className="body-strong mb-lg">What data we collect</h2>
            <p className="body mb-lg">
              When you join the waitlist, we collect your email address and any optional
              information you provide (team size, preferred stack, how you plan to run Niki,
              and your consent to be contacted). This is submitted through Formspree, our
              form handling service.
            </p>
            <p className="body mb-xl">
              We also use Vercel Analytics to track page views and basic usage patterns.
              This data is anonymous — it does not include your name, email, or any
              personal identifiers.
            </p>

            <h2 className="body-strong mb-lg">What we don&apos;t collect</h2>
            <p className="body mb-xl">
              We don&apos;t collect your code, your API keys, or any data from your Niki runs.
              Self-hosted Niki runs entirely on your infrastructure. We don&apos;t sell your
              data to anyone, ever.
            </p>

            <h2 className="body-strong mb-lg">Local storage</h2>
            <p className="body mb-xl">
              We store your theme preference (light/dark) in your browser&apos;s localStorage.
              This stays on your device and is never sent to our servers.
            </p>

            <h2 className="body-strong mb-lg">Who sees your data</h2>
            <p className="body mb-xl">
              Only the Niki team can see your waitlist submission. We use it solely to
              manage cloud beta access and send launch-day updates. We never share or sell
              your information.
            </p>

            <h2 className="body-strong mb-lg">How to delete your data</h2>
            <p className="body mb-xl">
              Want us to remove your data? Open an issue on our{' '}
              <a
                className="ink"
                href="https://github.com/RavaniRoshan/niki/issues"
                target="_blank"
                rel="noreferrer"
              >
                GitHub repository
              </a>{' '}
              and we&apos;ll handle it promptly.
            </p>

            <h2 className="body-strong mb-lg">Contact</h2>
            <p className="body mb-xl">
              Questions about this policy? Reach out via{' '}
              <a
                className="ink"
                href="https://github.com/RavaniRoshan/niki/issues"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
