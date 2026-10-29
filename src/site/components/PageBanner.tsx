import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Orbit } from '../../design-system'
import styles from './PageBanner.module.css'

export type Crumb = { to?: string; label: string }

type PageBannerProps = {
  title: string
  lead?: ReactNode
  /** Trail after "Home". The last crumb is the current page. */
  crumbs: Crumb[]
  eyebrow?: string
  children?: ReactNode
}

/** Inner-page header: a dark band with breadcrumb, title and lead. */
export function PageBanner({ title, lead, crumbs, eyebrow, children }: PageBannerProps) {
  return (
    <section className={styles.banner} aria-labelledby="page-title">
      <Orbit
        className={styles.orbit}
        tone="dark"
        animate={false}
        viewBox="0 0 1440 420"
        rings={[
          { cx: 1260, cy: 520, r: 380, nodes: [205, 240], live: 205 },
          { cx: 1500, cy: -40, r: 300, nodes: [150] },
        ]}
      />
      <div className={`container ${styles.inner}`}>
        <Breadcrumbs crumbs={crumbs} />
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 id="page-title" className={`t-h1 ${styles.title}`}>
          {title}
        </h1>
        {lead && <p className={`t-lead ${styles.lead}`}>{lead}</p>}
        {children}
      </div>
    </section>
  )
}

export function Breadcrumbs({ crumbs, tone = 'dark' }: { crumbs: Crumb[]; tone?: 'light' | 'dark' }) {
  const all: Crumb[] = [{ to: '/', label: 'Home' }, ...crumbs]
  return (
    <nav aria-label="Breadcrumb" className={styles.crumbs} data-tone={tone}>
      <ol role="list">
        {all.map((c, i) => {
          const last = i === all.length - 1
          return (
            <li key={i}>
              {c.to && !last ? <Link to={c.to}>{c.label}</Link> : <span aria-current={last ? 'page' : undefined}>{c.label}</span>}
              {!last && <ChevronRight aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
