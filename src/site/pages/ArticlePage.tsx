import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { CtaBanner } from '../components/CtaBanner'
import { PageBanner } from '../components/PageBanner'
import { categoryLabel, formatDate, insightBySlug, insights } from '../content/insights'
import { practiceBySlug } from '../content/practiceAreas'
import { usePageTitle } from '../usePageTitle'
import { NotFoundPage } from './NotFoundPage'
import page from './Page.module.css'
import styles from './ArticlePage.module.css'

/** /insights/:slug — a single article with a "Latest" sidebar, after the article pages of duaassociates.com. */
export function ArticlePage() {
  const { slug } = useParams()
  const article = insightBySlug(slug)
  usePageTitle(article?.title ?? 'Page not found')
  if (!article) return <NotFoundPage />

  const area = practiceBySlug(article.practice)
  const latest = [...insights]
    .filter((i) => i.slug !== article.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)

  return (
    <>
      <PageBanner
        title={article.title}
        eyebrow={categoryLabel(article.category)}
        crumbs={[
          { to: '/insights', label: 'Insights' },
          { to: `/insights?category=${article.category}`, label: categoryLabel(article.category) },
          { label: 'Article' },
        ]}
      >
        <p className={styles.meta}>
          <Clock aria-hidden="true" />
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          Leeladhar Law Chambers
        </p>
      </PageBanner>

      <section className={page.section}>
        <div className={`container ${styles.layout}`}>
          <article className={page.prose}>
            <p className={styles.lede}>{article.excerpt}</p>
            {article.sections.map((s, i) => (
              <section key={i}>
                {s.heading && <h2>{s.heading}</h2>}
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
            <p className={styles.note}>
              This article is general information, not legal advice. The law may have changed since it was written;
              speak to an advocate about your own situation.
            </p>
            <div className={styles.actions}>
              <Link to="/insights" className={page.back}>
                <ArrowLeft aria-hidden="true" /> Back to insights
              </Link>
              {area && (
                <Link to={`/practice-areas/${area.slug}`} className={styles.area}>
                  Practice area: {area.title}
                </Link>
              )}
            </div>
          </article>

          <aside className={styles.side} aria-labelledby="latest">
            <h2 id="latest" className={page.sideTitle}>
              Latest insights
            </h2>
            <ul role="list" className={styles.latest}>
              {latest.map((i) => (
                <li key={i.slug}>
                  <Link to={`/insights/${i.slug}`}>
                    <span>{i.title}</span>
                    <time dateTime={i.date}>{formatDate(i.date)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CtaBanner topic={area?.title.replace(/ \(.*\)$/, '').toLowerCase()} />
    </>
  )
}
