import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CtaBanner } from '../components/CtaBanner'
import { InsightCard } from '../components/InsightCard'
import { PageBanner } from '../components/PageBanner'
import { insightCategories, insights, type Insight, type InsightCategory } from '../content/insights'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './InsightsPage.module.css'

const searchText = (i: Insight) =>
  [i.title, i.excerpt, ...i.sections.flatMap((s) => [s.heading ?? '', ...s.paragraphs])].join(' ').toLowerCase()

/** /insights?category=…&q=… — search and categories in a sidebar, after legacylawoffices.com/insights. */
export function InsightsPage() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') as InsightCategory | null
  const q = params.get('q') ?? ''
  const current = insightCategories.find((c) => c.id === category)
  usePageTitle(current ? `${current.label} | Insights` : 'Insights')

  const needle = q.trim().toLowerCase()
  const visible = [...insights]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((i) => !current || i.category === current.id)
    .filter((i) => !needle || searchText(i).includes(needle))

  function setQuery(value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set('q', value)
    else next.delete('q')
    setParams(next, { replace: true })
  }

  return (
    <>
      <PageBanner
        title="Legal insights"
        lead="Plain-language notes on the law our clients ask about most: what changed, what it means, and what to do next."
        crumbs={current ? [{ to: '/insights', label: 'Insights' }, { label: current.label }] : [{ label: 'Insights' }]}
      />

      <section className={page.section} aria-labelledby="resources">
        <div className={`container ${page.layout}`}>
          <aside className={page.side}>
            <label className={styles.search}>
              <span className="visually-hidden">Search insights</span>
              <input type="search" placeholder="Search articles…" value={q} onChange={(e) => setQuery(e.target.value)} />
              <Search aria-hidden="true" />
            </label>
            <h2 className={`${page.sideTitle} ${styles.catTitle}`}>Categories</h2>
            <ul role="list" className={page.sideList}>
              <li>
                <Link to="/insights" aria-current={!current ? 'page' : undefined}>
                  All insights <span className={styles.count}>{insights.length}</span>
                </Link>
              </li>
              {insightCategories.map((c) => (
                <li key={c.id}>
                  <Link to={`/insights?category=${c.id}`} aria-current={current?.id === c.id ? 'page' : undefined}>
                    {c.label}{' '}
                    <span className={styles.count}>{insights.filter((i) => i.category === c.id).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <h2 id="resources" className={page.h2}>
              {current ? current.label : 'All resources'}
            </h2>
            <div aria-live="polite">
              {visible.length === 0 ? (
                <p className={`${page.empty} ${styles.list}`}>Nothing matches “{q}”. Try another word.</p>
              ) : (
                <ul role="list" className={`${page.grid2} ${styles.list}`}>
                  {visible.map((i, n) => (
                    <li key={i.slug}>
                      <InsightCard insight={i} index={n} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
