import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './motion.jsx'

const REPO_URL = 'https://github.com/RavaniRoshan/niki'
const RELEASES_URL = `${REPO_URL}/releases`

const INSTALLERS = [
  {
    id: 'unix',
    label: 'Linux / macOS',
    cmd: 'curl -fsSL https://raw.githubusercontent.com/RavaniRoshan/niki/master/install.sh | sh',
  },
  {
    id: 'windows',
    label: 'Windows',
    cmd: 'irm https://raw.githubusercontent.com/RavaniRoshan/niki/master/install.ps1 | iex',
  },
]

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
          Install Niki in seconds. Prebuilt binaries for every platform, or build from source.
        </p>

        <div className="install-step">
          <div className="install-step-title">1 — Get the binary</div>
          <div className="stack-lg">
            {INSTALLERS.map((i) => (
              <div key={i.id}>
                <span className="label" style={{ display: 'block', marginBottom: 8 }}>{i.label}</span>
                <Snippet code={i.cmd} odId={`install-snippet-${i.id}`} />
              </div>
            ))}
          </div>
          <p className="install-note mt-lg">
            Prebuilt binaries and package manager commands for every platform are on the{' '}
            <Link className="ink" to="/downloads" data-od-id="install-downloads-link">
              downloads page
            </Link>
            .
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
