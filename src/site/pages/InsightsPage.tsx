import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Search } from 'lucide-react'
import { CtaBanner } from '../components/CtaBanner'
import { InsightCard, InsightCardSkeleton } from '../components/InsightCard'
import { PageBanner } from '../components/PageBanner'
import { photos } from '../content/photos'
import { formatWhen, insightCategories, LIVELAW_URL, type Insight, type InsightCategory } from '../content/insights'
import { usePageTitle } from '../usePageTitle'
import { useLiveLaw } from '../useLiveLaw'
import page from './Page.module.css'
import styles from './InsightsPage.module.css'

const PAGE_SIZE = 12

const searchText = (i: Insight) => [i.title, i.author ?? '', ...i.tags].join(' ').toLowerCase()

/**
 * /insights?category=…&q=… — the latest LiveLaw headlines, with search and categories in a sidebar,
 * after legacylawoffices.com/insights.
 */
export function InsightsPage() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') as InsightCategory | null
  const q = params.get('q') ?? ''
  const current = insightCategories.find((c) => c.id === category)
  usePageTitle(current ? `${current.label} | Insights` : 'Insights')

  const feed = useLiveLaw()
  const items = feed.status === 'ready' ? feed.items : []
  const needle = q.trim().toLowerCase()
  const visible = items
    .filter((i) => !current || i.section === current.id)
    .filter((i) => !needle || searchText(i).includes(needle))

  // How many cards are shown; starts over when the category or search changes.
  const filterKey = `${current?.id ?? ''}|${needle}`
  const [shown, setShown] = useState({ key: filterKey, count: PAGE_SIZE })
  const count = shown.key === filterKey ? shown.count : PAGE_SIZE

  function setQuery(value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set('q', value)
    else next.delete('q')
    setParams(next, { replace: true })
  }

  const countOf = (id?: InsightCategory) =>
    feed.status === 'ready' && <span className={styles.count}>{id ? items.filter((i) => i.section === id).length : items.length}</span>

  return (
    <>
      <PageBanner
        title="Legal updates"
        lead="The latest judgments and legal news from the Supreme Court and the High Courts, as reported by LiveLaw. Each headline opens the full report on LiveLaw."
        crumbs={current ? [{ to: '/insights', label: 'Insights' }, { label: current.label }] : [{ label: 'Insights' }]}
        photo={photos.constitution}
      />

      <section className={page.section} aria-labelledby="resources">
        <div className={`container ${page.layout}`}>
          <aside className={page.side}>
            <label className={styles.search}>
              <span className="visually-hidden">Search legal updates</span>
              <input type="search" placeholder="Search headlines…" value={q} onChange={(e) => setQuery(e.target.value)} />
              <Search aria-hidden="true" />
            </label>
            <h2 className={`${page.sideTitle} ${styles.catTitle}`}>Categories</h2>
            <ul data-reveal="stagger" role="list" className={page.sideList}>
              <li>
                <Link to="/insights" aria-current={!current ? 'page' : undefined}>
                  All updates {countOf()}
                </Link>
              </li>
              {insightCategories.map((c) => (
                <li key={c.id}>
                  <Link to={`/insights?category=${c.id}`} aria-current={current?.id === c.id ? 'page' : undefined}>
                    {c.label} {countOf(c.id)}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={styles.source}>
              From{' '}
              <a href={LIVELAW_URL} target="_blank" rel="noopener noreferrer">
                LiveLaw.in <ArrowUpRight aria-hidden="true" />
              </a>
              {feed.status === 'ready' && <> · updated {formatWhen(feed.fetchedAt)}</>}. We are not affiliated with
              LiveLaw; the reports are its own.
            </p>
          </aside>

          <div>
            <h2 id="resources" className={page.h2}>
              {current ? current.label : 'All updates'}
            </h2>
            <div aria-live="polite" aria-busy={feed.status === 'loading'}>
              {feed.status === 'loading' && (
                <ul role="list" className={`${page.grid2} ${styles.list}`}>
                  {[0, 1, 2, 3].map((n) => (
                    <li key={n}>
                      <InsightCardSkeleton />
                    </li>
                  ))}
                </ul>
              )}
              {feed.status === 'error' && (
                <p className={`${page.empty} ${styles.list} ${styles.notice}`}>
                  The latest headlines could not be loaded just now.{' '}
                  <a href={LIVELAW_URL} target="_blank" rel="noopener noreferrer">
                    Read them on LiveLaw
                  </a>
                  .
                </p>
              )}
              {feed.status === 'ready' &&
                (visible.length === 0 ? (
                  <p className={`${page.empty} ${styles.list}`}>
                    {needle ? `Nothing matches “${q}”. Try another word.` : 'No updates in this category right now.'}
                  </p>
                ) : (
                  <>
                    <ul data-reveal="stagger" role="list" className={`${page.grid2} ${styles.list}`}>
                      {visible.slice(0, count).map((i, n) => (
                        <li key={i.url}>
                          <InsightCard insight={i} index={n} />
                        </li>
                      ))}
                    </ul>
                    {visible.length > count && (
                      <button
                        type="button"
                        className={styles.more}
                        onClick={() => setShown({ key: filterKey, count: count + PAGE_SIZE })}
                      >
                        Show more ({visible.length - count} more)
                      </button>
                    )}
                  </>
                ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
