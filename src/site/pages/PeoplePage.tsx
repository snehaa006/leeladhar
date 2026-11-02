import { Link, Navigate, useParams } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { Chip } from '../../design-system'
import { CtaBanner } from '../components/CtaBanner'
import { PageBanner } from '../components/PageBanner'
import { photos } from '../content/photos'
import { contact, memberBySlug, team, tel } from '../data'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './PeoplePage.module.css'

/**
 * Our people: both partners' full profiles side by side on the one page, so
 * both are on screen together and nothing sits behind a click.
 */
export function PeoplePage() {
  usePageTitle('Our people')

  return (
    <>
      <PageBanner
        title="Our people"
        lead="The partners of Leeladhar Law Chambers. Every matter is led by one of them, from the first call to the final order, wherever in India it is heard."
        crumbs={[{ label: 'Our people' }]}
        photo={photos.gavel}
      />

      <section className={page.section} aria-label="Our partners">
        <div className="container">
          <ul role="list" className={styles.profiles}>
            {team.map((m) => (
              <li key={m.slug}>
                <article id={m.slug} className={styles.profile} aria-labelledby={`${m.slug}-name`}>
                  <header className={styles.head}>
                    <img className={styles.photo} src={m.photo} alt={`Portrait of ${m.name}`} decoding="async" />
                    <div>
                      <h2 id={`${m.slug}-name`} className={`t-h2 ${styles.name}`}>
                        {m.name}
                      </h2>
                      <p className={styles.role}>
                        {m.role} · In practice since {m.since}
                      </p>
                    </div>
                  </header>

                  <div className={styles.body}>

                    <div className={`${page.prose} ${styles.bio}`}>
                      {m.overview.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>

                    <h3 className={styles.areasTitle}>Practice areas</h3>
                    <ul role="list" className={page.chips}>
                      {m.practices.map((p) => (
                        <li key={p.label}>
                          {p.slug ? (
                            <Link to={`/practice-areas/${p.slug}`} className={styles.chipLink}>
                              <Chip>{p.label}</Chip>
                            </Link>
                          ) : (
                            <Chip>{p.label}</Chip>
                          )}
                        </li>
                      ))}
                    </ul>

                    <ul role="list" className={styles.reach}>
                      <li>
                        <Mail aria-hidden="true" />
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </li>
                      <li>
                        <Phone aria-hidden="true" />
                        <a href={tel(contact.phone)}>{contact.phone}</a>
                      </li>
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ul>
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

/** Old /people/:slug links land on that partner's profile on /people. */
export function PersonRedirect() {
  const { slug } = useParams()
  return <Navigate to={memberBySlug(slug) ? `/people#${slug}` : '/people'} replace />
}
