import { useEffect, useRef, useState } from 'react'

const WORDMARK = `███╗   ██╗██╗██╗  ██╗██╗
████╗  ██║██║██║ ██╔╝██║
██╔██╗ ██║██║█████╔╝ ██║
██║╚██╗██║██║██╔═██╗ ██║
██║ ╚████║██║██║  ██╗██╗
╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝`

export default function LogoWordmark({
  as = 'a',
  href = '#top',
  ariaLabel = 'Niki',
  className = '',
  dataOdId,
}) {
  const [logoText, setLogoText] = useState(WORDMARK)
  const [isStreaming, setIsStreaming] = useState(false)
  const rafRef = useRef(null)

  const stopStream = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }

  const startStream = () => {
    stopStream()
    setIsStreaming(true)
    const total = WORDMARK.length
    const start = performance.now()
    const duration = 400 // ms to stream the whole logo

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const resolved = Math.floor(progress * total)
      
      setLogoText(WORDMARK.slice(0, resolved))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setIsStreaming(false)
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const resetStream = () => {
    stopStream()
    setIsStreaming(false)
    setLogoText(WORDMARK)
  }

  useEffect(() => resetStream, [])

  const commonProps = {
    className: `wordmark ${className}`.trim(),
    'aria-label': ariaLabel,
    'data-od-id': dataOdId,
    onMouseEnter: startStream,
    onMouseLeave: resetStream,
    onFocus: startStream,
    onBlur: resetStream,
  }

  const cursor = isStreaming ? <span className="wordmark-cursor">█</span> : null

  const content = (
    <>
      {/* Invisible placeholder maintains the exact width and height of the full logo */}
      <span style={{ visibility: 'hidden', display: 'block', pointerEvents: 'none' }}>
        {WORDMARK}
      </span>
      {/* Absolute overlay for the streaming text */}
      <span style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'pre' }}>
        {logoText}{cursor}
      </span>
    </>
  )

  const textContent = (
    <>
      <span style={{ visibility: 'hidden', pointerEvents: 'none' }}>Niki</span>
      <span style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'nowrap' }}>
        {isStreaming ? 'Niki'.slice(0, Math.floor((logoText.length / WORDMARK.length) * 4)) : 'Niki'}{cursor}
      </span>
    </>
  )

  if (as === 'a') {
    return (
      <a href={href} {...commonProps}>
        <span className="wordmark-art" aria-hidden="true">{content}</span>
        <span className="wordmark-text">{textContent}</span>
      </a>
    )
  }

  return (
    <div {...commonProps} tabIndex={0} role="img">
      <span className="wordmark-art" aria-hidden="true">{content}</span>
      <span className="wordmark-text">{textContent}</span>
    </div>
  )
}
