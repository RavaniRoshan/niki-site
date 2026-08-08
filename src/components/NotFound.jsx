import { Link } from 'react-router-dom'
import { Seo } from '../seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 · Page not found"
        description="The page you're looking for doesn't exist."
        robots="noindex"
      />
      <main id="content">
        <section className="section" data-od-id="not-found">
          <div className="container" style={{ textAlign: 'center', padding: '120px 0' }}>
            <h1 className="display mb-lg">404</h1>
            <p className="body mb-xl" style={{ maxWidth: '48ch', margin: '0 auto 32px' }}>
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <Link className="btn btn-primary" to="/" data-od-id="not-found-home">
              Go home
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
