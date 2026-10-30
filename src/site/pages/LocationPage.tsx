import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CtaBanner } from '../components/CtaBanner'
import { HighCourtFrame } from '../components/HighCourtFrame'
import { OfficeCard } from '../components/OfficeCard'
import { PageBanner } from '../components/PageBanner'
import { PracticeArt } from '../components/PracticeArt'
import { SectionHead } from '../components/SectionHead'
import { practiceAreas, practiceBySlug } from '../content/practiceAreas'
import { officeBySlug, offices, team } from '../data'
import { usePageTitle } from '../usePageTitle'
import { NotFoundPage } from './NotFoundPage'
import page from './Page.module.css'
import styles from './LocationPage.module.css'

/** /locations/:slug — one chambers, after the city pages of duaassociates.com. */
export function LocationPage() {
  const { slug } = useParams()
  const office = officeBySlug(slug)
  usePageTitle(office ? `Advocates in ${office.city}` : 'Page not found')
  if (!office) return <NotFoundPage />

  const people = team.filter((m) => m.office === office.slug)
  const other = offices.find((o) => o.slug !== office.slug)

  return (
    <>
      <PageBanner
        title={`Advocates in ${office.city}`}
        lead={office.intro}
        crumbs={[{ label: 'Locations' }, { label: office.city }]}
      />

      <section className={page.section} aria-labelledby="loc-practice">
        <div className="container">
          <SectionHead id="loc-practice" title="Practice areas" lead={`The work we most often handle at our ${office.city} chambers.`} />
          <ul role="list" className={`${page.grid3} ${styles.areas}`}>
            {office.practices.map((s) => {
              const p = practiceBySlug(s)!
              return (
                <li key={s}>
                  <Link to={`/practice-areas/${p.slug}`} className={styles.area}>
                    <PracticeArt
                      icon={p.icon}
                      index={practiceAreas.indexOf(p)}
                      number={practiceAreas.indexOf(p) + 1}
                      className={styles.art}
                    />
                    <span className={styles.areaBody}>
                      <span className={styles.areaTitle}>{p.title}</span>
                      <span>{p.summary}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className={`${page.section} ${page.sunken}`} aria-labelledby="loc-office">
        <div className={`container ${styles.officeGrid}`}>
          <div>
            <h2 id="loc-office" className="t-h1">
              Our {office.city} chambers
            </h2>
            <span className={page.rule} aria-hidden="true" />
            {people.length > 0 && (
              <ul role="list" className={styles.people}>
                {people.map((m) => (
                  <li key={m.slug}>
                    <Link to={`/people/${m.slug}`} className={styles.person}>
                      <img src={m.photo} alt="" loading="lazy" />
                      <span>
                        <strong>{m.name}</strong>
                        {m.role}
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {other && (
              <p className={styles.other}>
                Also see our <Link to={`/locations/${other.slug}`}>{other.city} chambers</Link>.
              </p>
            )}
          </div>
          <OfficeCard office={office} showMore={false} />
        </div>
      </section>

      {office.slug === 'chandigarh' && (
        <section className={page.sectionTight} aria-label="Punjab & Haryana High Court website">
          <div className="container">
            <HighCourtFrame />
          </div>
        </section>
      )}

      <CtaBanner title={`Need an advocate in ${office.city}?`} />
    </>
  )
}
