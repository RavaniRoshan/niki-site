import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './motion.jsx'
import { track } from '../analytics.jsx'

const REPO_URL = 'https://github.com/RavaniRoshan/niki'



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
    <section className="section" data-od-id="install" id="start">
      <Reveal className="container">
        <h2 className="heading mb-lg">Install</h2>
        <p className="body mb-xl" style={{ maxWidth: '52ch' }}>
          Self-hosted Niki is available now. Clone, build, and run — no waitlist required.
        </p>

        <div className="hero-cta mb-xl">
          <a
            className="btn btn-primary"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            data-od-id="install-downloads-btn"
          >
            View on GitHub
          </a>
          <Link
            className="btn btn-secondary"
            to="/downloads"
            data-od-id="install-downloads-link"
          >
            Downloads
          </Link>
        </div>

        <div className="install-step">
          <div className="install-step-title">1 — Clone and build</div>
          <p className="install-note" style={{ marginTop: 0, marginBottom: 8 }}>
            The only path that works today. Prebuilt binaries and package managers are coming soon.
          </p>
          <Snippet code={`git clone https://github.com/RavaniRoshan/niki.git && cd niki && cargo build --release`} odId="install-snippet-step-1" />
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
