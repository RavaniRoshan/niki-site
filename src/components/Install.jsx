import { useState } from 'react'
import { Reveal } from './motion.jsx'

const TABS = [
  {
    label: 'cargo',
    cmd: 'git clone https://github.com/RavaniRoshan/niki.git && cd niki && cargo build --release',
  },
  {
    label: 'podman',
    cmd: 'podman build -t niki-sandbox:24.04 -f docker/Dockerfile .   # or: docker build ...',
  },
  {
    label: 'config',
    cmd: 'cp niki.example.toml niki.toml && export ANTHROPIC_API_KEY=sk-ant-…',
  },
  {
    label: 'run',
    cmd: './target/release/niki run "Add a /health endpoint" --project /path/to/project',
  },
]

export default function Install() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const code = TABS[active].cmd

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
    <section className="section" data-od-id="install" id="start">
      <Reveal className="container">
        <h2 className="heading mb-lg">Install</h2>
        <p className="body mb-xl" style={{ maxWidth: '52ch' }}>
          Prerequisites: Rust (2024 edition), Podman (recommended) or Docker running, and an API key for at least one LLM
          provider.
        </p>

        <div className="tabs" role="tablist" data-od-id="install-tabs">
          {TABS.map((t, i) => (
            <button
              type="button"
              key={t.label}
              className={`tab${i === active ? ' is-active' : ''}`}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="install-snippet" data-od-id="install-snippet">
          <code id="install-code">{code}</code>
          <button type="button" className="copy-btn" data-od-id="copy-btn" onClick={handleCopy}>
            {copied === true ? 'copied' : copied === 'select' ? 'select+copy' : 'copy'}
          </button>
        </div>

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
<span className="label">Backends</span> — podman (default) · docker fallback · --backend worktree ·
                               --backend cloud (beta)
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
