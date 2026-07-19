import { PixelGrid } from './ui/pixel-grid'
import { useTheme } from '../theme.jsx'
import LogoWordmark from './LogoWordmark.jsx'
import { Reveal } from './motion.jsx'

export default function BrandLogo() {
  const { theme } = useTheme()
  const pixelColor = theme === 'dark' ? '#fdfcfc' : '#201d1d'

  return (
    <section
      className="section"
      data-od-id="brand-logo"
      style={{ position: 'relative', textAlign: 'center', overflow: 'hidden' }}
    >
      {/* Clipped background layer: PixelGrid is `fixed` by default (full viewport),
          so we override it to `absolute` and clip it to this section box with
          overflow:hidden. It stops at the section's bottom edge. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
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
      <div className="container">
        <Reveal>
          <LogoWordmark as="a" href="#top" className="brand-logo" ariaLabel="Niki" dataOdId="brand-logo-mark" />
        </Reveal>
      </div>
    </section>
  )
}
