import { m } from 'framer-motion'
import { PixelGrid } from '../components/ui/pixel-grid'
import { useTheme } from '../theme.jsx'
import { Reveal, Stagger, StaggerItem } from './motion.jsx'

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
    <div className="hero-block" data-od-id="hero" id="top" style={{ position: 'relative' }}>
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
          <h1 className="display">Describe it. Niki ships the pull request.</h1>
        </StaggerItem>
        <StaggerItem>
          <p className="lede">
            Niki is an AI software engineering assistant that turns a requested change into a
            reviewable pull request branch. Four isolated agents — Planner, Coder, Tester, Reviewer —
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
            >
              View on GitHub
            </m.a>
            <m.a
              className="btn btn-secondary"
              href="#start"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              Install
            </m.a>
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
          <div className="tui-log" data-od-id="tui-log" aria-live="polite">
            <div className="dim">$ niki run "Add a GET /health endpoint" --project ./my-app</div>
            <div><span className="info">◈ Planner</span>  <span className="ok">TaskSpec ready</span></div>
            <div className="dim">  files: src/routes/health.ts · tests/health.test.ts</div>
            <div><span className="info">⟠ Coder</span>   <span className="ok">unified diff applied</span></div>
            <div><span className="info">◉ Tester</span>  <span className="ok">3 passed · 0 failed</span></div>
            <div><span className="info">◆ Reviewer</span> <span className="ok">approved · 0 revisions</span></div>
            <div className="ok">✓</div> branch niki/a7f3c2 · report.md · changes.patch
            <div className="dim">working tree: untouched</div>
          </div>
          <div className="tui-keys">
            <span><kbd>tab</kbd> switch agent</span>
            <span><kbd>ctrl-p</kbd> commands</span>
            <span><kbd>esc</kbd> cancel run</span>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
