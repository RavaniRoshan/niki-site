import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Reveal } from './motion.jsx'

const FAQS = [
  {
    id: 'faq-safe',
    q: 'Does Niki touch my working tree?',
    a: 'No. Agents run against a copy inside a sandbox (Podman or Docker by default, or git worktree). You review a niki/<id> branch and merge on your terms.',
  },
  {
    id: 'faq-keys',
    q: 'Do I need a Niki API key?',
    a: 'No bundled gateway. Bring your own Anthropic, OpenAI, Google, or Ollama keys. Env vars override niki.toml so secrets stay out of the repo.',
  },
  {
    id: 'faq-models',
    q: 'Can each agent use a different model?',
    a: 'Yes. Assign provider and model per agent in niki.toml — e.g. a strong reasoner for Planner/Reviewer and a cheaper model for Tester.',
  },
  {
    id: 'faq-license',
    q: 'What is the license?',
    a: 'Business Source License 1.1 (BUSL-1.1). See the repository Cargo.toml and LICENSE for distribution terms. Status: prototype.',
  },
  {
    id: 'faq-docker',
    q: 'Can I run it without Docker?',
    a: 'Yes. Niki prefers Podman — rootless, no daemon — and falls back to Docker automatically. Or use --backend worktree for git-worktree isolation without any container runtime, or --backend cloud (beta) when NIKI_CLOUD_ENDPOINT is set.',
  },
  {
    id: 'faq-podman',
    q: 'Is Podman supported?',
    a: 'Yes — Niki is Podman-first. It auto-detects the rootless Podman socket (no daemon, no root), then rootful Podman, then Docker. Verified end-to-end on Ubuntu 24.04 with Podman 4.9.3: image build, container lifecycle, and bind mounts all pass.',
  },
  {
    id: 'faq-install',
    q: 'How do I install Niki?',
    a: 'Today you clone the repo and run cargo build --release (Rust 2024 edition). Prebuilt binaries for x86_64 Linux, ARM64 Linux, x86_64 Windows, x86_64 macOS, and Apple Silicon macOS are on the way via GitHub Releases, alongside a shell installer, a PowerShell installer, winget/Scoop, a Homebrew tap, and cargo install niki.',
  },
]

export default function Faq() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(() => new Set())

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="section" data-od-id="faq" id="faq">
      <Reveal className="container">
        <h2 className="heading mb-xl">FAQ</h2>
        {FAQS.map((f) => {
          const isOpen = open.has(f.id)
          return (
            <div className="faq-row" data-od-id={f.id} key={f.id}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`faq-body-${f.id}`}
                id={`faq-q-${f.id}`}
                onClick={() => toggle(f.id)}
              >
                <span className="tog" aria-hidden="true"></span>
                <span>{f.q}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={`faq-body-${f.id}`}
                    role="region"
                    aria-labelledby={`faq-q-${f.id}`}
                    key="body"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="faq-body">{f.a}</div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </Reveal>
    </section>
  )
}
