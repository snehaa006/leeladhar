import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Check, Quote } from 'lucide-react'
import { clients, clientStories, type ClientStory } from '../data'
import { ScrollText } from '../motion/ScrollText'
import { TypeOnView } from '../motion/TypeOnView'
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

// Typographic wordmarks stand in for logos. Five styles, so neighbours never share a look.
const marks = ['wide', 'serif', 'condensed', 'serif-caps', 'light'] as const

const ROWS = 3

/**
 * The wall runs edge to edge in three long rows (27 → 9, 9, 9). Rows take
 * turns running left to right and right to left, each at a slightly different
 * pace, so the wall drifts rather than sliding as one block. Each row is
 * rendered twice so the loop joins up; the copy is hidden from assistive tech.
 */
const rows = (() => {
  const base = Math.floor(clients.length / ROWS)
  const extra = clients.length % ROWS
  let start = 0
  return Array.from({ length: ROWS }, (_, r) => {
    const size = base + (r < extra ? 1 : 0)
    const items = clients.slice(start, start + size).map((c, j) => ({ ...c, i: start + j }))
    start += size
    return items
  })
})()

/** Seconds per name: a touch slower or faster on each row. */
const pace = [6.4, 7.6, 7]

function ClientCell({ name, place, i, copy }: { name: string; place: string; i: number; copy?: boolean }) {
  return (
    <li className={styles.cell} aria-hidden={copy || undefined} data-copy={copy || undefined}>
      <span className={styles.mark} data-mark={marks[i % marks.length]}>
        {name}
      </span>
      <span className={styles.place}>{place}</span>
    </li>
  )
}

export function Clients() {
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
        <header className={styles.header} data-reveal>
          <h2 id="clients-title" className={styles.eyebrow}>
            Our clients
          </h2>
          <ScrollText
            className={styles.intro}
            text="We act for **manufacturers, exporters, traders**, pharmaceutical and healthcare businesses, and ==MSMEs== in Haryana, Rajasthan, Delhi, Maharashtra, Karnataka and more."
          />
        </header>
      </div>

      <div className={styles.wall}>
        {rows.map((row, r) => (
          <div
            key={r}
            className={styles.row}
            data-reveal
            data-dir={r % 2 ? 'rtl' : 'ltr'}
            style={
              {
                '--n': row.length,
                '--pace': `${pace[r % pace.length]}s`,
                '--offset': `${-r * 2.3}s`,
                '--reveal-delay': `${r * 90}ms`,
              } as CSSProperties
            }
          >
            <ul role="list" className={styles.loop}>
              {row.map((c) => (
                <ClientCell key={c.name} {...c} />
              ))}
              {row.map((c) => (
                <ClientCell key={`copy-${c.name}`} {...c} copy />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.band}>
        <div className="container">
          <h3 className={styles.bandTitle} data-reveal>
            What our clients{' '}
            <em>
              <TypeOnView text="say" />
            </em>{' '}
            about working with us
          </h3>

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
