import { useEffect, useState } from 'react'
import { motionAllowed } from './scroll'
import styles from './Type.module.css'

/**
 * Types each phrase, holds it, deletes it and moves to the next, after the
 * rotating headline on vetvista.in. With reduced motion it shows the first
 * phrase. The full list is given to screen readers once, not letter by letter.
 */
export function Typewriter({ phrases, hold = 1800 }: { phrases: string[]; hold?: number }) {
  const [index, setIndex] = useState(0)
  const [live] = useState(motionAllowed)
  const [count, setCount] = useState(() => (live ? 0 : phrases[0].length))
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!live) return
    const phrase = phrases[index]
    let wait = deleting ? 32 : 70
    if (!deleting && count === phrase.length) wait = hold
    if (deleting && count === 0) wait = 280
    const t = window.setTimeout(() => {
      if (!deleting && count === phrase.length) setDeleting(true)
      else if (deleting && count === 0) {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
      } else setCount((c) => c + (deleting ? -1 : 1))
    }, wait)
    return () => window.clearTimeout(t)
  }, [live, phrases, index, count, deleting, hold])

  return (
    <span className={styles.type}>
      <span className="visually-hidden">{phrases.join(', ')}</span>
      <span aria-hidden="true" className={styles.rotating}>
        {phrases[index].slice(0, count)}
        {live && <span className={styles.caret} data-rest />}
      </span>
    </span>
  )
}
