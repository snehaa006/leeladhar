import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Accordion, Chip } from '../../design-system'
import { CtaBanner } from '../components/CtaBanner'
import { Breadcrumbs } from '../components/PageBanner'
import { PracticeArt } from '../components/PracticeArt'
import { practiceAreas, practiceBySlug } from '../content/practiceAreas'
import { insights } from '../content/insights'
import { InsightCard } from '../components/InsightCard'
import { usePageTitle } from '../usePageTitle'
import { NotFoundPage } from './NotFoundPage'
import page from './Page.module.css'
import styles from './PracticeAreaPage.module.css'

/**
 * /practice-areas/:slug — Dua's detail page (wide visual, breadcrumb, ruled
 * title, Back) with Legacy's sidebar, key offerings, approach and FAQs.
 */
export function PracticeAreaPage() {
  const { slug } = useParams()
  const area = practiceBySlug(slug)
  usePageTitle(area?.title ?? 'Page not found')
  if (!area) return <NotFoundPage />

  const index = practiceAreas.indexOf(area)
  const prev = practiceAreas[index - 1]
  const next = practiceAreas[index + 1]
  const related = insights.filter((i) => i.practice === area.slug)

  return (
    <>
      <div className={styles.hero}>
        <PracticeArt key={area.slug} icon={area.icon} index={index} number={index + 1} className={styles.heroArt} />
      </div>
      <div className={styles.crumbBar}>
        <div className="container">
          <Breadcrumbs tone="light" crumbs={[{ to: '/practice-areas', label: 'Practice areas' }, { label: area.title }]} />
        </div>
      </div>

      <section className={page.section} aria-labelledby="page-title">
        <div className={`container ${page.layout}`}>
          <aside className={page.side} aria-label="All practice areas">
            <Link to="/practice-areas" className={page.back}>
              <ArrowLeft aria-hidden="true" /> Back to practice areas
            </Link>
            <ul role="list" className={`${page.sideList} ${styles.sideAreas}`}>
              {practiceAreas.map((p) => (
                <li key={p.slug}>
                  <Link to={`/practice-areas/${p.slug}`} aria-current={p.slug === area.slug ? 'page' : undefined}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <article>
            <h1 id="page-title" className={`t-h1 ${page.pageTitle}`}>
              {area.title}
            </h1>
            <span className={page.rule} aria-hidden="true" />

            <div className={`${page.prose} ${styles.intro}`}>
              {area.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className={`${page.chips} ${styles.forums}`} aria-label="Where we appear">
              {area.forums.map((f) => (
                <Chip key={f}>{f}</Chip>
              ))}
            </div>

            <section className={page.block} aria-labelledby="offerings">
              <h2 id="offerings" className={page.h2}>
                Key offerings
              </h2>
              <ul role="list" className={page.grid2}>
                {area.offerings.map((o) => (
                  <li key={o.title} className={`${page.panel} ${styles.offering}`}>
                    <Check aria-hidden="true" />
                    <div>
                      <h3 className={page.panelTitle}>{o.title}</h3>
                      <p>{o.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={page.block} aria-labelledby="approach">
              <h2 id="approach" className={page.h2}>
                Approach
              </h2>
              <p className={`${page.prose} ${styles.approach}`}>{area.approach}</p>
            </section>

            <section className={page.block} aria-labelledby="faqs">
              <h2 id="faqs" className={page.h2}>
                Frequently asked questions
              </h2>
              <Accordion
                key={area.slug}
                items={area.faqs.map((f, i) => ({ id: String(i), title: f.q, content: <p>{f.a}</p> }))}
              />
            </section>

            {related.length > 0 && (
              <section className={page.block} aria-labelledby="related">
                <h2 id="related" className={page.h2}>
                  Further reading
                </h2>
                <ul role="list" className={page.grid2}>
                  {related.map((r, i) => (
                    <li key={r.slug}>
                      <InsightCard insight={r} index={index + i} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <nav className={styles.pager} aria-label="Other practice areas">
              {prev ? (
                <Link to={`/practice-areas/${prev.slug}`} className={styles.pagerLink}>
                  <ArrowLeft aria-hidden="true" />
                  <span>
                    <small>Previous</small>
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link to={`/practice-areas/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
                  <span>
                    <small>Next</small>
                    {next.title}
                  </span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </nav>
          </article>
        </div>
      </section>

      <CtaBanner topic={area.title.replace(/ \(.*\)$/, '').toLowerCase()} />
    </>
  )
}
