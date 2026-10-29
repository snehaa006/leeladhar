import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { practiceBySlug } from '../content/practiceAreas'
import { categoryLabel, formatDate, type Insight } from '../content/insights'
import { PracticeArt } from './PracticeArt'
import styles from './InsightCard.module.css'

export function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const area = practiceBySlug(insight.practice)
  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        {area && <PracticeArt icon={area.icon} index={index} className={styles.art} />}
        <span className={styles.category}>{categoryLabel(insight.category)}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/insights/${insight.slug}`}>{insight.title}</Link>
        </h3>
        <p className={styles.excerpt}>{insight.excerpt}</p>
        <div className={styles.meta}>
          <span>
            <Clock aria-hidden="true" />
            <time dateTime={insight.date}>{formatDate(insight.date)}</time>
          </span>
          <span className={styles.read} aria-hidden="true">
            Read full article <ArrowRight />
          </span>
        </div>
      </div>
    </article>
  )
}
