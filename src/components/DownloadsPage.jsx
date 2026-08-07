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
  { platform: 'macOS Apple Silicon', arch: 'aarch64', filename: 'niki-aarch64-apple-darwin.tar.xz' },
  { platform: 'macOS Intel', arch: 'x86_64', filename: 'niki-x86_64-apple-darwin.tar.xz' },
  { platform: 'Windows x64', arch: 'x86_64', filename: 'niki-x86_64-pc-windows-msvc.zip' },
  { platform: 'Linux ARM64', arch: 'aarch64', filename: 'niki-aarch64-unknown-linux-gnu.tar.xz' },
  { platform: 'Linux x64', arch: 'x86_64', filename: 'niki-x86_64-unknown-linux-gnu.tar.xz' },
]

const INSTALLERS = [
  {
    id: 'unix',
    label: 'Linux / macOS',
    cmd: `curl -fsSL ${RELEASE_DOWNLOAD}/niki-installer.sh | sh`,
  },
  {
    id: 'windows',
    label: 'Windows',
    cmd: `irm ${RELEASE_DOWNLOAD}/niki-installer.ps1 | iex`,
  },
]

const PACKAGES = [
  { label: 'Homebrew (macOS)', cmd: 'brew install ravaniroshan/tap/niki' },
  { label: 'winget (Windows)', cmd: 'winget install niki' },
  { label: 'Scoop (Windows)', cmd: 'scoop install niki' },
  { label: 'Cargo (any)', cmd: 'cargo install niki' },
]

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
        title="Union Downloads · Niki release binaries and installers"
        description="Download Niki v0.2.0 binaries, installer scripts, and package manager commands. Available for macOS, Windows, and Linux."
        path="/downloads"
      />
      <TopNav />
      <main id="content">
        <section className="section" data-od-id="downloads-hero">
          <Reveal className="container">
            <span className="tier-badge tier-badge-ready" style={{ marginBottom: 16, display: 'inline-block' }}>
              v0.2.0
            </span>
            <h1 className="heading mb-lg">Union Downloads</h1>
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
                      <a
                        className="btn btn-primary"
                        href={`${RELEASE_DOWNLOAD}/${b.filename}`}
                        data-od-id={`download-${b.arch}-${b.platform.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        Download
                      </a>
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
                <Snippet code={i.cmd} odId={`downloads-installer-${i.id}`} />
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
                  <Snippet code={p.cmd} odId={`downloads-package-${p.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} />
                </div>
              ))}
            </div>
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
              <a href={RELEASE_TAG} target="_blank" rel="noopener" className="ink">
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
