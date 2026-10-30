import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { FilterChip } from '../../design-system'
import { CtaBanner } from '../components/CtaBanner'
import { PageBanner } from '../components/PageBanner'
import { offices, team, type OfficeSlug } from '../data'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './PeoplePage.module.css'

/** Our people: search by name and filter by chambers, after duaassociates.com/our-people. */
export function PeoplePage() {
  usePageTitle('Our people')
  const [query, setQuery] = useState('')
  const [office, setOffice] = useState<OfficeSlug | 'all'>('all')

  const q = query.trim().toLowerCase()
  const visible = team.filter((m) => (office === 'all' || m.office === office) && (!q || m.name.toLowerCase().includes(q)))

  return (
    <>
      <PageBanner
        title="Our people"
        lead="The partners of Leeladhar Law Chambers. Every matter is led by one of them, from the first call to the final order, wherever in India it is heard."
        crumbs={[{ label: 'Our people' }]}
      />

      <section className={page.section} aria-labelledby="people-list">
        <div className="container">
          <h2 id="people-list" className="visually-hidden">
            Advocates
          </h2>
          <div className={styles.filters}>
            <label className={styles.search}>
              <span className="visually-hidden">Search by name</span>
              <Search aria-hidden="true" />
              <input
                type="search"
                placeholder="Search by name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className={styles.chips} role="group" aria-label="Filter by chambers">
              <FilterChip selected={office === 'all'} count={team.length} onClick={() => setOffice('all')}>
                All
              </FilterChip>
              {offices.map((o) => (
                <FilterChip
                  key={o.slug}
                  selected={office === o.slug}
                  count={team.filter((m) => m.office === o.slug).length}
                  onClick={() => setOffice(o.slug)}
                >
                  {o.city}
                </FilterChip>
              ))}
            </div>
          </div>

          <div aria-live="polite">
            {visible.length === 0 ? (
              <p className={`${page.empty} ${styles.empty}`}>No one matches that search.</p>
            ) : (
              <ul role="list" className={styles.grid}>
                {visible.map((m) => (
                  <li key={m.slug}>
                    <Link to={`/people/${m.slug}`} className={styles.card}>
                      <img src={m.photo} alt="" loading="lazy" decoding="async" />
                      <span className={styles.caption}>
                        <span className={styles.name}>{m.name}</span>
                        <span className={styles.role}>
                          {m.role} · {offices.find((o) => o.slug === m.office)?.city}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Build your career with us"
        body="We welcome applications from law students for internships and from young advocates who want to learn trial and High Court practice."
        href="/careers"
        action="Explore careers"
      />
    </>
  )
}
