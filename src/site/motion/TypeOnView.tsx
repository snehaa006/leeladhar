import { useEffect, useRef, useState } from 'react'
import { motionAllowed } from './scroll'
import styles from './Type.module.css'

/**
 * Types its text out, letter by letter behind a blinking caret, each time it
 * scrolls into view. Every letter is laid out from the start (only hidden), so
 * the line never reflows while it types. Screen readers get the text as is.
 */
export function TypeOnView({ text, speed = 55, delay = 250 }: { text: string; speed?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  // Start empty when motion is on, so the text never flashes in full first.
  const [count, setCount] = useState(() => (motionAllowed() ? 0 : text.length))
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !motionAllowed() || !('IntersectionObserver' in window)) return
    let timer = 0
    let start = 0

    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer)
        window.clearTimeout(start)
        if (!entry.isIntersecting) {
          setCount(0)
          setTyping(false)
          return
        }
        setTyping(true)
        start = window.setTimeout(() => {
          timer = window.setInterval(() => {
            setCount((c) => {
              if (c >= text.length) {
                window.clearInterval(timer)
                return c
              }
              return c + 1
            })
          }, speed)
        }, delay)
      },
      { rootMargin: '-8% 0px -8% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearInterval(timer)
      window.clearTimeout(start)
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
