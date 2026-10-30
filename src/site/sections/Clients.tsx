import { useCallback, useEffect, useRef, useState } from 'react'
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

// `clients` is already alphabetical, so grouping keeps that order.
const groups = Object.entries(
  clients.reduce<Record<string, typeof clients>>((acc, c) => {
    const letter = c.name[0].toUpperCase()
    ;(acc[letter] ??= []).push(c)
    return acc
  }, {}),
)

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
        <header className={styles.header}>
          <h2 id="clients-title" className="t-h1">
            The businesses we act for
          </h2>
          <p className={`t-lead ${styles.intro}`}>
            Manufacturers, exporters, traders and healthcare businesses from Haryana, Rajasthan, Delhi, Maharashtra and
            Karnataka.
          </p>
        </header>
      </div>

      <div className="container">
        <div className={styles.directory}>
          <h3 id="client-list-title" className={styles.directoryTitle}>
            List of our clients
            <span>
              {clients.length} clients across India
            </span>
          </h3>
          <ul role="list" className={styles.groups}>
            {groups.map(([letter, list]) => (
              <li key={letter} className={styles.group}>
                <span className={styles.letter} aria-hidden="true">
                  {letter}
                </span>
                <ul role="list">
                  {list.map((c) => (
                    <li key={c.name} className={styles.client}>
                      <span className={styles.clientName}>{c.name}</span>
                      <span className={styles.place}>{c.place}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
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
