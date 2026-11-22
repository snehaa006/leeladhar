import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { InsightCard, InsightCardSkeleton } from '../components/InsightCard'
import { SectionHead } from '../components/SectionHead'
import { LIVELAW_URL } from '../content/insights'
import { TypeOnView } from '../motion/TypeOnView'
import { useLiveLaw } from '../useLiveLaw'
import styles from './LatestInsights.module.css'

/** The three latest LiveLaw headlines and a "view all" tile, after the Articles grid on duaassociates.com. */
export function LatestInsights() {
  const feed = useLiveLaw()
  return (
    <section className={styles.section} aria-labelledby="insights-title">
      <div className="container">
        <SectionHead
          id="insights-title"
          title={
            <>
              Latest{' '}
              <em>
                <TypeOnView text="legal updates" />
              </em>
            </>
          }
          lead="Judgments and legal news from **the Supreme Court and the High Courts**, as reported by LiveLaw."
        />
        <ul role="list" className={styles.grid} data-reveal="stagger" aria-busy={feed.status === 'loading'}>
          {feed.status === 'loading' &&
            [0, 1, 2].map((n) => (
              <li key={n}>
                <InsightCardSkeleton />
              </li>
            ))}
          {feed.status === 'ready' &&
            feed.items.slice(0, 3).map((i, n) => (
              <li key={i.url}>
                <InsightCard insight={i} index={n} />
              </li>
            ))}
          {feed.status === 'error' && (
            <li className={styles.unavailable}>
              <p>The latest headlines could not be loaded just now.</p>
              <a href={LIVELAW_URL} target="_blank" rel="noopener noreferrer">
                Read today’s legal news on LiveLaw <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          )}
          <li>
            <Link to="/insights" className={styles.all}>
              <span>View all updates</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </li>
        </ul>
        <p className={styles.source}>
          Headlines and links from{' '}
          <a href={LIVELAW_URL} target="_blank" rel="noopener noreferrer">
            LiveLaw.in
          </a>
          , refreshed through the day. Each opens the full report on LiveLaw; we are not affiliated with it.
        </p>
      </div>
    </section>
  )
}
