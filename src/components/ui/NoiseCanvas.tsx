'use client'

import { useEffect, useRef } from 'react'

// Small canvas scaled to viewport — gives chunky CRT-pixel grain
const GRAIN = 2   // each logical pixel = 2×2 screen pixels
const FPS_MS = 80 // ~12 fps

export function NoiseCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let animId: number
    let last = 0
    let cw = 0
    let ch = 0

    function resize() {
      cw = Math.ceil(window.innerWidth  / GRAIN)
      ch = Math.ceil(window.innerHeight / GRAIN)
      canvas!.width  = cw
      canvas!.height = ch
    }

    function draw(time: number) {
      animId = requestAnimationFrame(draw)
      if (time - last < FPS_MS) return
      last = time

      const img = ctx.createImageData(cw, ch)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() > 0.5 ? 255 : 0
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
        opacity: 0.048,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 99,
      }}
    />
  )
}
