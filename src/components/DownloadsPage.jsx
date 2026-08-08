import { useState } from 'react'
import { Link } from 'react-router-dom'
import TopNav from './TopNav.jsx'
import Footer from './Footer.jsx'
import { Reveal } from './motion.jsx'
import { Seo } from '../seo.jsx'

const RELEASE_VERSION = 'v0.2.0'
const RELEASE_DOWNLOAD = `https://github.com/RavaniRoshan/niki/releases/download/${RELEASE_VERSION}`
const RELEASE_TAG = `https://github.com/RavaniRoshan/niki/releases/tag/${RELEASE_VERSION}`

const BINARIES = [
  { platform: 'macOS Apple Silicon', arch: 'aarch64', filename: 'niki-aarch64-apple-darwin.tar.xz', available: false },
  { platform: 'macOS Intel', arch: 'x86_64', filename: 'niki-x86_64-apple-darwin.tar.xz', available: false },
  { platform: 'Windows x64', arch: 'x86_64', filename: 'niki-x86_64-pc-windows-msvc.zip', available: false },
  { platform: 'Linux ARM64', arch: 'aarch64', filename: 'niki-aarch64-unknown-linux-gnu.tar.xz', available: false },
  { platform: 'Linux x64', arch: 'x86_64', filename: 'niki-x86_64-unknown-linux-gnu.tar.xz', available: false },
]

const INSTALLERS = [
  {
    id: 'unix',
    label: 'Linux / macOS',
    cmd: `curl -fsSL https://install.niki.dev | sh`,
    available: false,
  },
  {
    id: 'windows',
    label: 'Windows',
    cmd: `irm https://install.niki.dev | iex`,
    available: false,
  },
]

const PACKAGES = [
  { label: 'Homebrew (macOS)', cmd: 'brew install ravaniroshan/tap/niki', available: false },
  { label: 'winget (Windows)', cmd: 'winget install niki', available: false },
  { label: 'Scoop (Windows)', cmd: 'scoop install niki', available: false },
  { label: 'Cargo (any)', cmd: 'cargo install niki', available: false },
]

const SOURCE_BUILD = {
  label: 'Clone and build from source',
  cmd: 'git clone https://github.com/RavaniRoshan/niki.git && cd niki && cargo build --release',
  available: true,
  odId: 'downloads-source-build',
}

const GITHUB_RELEASES = {
  label: 'GitHub Releases',
  url: 'https://github.com/RavaniRoshan/niki/releases',
  available: true,
  odId: 'downloads-github-releases',
}

function Snippet({ code, odId }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
        return
      }
    } catch {
      /* fall through to manual */
    }
    setCopied('select')
  }

  return (
    <div className="install-snippet" data-od-id={odId}>
      <code>{code}</code>
      <button
        type="button"
        className="copy-btn"
        data-od-id="copy-btn"
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        {copied === true ? 'copied' : copied === 'select' ? 'select+copy' : 'copy'}
      </button>
    </div>
  )
}

export default function DownloadsPage() {
  return (
    <>
      <Seo
        title="Niki — Downloads"
        description="Niki binaries, installers, and package manager commands. Self-hosted builds work today; prebuilt releases are coming soon."
        path="/downloads"
      />
      <TopNav />
      <main id="content">
        <section className="section" data-od-id="downloads-hero">
          <Reveal className="container">
            <span className="tier-badge tier-badge-ready" style={{ marginBottom: 16, display: 'inline-block' }}>
              v0.2.0
            </span>
            <h1 className="heading mb-lg">Niki — Downloads</h1>
            <p className="body mb-xl" style={{ maxWidth: '52ch' }}>
              All distribution assets for Niki {RELEASE_VERSION}. Direct binaries, installer scripts,
              and package manager commands for every supported platform.
            </p>
          </Reveal>
        </section>

        <section className="section" data-od-id="downloads-binaries" style={{ borderTop: '1px solid var(--border)' }}>
          <Reveal className="container">
            <h2 className="heading mb-lg">Binary Downloads</h2>
            <table className="ds-table" data-od-id="downloads-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Architecture</th>
                  <th>Filename</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {BINARIES.map((b) => (
                  <tr key={b.filename}>
                    <td>{b.platform}</td>
                    <td>{b.arch}</td>
                    <td>
                      <code>{b.filename}</code>
                    </td>
                    <td>
                      {b.available ? (
                        <a
                          className="btn btn-primary"
                          href={`${RELEASE_DOWNLOAD}/${b.filename}`}
                          data-od-id={`download-${b.arch}-${b.platform.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          Download
                        </a>
                      ) : (
                        <span className="tier-badge tier-badge-soon" data-od-id={`download-${b.arch}-${b.platform.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>Coming soon</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </section>

        <section className="section" data-od-id="downloads-installers" style={{ borderTop: '1px solid var(--border)' }}>
          <Reveal className="container">
            <h2 className="heading mb-lg">Installer Scripts</h2>
            <p className="body" style={{ maxWidth: '52ch', marginBottom: 24 }}>
              One-line installers that detect your platform and architecture, then download and verify the correct binary.
            </p>
            {INSTALLERS.map((i) => (
              <div key={i.id} className="stack-lg" style={{ marginBottom: 24 }}>
                <span className="label">{i.label}</span>
                {i.available ? (
                  <Snippet code={i.cmd} odId={`downloads-installer-${i.id}`} />
                ) : (
                  <p className="install-note" data-od-id={`downloads-installer-${i.id}`}>Coming soon</p>
                )}
              </div>
            ))}
          </Reveal>
        </section>

        <section className="section" data-od-id="downloads-packages" style={{ borderTop: '1px solid var(--border)' }}>
          <Reveal className="container">
            <h2 className="heading mb-lg">Package Managers</h2>
            <div className="stack-lg">
              {PACKAGES.map((p) => (
                <div key={p.label} style={{ marginBottom: 16 }}>
                  <span className="label" style={{ display: 'block', marginBottom: 8 }}>{p.label}</span>
                  {p.available ? (
                    <Snippet code={p.cmd} odId={`downloads-package-${p.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} />
                  ) : (
                    <p className="install-note" data-od-id={`downloads-package-${p.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>Coming soon</p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="section" data-od-id="downloads-source" style={{ borderTop: '1px solid var(--border)' }}>
          <Reveal className="container">
            <h2 className="heading mb-lg">Build from source</h2>
            <p className="body" style={{ maxWidth: '52ch', marginBottom: 24 }}>
              Self-hosted Niki is available now. Clone the repo and build with Cargo — no waitlist required.
            </p>
            <div className="stack-lg">
              <span className="label" style={{ display: 'block', marginBottom: 8 }}>{SOURCE_BUILD.label}</span>
              <Snippet code={SOURCE_BUILD.cmd} odId={SOURCE_BUILD.odId} />
            </div>
            <p className="body" style={{ marginTop: 24 }}>
              <a href={GITHUB_RELEASES.url} target="_blank" rel="noreferrer" className="ink" data-od-id={GITHUB_RELEASES.odId}>
                {GITHUB_RELEASES.label} →
              </a>
            </p>
          </Reveal>
        </section>

        <section className="section" data-od-id="downloads-checksums" style={{ borderTop: '1px solid var(--border)' }}>
          <Reveal className="container">
            <h2 className="heading mb-lg">Checksum Verification</h2>
            <p className="body" style={{ maxWidth: '52ch', marginBottom: 16 }}>
              SHA-256 checksums for every asset are published with the release. Download the checksums file and verify:
            </p>
            <div className="stack-lg">
              <Snippet code={`curl -fsSL ${RELEASE_DOWNLOAD}/sha256sums.txt -o sha256sums.txt && sha256sum -c sha256sums.txt`} odId="downloads-checksum-example" />
            </div>
            <p className="body" style={{ marginTop: 16 }}>
              <a href={RELEASE_TAG} target="_blank" rel="noreferrer" className="ink">
                View full release notes on GitHub
              </a>
            </p>
          </Reveal>
        </section>

        <section className="section" data-od-id="downloads-cta" style={{ borderTop: '1px solid var(--border)' }}>
          <Reveal className="container">
            <p className="body" style={{ maxWidth: '52ch' }}>
              Need help getting started?{' '}
              <Link className="ink" to="/#start" data-od-id="downloads-back-install">
                See the install guide
              </Link>
              .
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
