import { useEffect, useRef, useState } from 'react'

const WORDMARK = `███╗   ██╗██╗██╗  ██╗██╗
████╗  ██║██║██║ ██╔╝██║
██╔██╗ ██║██║█████╔╝ ██║
██║╚██╗██║██║██╔═██╗ ██║
██║ ╚████║██║██║  ██╗██╗
╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝`

// Mono-width glyphs so the block never reflows mid-animation.
const SCRAMBLE_CHARS = '█╗║▌▐░▒▓│┤┐└┴┬├─┼╣╚╔╩╦╠═╬<>/\\#$%&*+ABCDEF0123456789'

// Small hover delay (ms) so the decode doesn't trigger the instant the cursor
// touches the mark — a brief grace period before the animation starts.
const START_DELAY = 250

export default function LogoWordmark({
  as = 'a',
  href = '#top',
  ariaLabel = 'Niki',
  className = '',
  dataOdId,
}) {
  const [logoText, setLogoText] = useState(WORDMARK)
  const rafRef = useRef(null)
  const hoverTimerRef = useRef(null)

  const cancelScramble = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = null
  }

  const runScramble = () => {
    clearHoverTimer()
    cancelScramble()
    const duration = 650
    const total = WORDMARK.length
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const resolved = Math.floor(progress * total)
      let out = ''
      for (let i = 0; i < total; i++) {
        const c = WORDMARK[i]
        if (c === '\n' || c === ' ') {
          out += c
        } else if (i < resolved) {
          out += c
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }
      }
      setLogoText(out)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setLogoText(WORDMARK)
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const scheduleScramble = () => {
    clearHoverTimer()
    hoverTimerRef.current = setTimeout(runScramble, START_DELAY)
  }

  const cancelAll = () => {
    clearHoverTimer()
    cancelScramble()
    setLogoText(WORDMARK)
  }

  useEffect(() => cancelAll, [])

  const commonProps = {
    className: `wordmark ${className}`.trim(),
    'aria-label': ariaLabel,
    'data-od-id': dataOdId,
    onMouseEnter: scheduleScramble,
    onMouseLeave: cancelAll,
    onFocus: scheduleScramble,
    onBlur: cancelAll,
  }

  if (as === 'a') {
    return (
      <a href={href} {...commonProps}>
        {logoText}
      </a>
    )
  }

  return (
    <div {...commonProps} tabIndex={0} role="img">
      {logoText}
    </div>
  )
}
