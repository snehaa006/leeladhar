import { useId, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Orbit } from '../../design-system'
import { CtaBanner } from '../components/CtaBanner'
import { Breadcrumbs } from '../components/PageBanner'
import { practiceBySlug } from '../content/practiceAreas'
import { contact, memberBySlug, officeBySlug, team, tel, yearsOfExperience } from '../data'
import { usePageTitle } from '../usePageTitle'
import { NotFoundPage } from './NotFoundPage'
import page from './Page.module.css'
import styles from './PersonPage.module.css'

const tabs = ['Profile overview', 'Chambers', 'Practice', 'Get in touch'] as const
type Tab = (typeof tabs)[number]

/** /people/:slug — profile banner and tabbed sidebar, after the profile pages of legacylawoffices.com. */
export function PersonPage() {
  const { slug } = useParams()
  const member = memberBySlug(slug)
  const [tab, setTab] = useState<Tab>('Profile overview')
  const base = useId()
  usePageTitle(member?.name ?? 'Page not found')
  if (!member) return <NotFoundPage />

  const office = officeBySlug(member.office)!
  const others = team.filter((m) => m.slug !== member.slug)

  return (
    <>
      <section className={styles.banner} aria-labelledby="page-title">
        <Orbit
          className={styles.orbit}
          tone="dark"
          animate={false}
          viewBox="0 0 1440 420"
          rings={[{ cx: 1300, cy: 520, r: 420, nodes: [200, 236], live: 200 }]}
        />
        <div className={`container ${styles.bannerInner}`}>
          <img className={styles.photo} src={member.photo} alt={`Portrait of ${member.name}`} />
          <div className={styles.bannerCopy}>
            <Breadcrumbs crumbs={[{ to: '/people', label: 'Our people' }, { label: member.name }]} />
            <h1 id="page-title" className={`t-h1 ${styles.name}`}>
              {member.name}
            </h1>
            <p className={styles.role}>
              {member.role} · {yearsOfExperience()}+ years of experience
            </p>
            <ul role="list" className={styles.reach}>
              <li>
                <Mail aria-hidden="true" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <Phone aria-hidden="true" />
                <a href={tel(contact.phone)}>{contact.phone}</a>
              </li>
              <li>
                <MapPin aria-hidden="true" />
                <span>{office.city} chambers · Matters across India</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={page.section}>
        <div className={`container ${page.layout}`}>
          <aside className={page.side}>
            <div role="tablist" aria-orientation="vertical" aria-label="Profile sections">
              <ul role="presentation" className={page.sideList}>
                {tabs.map((t) => (
                  <li key={t} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`${base}-${t}`}
                      aria-selected={tab === t}
                      aria-controls={`${base}-panel`}
                      onClick={() => setTab(t)}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-${tab}`} className={styles.panel}>
            <h2 className={page.h2}>{tab}</h2>
            <span className={page.rule} aria-hidden="true" />

            {tab === 'Profile overview' && (
              <div className={`${page.prose} ${styles.body}`}>
                {member.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}

            {tab === 'Chambers' && (
              <div className={styles.body}>
                <div className={page.panel}>
                  <h3 className={page.panelTitle}>{office.city}</h3>
                  <p>
                    {office.lines.map((l) => (
                      <span key={l} className={styles.line}>
                        {l}
                      </span>
                    ))}
                  </p>
                </div>
                <p className={`${page.prose} ${styles.after}`}>{office.intro}</p>
                <Link to={`/locations/${office.slug}`} className={styles.link}>
                  About our {office.city} chambers <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            )}

            {tab === 'Practice' && (
              <ul role="list" className={`${page.grid2} ${styles.body}`}>
                {office.practices.map((s) => {
                  const p = practiceBySlug(s)!
                  return (
                    <li key={s} className={page.panel}>
                      <h3 className={page.panelTitle}>
                        <Link to={`/practice-areas/${p.slug}`} className={styles.plain}>
                          {p.title}
                        </Link>
                      </h3>
                      <p>{p.summary}</p>
                    </li>
                  )
                })}
              </ul>
            )}

            {tab === 'Get in touch' && (
              <div className={`${page.prose} ${styles.body}`}>
                <p>
                  Call <a href={tel(contact.phone)}>{contact.phone}</a> or write to{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a> and ask for {member.name}. You can also
                  request a call back, and we will return it within one working day.
                </p>
                <p>
                  <Link to="/contact" className={styles.link}>
                    Request a call back <ArrowRight aria-hidden="true" />
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className={`${page.sectionTight} ${page.sunken}`} aria-labelledby="others">
          <div className="container">
            <h2 id="others" className={page.h2}>
              Other key individuals
            </h2>
            <ul role="list" className={styles.others}>
              {others.map((m) => (
                <li key={m.slug}>
                  <Link to={`/people/${m.slug}`} className={styles.other}>
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
          </div>
        </section>
      )}

      <CtaBanner
        title="Build your career with us"
        body="We welcome applications from law students for internships and from young advocates who want to learn trial and High Court practice."
        href="/careers"
        action="Explore careers"
      />
    </>
  )
}
