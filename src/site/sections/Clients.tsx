import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Check, Quote } from 'lucide-react'
import { clients, clientStories, type ClientStory } from '../data'
import styles from './Clients.module.css'

function Story({ story }: { story: ClientStory }) {
  return (
    <figure className={styles.story}>
      <span className={styles.badge} aria-hidden="true">
        <span />
        <span>
          <Quote />
        </span>
      </span>
      <blockquote className={styles.quote}>
        <p>{story.quote}</p>
      </blockquote>
      <figcaption className={styles.who}>
        <span className={styles.whoName}>{story.client ?? story.who}</span>
        <span className={styles.whoMeta}>
          {story.client && `${story.who} · `}
          {story.matter} | {story.where}
        </span>
      </figcaption>
      <p className={styles.outcome}>
        <Check aria-hidden="true" />
        {story.outcome}
      </p>
    </figure>
  )
}

// Typographic wordmarks stand in for logos. Five styles over a four-column grid,
// so neighbours never share a look.
const marks = ['wide', 'serif', 'condensed', 'serif-caps', 'light'] as const

/** Holds the client grid hidden until it scrolls into view, then lets the cells rise in turn. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState<'idle' | 'waiting' | 'in'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    setState('waiting')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, state] as const
}

export function Clients() {
  const [grid, reveal] = useReveal<HTMLUListElement>()
  const track = useRef<HTMLUListElement>(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)))
    setPage(Math.round(el.scrollLeft / el.clientWidth))
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const go = (to: number) => {
    const el = track.current
    if (!el) return
    const next = Math.min(Math.max(to, 0), pages - 1)
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section id="clients" className={styles.section} aria-labelledby="clients-title">
      <div className="container">
        <header className={styles.header}>
          <h2 id="clients-title" className={styles.eyebrow}>
            Our clients
          </h2>
          <p className={styles.intro}>
            We act for manufacturers, exporters, traders, pharmaceutical and healthcare businesses, and MSMEs in
            Haryana, Rajasthan, Delhi, Maharashtra, Karnataka and more.
          </p>
        </header>

        <ul ref={grid} role="list" className={styles.grid} data-reveal={reveal}>
          {clients.map((c, i) => (
            <li key={c.name} className={styles.cell} style={{ '--i': i } as CSSProperties}>
              <span className={styles.mark} data-mark={marks[i % marks.length]}>
                {c.name}
              </span>
              <span className={styles.place}>{c.place}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.band}>
        <div className="container">
          <h3 className={styles.bandTitle}>What our clients say about working with us</h3>

          <ul
            ref={track}
            role="list"
            className={styles.track}
            onScroll={measure}
            aria-label="Client testimonials"
            tabIndex={0}
          >
            {clientStories.map((s) => (
              <li key={s.id}>
                <Story story={s} />
              </li>
            ))}
          </ul>

          {pages > 1 && (
            <div className={styles.controls}>
              <button type="button" className={styles.arrow} onClick={() => go(page - 1)} disabled={page === 0}>
                <ArrowLeft aria-hidden="true" />
                <span className="visually-hidden">Previous testimonials</span>
              </button>
              <div className={styles.dots}>
                {Array.from({ length: pages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={styles.dot}
                    aria-current={i === page || undefined}
                    aria-label={`Show testimonials, page ${i + 1} of ${pages}`}
                    onClick={() => go(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => go(page + 1)}
                disabled={page === pages - 1}
              >
                <ArrowRight aria-hidden="true" />
                <span className="visually-hidden">Next testimonials</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
