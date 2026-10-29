import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { InsightCard } from '../components/InsightCard'
import { SectionHead } from '../components/SectionHead'
import { insights } from '../content/insights'
import styles from './LatestInsights.module.css'

/** Latest three articles and a "view all" tile, after the Articles grid on duaassociates.com. */
export function LatestInsights() {
  const latest = [...insights].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  return (
    <section className={styles.section} aria-labelledby="insights-title">
      <div className="container">
        <SectionHead id="insights-title" title="Insights" lead="Plain-language notes on the law our clients ask about most." />
        <ul role="list" className={styles.grid}>
          {latest.map((i, n) => (
            <li key={i.slug}>
              <InsightCard insight={i} index={n} />
            </li>
          ))}
          <li>
            <Link to="/insights" className={styles.all}>
              <span>View all insights</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
