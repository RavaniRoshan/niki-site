import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PixelGrid } from '../components/ui/pixel-grid'
import { useTheme } from '../theme.jsx'
import { Reveal, Stagger, StaggerItem } from './motion.jsx'
import { track } from '../analytics.jsx'

const GITHUB_URL = 'https://github.com/RavaniRoshan/niki'

const ASCII_LOGO = `███╗   ██╗██╗██╗  ██╗██╗
████╗  ██║██║██║ ██╔╝██║
██╔██╗ ██║██║█████╔╝ ██║
██║╚██╗██║██║██╔═██╗ ██║
██║ ╚████║██║██║  ██╗██║
╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝`

export default function Hero() {
  const { theme } = useTheme()

  // Recolored to the brand's monochrome ink/paper scheme. In dark mode the
  // pixels flip to the off-white so they stay visible against the near-black
  // page. -z-10 + pointer-events-none keep it a non-interactive background
  // layer behind all content.
  const pixelColor = theme === 'dark' ? '#fdfcfc' : '#201d1d'

  return (
    <div className="hero-block" data-od-id="hero" id="top" style={{ position: 'relative', background: 'var(--grad-hero)' }}>
      {/* Clipped background layer: the PixelGrid is `fixed` by default (full
          viewport), so we override it to `absolute` and clip it to this hero
          box with overflow:hidden. It now stops at the hero's bottom edge. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: -10,
          pointerEvents: 'none',
        }}
      >
        <PixelGrid
          bgColor="transparent"
          pixelColor={pixelColor}
          pixelSize={2}
          pixelSpacing={8}
          glow={false}
          className="!absolute -z-10 pointer-events-none"
        />
      </div>
      <Stagger className="hero-text" onLoad>
        <StaggerItem>
          <span className="badge">Beta</span>
        </StaggerItem>
        <StaggerItem>
          <h1 className="display text-gradient">Describe it. Niki ships a verified pull request.</h1>
        </StaggerItem>
        <StaggerItem>
          <p className="lede">
            Niki is an AI software engineering assistant that turns a requested change into a
            verified pull request branch. Four isolated agents — Planner, Coder, Tester, Reviewer —
            collaborate inside a Podman or Docker sandbox and hand you a clean <strong className="ink">niki/&lt;id&gt;</strong>
            branch. Your working tree is never touched.
          </p>
        </StaggerItem>
        <StaggerItem>
          <div className="hero-cta">
            <m.a
              className="btn btn-primary"
              data-od-id="hero-cta"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={() => track('hero_cta_github')}
            >
              View on GitHub
            </m.a>
            <Link
              className="btn btn-secondary"
              to="/downloads"
              data-od-id="hero-downloads"
              onClick={() => track('hero_cta_downloads')}
            >
              Downloads ↓
            </Link>
            <m.a
              className="btn btn-secondary"
              href="#start"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={() => track('hero_cta_install')}
            >
              Install
            </m.a>
          </div>
          <div className="power-trio mt-xl" style={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', opacity: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Hermetic Sandbox</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <div style={{ display: 'flex', color: 'var(--tui-warning)' }}>
                {'★★★★★'}
              </div>
              <span>Apache-2.0 Open Source</span>
            </div>
          </div>
        </StaggerItem>
      </Stagger>

      <Reveal className="hero-tui" data-od-id="hero-tui" onLoad delay={0.2}>
        <div className="tui-frame">
          <pre className="tui-ascii" aria-hidden="true">{ASCII_LOGO}</pre>
          <div className="tui-prompt" data-od-id="tui-prompt">
            <span className="pipe">│</span>
            <span className="cmd">Build</span>
            <span className="model">Add GET /health → {'{ status, uptime }'}</span>
            <span className="tok">sandbox</span>
            <span className="tok">podman</span>
          </div>
          <Stagger className="tui-log" data-od-id="tui-log" aria-live="polite" delay={0.6}>
            <StaggerItem className="dim">$ niki run &quot;Add a GET /health endpoint&quot; --project ./my-app</StaggerItem>
            <StaggerItem><div><span className="info">◈ Planner</span>  <span className="ok">TaskSpec ready</span></div></StaggerItem>
            <StaggerItem><div className="dim">  files: src/routes/health.ts · tests/health.test.ts</div></StaggerItem>
            <StaggerItem><div><span className="info">⟠ Coder</span>   <span className="ok">unified diff applied</span></div></StaggerItem>
            <StaggerItem><div><span className="info">◉ Tester</span>  <span className="ok">3 passed · 0 failed</span></div></StaggerItem>
            <StaggerItem><div><span className="info">◆ Reviewer</span> <span className="ok">approved · 0 revisions</span></div></StaggerItem>
            <StaggerItem>
              <div>
                <span className="ok">✓</span> branch niki/a7f3c2 · report.md · changes.patch
              </div>
            </StaggerItem>
            <StaggerItem><div className="dim">working tree: untouched</div></StaggerItem>
          </Stagger>
          <div className="tui-keys">
            <span><kbd>tab</kbd> toggle view</span>
            <span><kbd>ctrl-p</kbd> commands</span>
            <span><kbd>esc</kbd> quit (run continues)</span>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
