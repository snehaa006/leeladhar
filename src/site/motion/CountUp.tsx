import { useEffect, useRef, useState } from 'react'

/**
 * A number that counts up to its value each time it scrolls into view.
 * Screen readers get the final value only; reduced motion shows it at once.
 */
export function CountUp({ to, from = 0, duration = 1400 }: { to: number; from?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(from + (to - from) * eased))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) run()
      else {
        cancelAnimationFrame(frame)
        setValue(from)
      }
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [from, to, duration])

  return (
    <span ref={ref}>
      <span aria-hidden="true">{value}</span>
      <span className="visually-hidden">{to}</span>
    </span>
  )
}
