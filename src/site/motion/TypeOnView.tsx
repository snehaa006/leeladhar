import { useEffect, useRef, useState } from 'react'
import { motionAllowed } from './scroll'
import styles from './Type.module.css'

/**
 * Types its text out, letter by letter behind a blinking caret, the first time
 * it scrolls into view, then stays complete, so the words are never seen cut
 * off. Progress is worked out from the clock, not counted per tick, so a
 * throttled or backgrounded tab still finishes the word. Every letter is laid
 * out from the start (only hidden), so the line never reflows while it types.
 * Screen readers get the text as is.
 */
export function TypeOnView({ text, speed = 55, delay = 250 }: { text: string; speed?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  // Start empty when motion is on, so the text never flashes in full first.
  const [count, setCount] = useState(() => (motionAllowed() ? 0 : text.length))
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !motionAllowed() || !('IntersectionObserver' in window)) {
      setCount(text.length)
      return
    }
    let timer = 0

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setTyping(true)
        const t0 = performance.now() + delay
        timer = window.setInterval(() => {
          const n = Math.max(0, Math.floor((performance.now() - t0) / speed) + 1)
          if (n >= text.length) {
            window.clearInterval(timer)
            setCount(text.length)
            // Let the caret blink a moment at the end, then rest.
            window.setTimeout(() => setTyping(false), 1600)
            return
          }
          setCount(n)
        }, Math.min(speed, 40))
      },
      { rootMargin: '-8% 0px -8% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [text, speed, delay])

  const chars = Array.from(text)
  return (
    <span ref={ref} className={styles.type}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {chars.map((ch, i) => (
          <span key={i} className={styles.char} data-on={i < count || undefined}>
            {i === count && typing && <span className={styles.caret} />}
            {ch}
          </span>
        ))}
        {count >= chars.length && typing && <span className={styles.caret} data-rest />}
      </span>
    </span>
  )
}
