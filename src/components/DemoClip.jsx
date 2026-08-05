import { useEffect, useRef, useState } from 'react'

export function media(key) {
  return {
    mp4: `/agent-demos/${key}.mp4`,
    webm: `/agent-demos/${key}.webm`,
    gif: `/agent-demos/${key}.gif`,
    poster: `/agent-demos/${key}.png`,
  }
}

// A looping demo clip for an agent / feature card. Plays only while in view,
// when motion is allowed, and when not globally paused (WCAG 2.2.2). Falls back
// to the poster image when the user prefers reduced motion.
export function DemoClip({ clipKey, motionOk, paused, label, className = '' }) {
  const m = media(clipKey)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v || v.tagName !== 'VIDEO') return
    if (motionOk && !paused && inView) v.play().catch(() => {})
    else v.pause()
  }, [motionOk, paused, inView])

  if (!motionOk) {
    return (
      <img ref={ref} src={m.poster} alt={`${label} preview`}
        className={`hiw-clip-media ${className}`.trim()} loading="lazy" />
    )
  }
  return (
    <video ref={ref} className={`hiw-clip-media ${className}`.trim()} poster={m.poster}
      muted loop playsInline preload="none" aria-label={label}>
      <source src={m.webm} type="video/webm" />
      <source src={m.mp4} type="video/mp4" />
    </video>
  )
}
