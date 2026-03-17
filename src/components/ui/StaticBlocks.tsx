'use client'

import { useEffect, useRef } from 'react'

// Canvas drawn at low res, scaled up for chunky CRT-pixel look
const CW = 72
const CH = 54
const SCALE = 3

const BLOCKS: Array<{ style: React.CSSProperties; interval: number }> = [
  {
    style: { bottom: '8%', left: '-1%', opacity: 0.055 },
    interval: 90,
  },
  {
    style: { top: '18%', right: '-1%', opacity: 0.045 },
    interval: 110,
  },
  {
    style: { top: '58%', left: '0.5%', opacity: 0.038 },
    interval: 130,
  },
]

function StaticCanvas({ interval }: { interval: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let last = 0

    function draw(time: number) {
      animId = requestAnimationFrame(draw)
      if (time - last < interval) return
      last = time

      const img = ctx!.createImageData(CW, CH)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() < 0.5 ? 255 : 0
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = 255
      }
      ctx!.putImageData(img, 0, 0)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [interval])

  return (
    <canvas
      ref={ref}
      width={CW}
      height={CH}
      style={{
        width: CW * SCALE,
        height: CH * SCALE,
        imageRendering: 'pixelated',
        display: 'block',
      }}
    />
  )
}

export function StaticBlocks() {
  return (
    <>
      {BLOCKS.map((b, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'fixed',
            ...b.style,
            pointerEvents: 'none',
            zIndex: 1,
            border: '1px solid rgba(0,229,255,0.10)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <StaticCanvas interval={b.interval} />
        </div>
      ))}
    </>
  )
}
