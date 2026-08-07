"use client"

import { useEffect, useRef } from "react"

interface PixelGridProps {
  bgColor?: string
  pixelColor?: string
  numPixelsX?: number
  numPixelsY?: number
  pixelSize?: number
  pixelSpacing?: number
  pixelDeathFade?: number
  pixelBornFade?: number
  pixelMaxLife?: number
  pixelMinLife?: number
  pixelMaxOffLife?: number
  pixelMinOffLife?: number
  className?: string
  glow?: boolean
}

interface Pixel {
  xPos: number
  yPos: number
  alpha: number
  maxAlpha: number
  life: number
  offLife: number
  isLit: boolean
  dying: boolean
  deathFade: number
  bornFade: number
  randomizeSelf: () => void
}

export function PixelGrid({
  bgColor = "transparent",
  pixelColor = "#0000ff",
  pixelSize = 3,
  pixelSpacing = 3,
  pixelDeathFade = 10,
  pixelBornFade = 50,
  pixelMaxLife = 500,
  pixelMinLife = 250,
  pixelMaxOffLife = 500,
  pixelMinOffLife = 200,
  glow = false,
  className = "",
}: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement

    const c2d = canvas.getContext("2d", { alpha: true })
    if (!c2d) return

    // Perpetual full-canvas repaints are the main scroll-jank source. We:
    //  - size the canvas to its PARENT (not the window) so the parent's
    //    overflow:hidden actually clips it to the hero/brand box;
    //  - cap the draw rate to ~20fps (pixels fade slowly — 60 is wasted);
    //  - pause the rAF loop entirely when offscreen or tab-hidden.
    const FRAME_MS =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 850px)").matches
        ? 1000 / 12
        : 1000 / 20
    let rafId: number | null = null
    let running = false
    let inView = false
    let lastDraw = 0

    const randomAlpha = () => {
      const rand = Math.random() * 100
      if (rand > 90) return 1
      if (rand > 80) return 0.5
      return 0.1
    }

    const randomizePixelAttrs = (x: number, y: number): Pixel => {
      const alpha = randomAlpha()
      const lit = alpha !== 0.1
      return {
        xPos: x * (pixelSize + pixelSpacing),
        yPos: y * (pixelSize + pixelSpacing),
        alpha: 0,
        maxAlpha: alpha,
        life: Math.floor(Math.random() * (pixelMaxLife - pixelMinLife + 1)) + pixelMinLife,
        offLife: Math.floor(Math.random() * (pixelMaxOffLife - pixelMinOffLife + 1)) + pixelMinOffLife,
        isLit: lit,
        dying: false,
        deathFade: pixelDeathFade,
        bornFade: pixelBornFade,
        randomizeSelf() {
          const newAlpha = randomAlpha()
          this.alpha = 0
          this.maxAlpha = newAlpha
          this.life = Math.floor(Math.random() * (pixelMaxLife - pixelMinLife + 1)) + pixelMinLife
          this.offLife = Math.floor(Math.random() * (pixelMaxOffLife - pixelMinOffLife + 1)) + pixelMinOffLife
          this.isLit = newAlpha !== 0.1
          this.dying = false
          this.deathFade = pixelDeathFade
          this.bornFade = pixelBornFade
        },
      }
    }

    const parentSize = () => ({
      w: parent ? parent.clientWidth : window.innerWidth,
      h: parent ? parent.clientHeight : window.innerHeight,
    })

    const initPixels = () => {
      const { w, h } = parentSize()
      const cols = Math.ceil(w / (pixelSize + pixelSpacing))
      const rows = Math.ceil(h / (pixelSize + pixelSpacing))
      pixelsRef.current = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          pixelsRef.current.push(randomizePixelAttrs(x, y))
        }
      }
    }

    const resizeCanvas = () => {
      const { w, h } = parentSize()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0)
      initPixels()
    }

    const drawPixel = (pixel: Pixel) => {
      pixel.alpha = Math.min(Math.max(pixel.alpha, 0.1), pixel.maxAlpha)
      c2d.fillStyle = `${pixelColor}${Math.floor(pixel.alpha * 255)
        .toString(16)
        .padStart(2, "0")}`

      c2d.fillRect(pixel.xPos, pixel.yPos, pixelSize, pixelSize)

      if (pixel.isLit) {
        if (pixel.bornFade <= 0) {
          if (pixel.life <= 0) {
            pixel.dying = true
            if (pixel.deathFade <= 0) pixel.randomizeSelf()
            else {
              pixel.alpha = (pixel.deathFade / pixelDeathFade) * pixel.maxAlpha
              pixel.deathFade--
            }
          } else pixel.life--
        } else {
          pixel.alpha = pixel.maxAlpha - pixel.bornFade / pixelBornFade
          pixel.bornFade--
        }
      } else {
        if (pixel.offLife <= 0) pixel.isLit = true
        pixel.offLife--
      }
    }

    const renderLoop = (now: number) => {
      if (!running) return
      rafId = requestAnimationFrame(renderLoop)
      if (now - lastDraw < FRAME_MS) return
      lastDraw = now

      if (bgColor === "transparent") c2d.clearRect(0, 0, canvas.width, canvas.height)
      else {
        c2d.fillStyle = bgColor
        c2d.fillRect(0, 0, canvas.width, canvas.height)
      }

      if (glow) {
        c2d.shadowBlur = 8
        c2d.shadowColor = pixelColor
      } else {
        c2d.shadowBlur = 0
      }

      for (const pixel of pixelsRef.current) drawPixel(pixel)
    }

    const start = () => {
      if (running) return
      running = true
      lastDraw = 0
      rafId = requestAnimationFrame(renderLoop)
    }
    const stop = () => {
      running = false
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = null
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          inView = e.isIntersecting
          if (inView && !document.hidden) start()
          else stop()
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (inView) start()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      stop()
      window.removeEventListener("resize", resizeCanvas)
      document.removeEventListener("visibilitychange", onVisibility)
      io.disconnect()
    }
  }, [
    bgColor,
    pixelColor,
    pixelSize,
    pixelSpacing,
    pixelDeathFade,
    pixelBornFade,
    pixelMaxLife,
    pixelMinLife,
    pixelMaxOffLife,
    pixelMinOffLife,
    glow,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{
        display: "block",
        backgroundColor: "transparent",
      }}
    />
  )
}
