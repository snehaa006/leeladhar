import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Chip } from '../../design-system'
import { practiceAreas } from '../content/practiceAreas'
import { PracticeArt } from './PracticeArt'
import styles from './PracticeExplorer.module.css'

/**
 * The practice-areas widget from duaassociates.com: a scrolling list on a
 * solid panel overlapping a large visual; choosing an area swaps the visual and
 * the summary card, which links through to the area's own page.
 */
export function PracticeExplorer({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const base = useId()
  const area = practiceAreas[active]
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = practiceAreas.length - 1
    const next =
      e.key === 'ArrowDown' ? Math.min(active + 1, last)
      : e.key === 'ArrowUp' ? Math.max(active - 1, 0)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className={styles.stage}>
      <PracticeArt key={area.slug} icon={area.icon} index={active} className={styles.visual} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.listPanel}>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Practice areas"
            className={styles.list}
            onKeyDown={onKeyDown}
          >
            {practiceAreas.map((p, i) => (
              <button
                key={p.slug}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${base}-panel`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <div
          key={area.slug}
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${active}`}
          className={styles.card}
        >
          <PracticeArt icon={area.icon} index={active} className={styles.cardArt} />
          <p className={styles.kicker}>
            {String(active + 1).padStart(2, '0')} / {String(practiceAreas.length).padStart(2, '0')}
          </p>
          <Heading className={styles.title}>{area.title}</Heading>
          <p className={styles.summary}>{area.summary}</p>
          <div className={styles.forums}>
            {area.forums.map((f) => (
              <Chip key={f} tone="dark">
                {f}
              </Chip>
            ))}
          </div>
          <Link to={`/practice-areas/${area.slug}`} className={styles.more}>
            <span className={styles.moreIcon} aria-hidden="true">
              <ArrowRight />
            </span>
            Read more<span className="visually-hidden"> about {area.title}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
