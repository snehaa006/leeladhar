import { ArrowUpRight, Clock } from 'lucide-react'
import { practiceBySlug } from '../content/practiceAreas'
import { categoryLabel, formatWhen, practiceFor, sectionArtFor, type Insight } from '../content/insights'
import { PracticeArt } from './PracticeArt'
import styles from './InsightCard.module.css'

/** A LiveLaw headline. The whole card links to the report on livelaw.in, in a new tab. */
export function InsightCard({
  insight,
  index,
  art: artBy = 'practice',
}: {
  insight: Insight
  index: number
  /** `practice` shows the matching practice area's photo where there is one; `section` always the court's. */
  art?: 'practice' | 'section'
}) {
  const area = artBy === 'practice' ? practiceBySlug(practiceFor(insight)) : undefined
  const art = area?.photo ? { icon: area.icon, photo: area.photo } : sectionArtFor(insight, index)
  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <PracticeArt icon={art.icon} index={index} photo={art.photo} className={styles.art} />
        <span className={styles.category}>{categoryLabel(insight.section)}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.head}>
          {/* Kept when empty, so titles line up across a row. */}
          <p className={styles.tags}>{insight.tags.slice(0, 3).join(' · ')}</p>
          <h3 className={styles.title}>
            <a href={insight.url} target="_blank" rel="noopener noreferrer">
              {insight.title}
              <span className="visually-hidden"> (LiveLaw, opens in a new tab)</span>
            </a>
          </h3>
          {insight.author && <p className={styles.byline}>By {insight.author}</p>}
        </div>
        <div className={styles.meta}>
          <span>
            <Clock aria-hidden="true" />
            <time dateTime={insight.date}>{formatWhen(insight.date)}</time>
          </span>
          <span className={styles.read} aria-hidden="true">
            Read on LiveLaw <ArrowUpRight />
          </span>
        </div>
      </div>
    </article>
  )
}

/** Placeholder card while the headlines load. */
export function InsightCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`} aria-hidden="true">
      <div className={styles.thumb} />
      <div className={styles.body}>
        <span className={styles.bar} style={{ width: '40%' }} />
        <span className={styles.bar} style={{ width: '95%', height: 18 }} />
        <span className={styles.bar} style={{ width: '70%', height: 18 }} />
        <div className={styles.meta}>
          <span className={styles.bar} style={{ width: '45%' }} />
        </div>
      </div>
    </div>
  )
}
