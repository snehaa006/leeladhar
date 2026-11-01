import { useEffect, useRef } from 'react'
import { motionAllowed } from './scroll'
import styles from './Particles.module.css'

type Dot = { x: number; y: number; r: number; vx: number; vy: number; c: string; a: number }

/**
 * A field of slow-drifting dots behind a section, after the particle
 * background on vetvista.in, in the house teal and brick. It only draws while
 * on screen and the tab is visible, and not at all with reduced motion.
 */
export function Particles({ tone = 'light', density = 1 }: { tone?: 'light' | 'dark'; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !motionAllowed()) return

    const colours =
      tone === 'dark' ? ['246, 241, 233', '240, 138, 108', '163, 203, 199'] : ['70, 138, 134', '194, 64, 31', '70, 138, 134']
    let dots: Dot[] = []
    let w = 0
    let h = 0
    let frame = 0
    let visible = false
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.round(((w * h) / 16000) * density))
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.08 - Math.random() * 0.22,
        c: colours[Math.floor(Math.random() * colours.length)],
        a: 0.18 + Math.random() * 0.4,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        // Drift upwards, and ease away from the pointer.
        const dx = d.x - pointer.x
        const dy = d.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist < 110 && dist > 0) {
          d.x += (dx / dist) * 0.9
          d.y += (dy / dist) * 0.9
        }
        d.x += d.vx
        d.y += d.vy
        if (d.y < -6) {
          d.y = h + 6
          d.x = Math.random() * w
        }
        if (d.x < -6) d.x = w + 6
        if (d.x > w + 6) d.x = -6
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.c}, ${d.a})`
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }

    const run = () => {
      cancelAnimationFrame(frame)
      if (visible && !document.hidden) frame = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      run()
    })
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const ro = new ResizeObserver(resize)

    resize()
    ro.observe(canvas)
    io.observe(canvas)
    document.addEventListener('visibilitychange', run)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', run)
      window.removeEventListener('pointermove', onMove)
    }
  }, [tone, density])

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />
}
