import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './motion.jsx'
import { track } from '../analytics.jsx'

const REPO_URL = 'https://github.com/RavaniRoshan/niki'
const RELEASE_URL = 'https://github.com/RavaniRoshan/niki/releases/download/v0.4.0'

const INSTALLER_UNIX = `curl --proto '=https' --tlsv1.2 -LsSf ${RELEASE_URL}/niki-installer.sh | sh`
const INSTALLER_WINDOWS = `powershell -ExecutionPolicy Bypass -c "irm ${RELEASE_URL}/niki-installer.ps1 | iex"`

const STEPS = [
  {
    title: '2 — Build the sandbox image',
    caption: 'Requires Podman (recommended) or Docker running.',
    cmd: 'podman build -t niki-sandbox:24.04 -f docker/Dockerfile .   # or: docker build ...',
    odId: 'install-snippet-step-2',
  },
  {
    title: '3 — Configure a provider',
    caption: 'Bring an API key for at least one LLM provider.',
    cmd: 'cp niki.example.toml niki.toml && export ANTHROPIC_API_KEY=sk-ant-…',
    odId: 'install-snippet-step-3',
  },
  {
    title: '4 — Run it',
    caption: 'Agents run against a sandbox copy; your working tree is untouched.',
    cmd: './target/release/niki run "Add a /health endpoint" --project /path/to/project',
    odId: 'install-snippet-step-4',
  },
]

function Snippet({ code, odId }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
        track('install_copy_command', { code })
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

export default function Install() {
  return (
    <section className="section section--dark" data-od-id="install" id="start">
      <Reveal className="container">
        <h2 className="heading mb-lg">Install</h2>
        <p className="body mb-xl" style={{ maxWidth: '52ch' }}>
          Self-hosted Niki is available now. Clone, build, and run — no waitlist required.
        </p>

        <div className="hero-cta mb-xl">
          <button
            type="button"
            className="btn btn-primary"
            data-od-id="install-copy-unix"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(INSTALLER_UNIX)
                track('install_copy_unix')
              } catch {
                /* ignore */
              }
            }}
          >
            Copy install command
          </button>
          <Link
            className="btn btn-secondary"
            to="/downloads"
            data-od-id="install-downloads-link"
          >
            Downloads
          </Link>
        </div>

        <div className="install-step">
          <div className="install-step-title">1 — Install</div>
          <p className="install-note" style={{ marginTop: 0, marginBottom: 8 }}>
            Prebuilt binaries for macOS, Windows, and Linux. Run the installer for your platform:
          </p>
          <div className="stack-lg">
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 8 }}>Linux / macOS</span>
              <Snippet code={INSTALLER_UNIX} odId="install-snippet-unix" />
            </div>
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 8 }}>Windows (PowerShell)</span>
              <Snippet code={INSTALLER_WINDOWS} odId="install-snippet-windows" />
            </div>
          </div>
          <p className="install-note mt-lg">
            Or build from source:{' '}
            <code style={{ fontSize: '0.85em' }}>git clone https://github.com/RavaniRoshan/niki.git &amp;&amp; cd niki &amp;&amp; cargo build --release</code>
          </p>
        </div>

        {STEPS.map((s) => (
          <div className="install-step" key={s.title}>
            <div className="install-step-title">{s.title}</div>
            <p className="install-note" style={{ marginTop: 0, marginBottom: 8 }}>
              {s.caption}
            </p>
            <Snippet code={s.cmd} odId={s.odId} />
          </div>
        ))}

        <div className="mt-xl stack-lg">
          <div className="list-row">
            <span className="mark">[x]</span>
            <div>
              <span className="label">Review the branch</span> — git -C /path/to/project switch
              niki/&lt;id&gt; · niki report &lt;id&gt;
            </div>
          </div>
          <div className="list-row">
            <span className="mark">[x]</span>
            <div>
              <span className="label">Providers</span> — Anthropic · OpenAI · Google · Ollama · any
              OpenAI/Anthropic-compatible gateway
            </div>
          </div>
          <div className="list-row">
            <span className="mark">[x]</span>
            <div>
              <span className="label">Backends</span> — podman (default) · docker fallback · --backend
              worktree · --backend cloud (beta)
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
