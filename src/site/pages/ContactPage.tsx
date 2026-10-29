import { useSearchParams } from 'react-router-dom'
import { Clock, Mail, Phone } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { OfficeCard } from '../components/OfficeCard'
import { PageBanner } from '../components/PageBanner'
import { SectionHead } from '../components/SectionHead'
import { practiceBySlug } from '../content/practiceAreas'
import { contact, offices, tel } from '../data'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './ContactPage.module.css'

/** /contact — form and info panel (duaassociates.com) and "Our presence" (legacylawoffices.com). */
export function ContactPage() {
  usePageTitle('Contact us')
  const [params] = useSearchParams()
  const matter = practiceBySlug(params.get('matter') ?? undefined)?.slug ?? ''

  return (
    <>
      <PageBanner
        title="Speak with us for clear guidance"
        lead="Leave your number and a line about the matter. A member of the chambers calls back within one working day."
        crumbs={[{ label: 'Contact us' }]}
      />

      <section className={page.section} aria-labelledby="enquiry">
        <div className={`container ${styles.grid}`}>
          <div className={styles.formCard}>
            <h2 id="enquiry" className={page.h2}>
              Request a call back
            </h2>
            <div className={styles.form}>
              <ContactForm defaultMatter={matter} />
            </div>
          </div>

          <aside className={styles.info} aria-labelledby="info-title">
            <h2 id="info-title" className={styles.infoTitle}>
              Contact info
            </h2>
            <dl className={styles.infoList}>
              <div>
                <dt>For legal consultation</dt>
                <dd>
                  <Phone aria-hidden="true" />
                  <a href={tel(contact.phone)}>{contact.phone}</a>
                </dd>
                <dd>
                  <Mail aria-hidden="true" />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>For internships and careers</dt>
                <dd>
                  <Mail aria-hidden="true" />
                  <a href={`mailto:${contact.email}?subject=Internship%20application`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>
                  <Clock aria-hidden="true" />
                  {contact.hours}
                </dd>
              </div>
            </dl>
            <p className={styles.urgent}>
              If it is urgent, such as an arrest or a hearing tomorrow, call rather than writing.
            </p>
          </aside>
        </div>
      </section>

      <section className={`${page.section} ${page.sunken}`} aria-labelledby="presence">
        <div className="container">
          <SectionHead id="presence" title="Our presence" lead="Two chambers, at the District Court and at the High Court." />
          <ul role="list" className={`${page.grid2} ${styles.offices}`}>
            {offices.map((o) => (
              <li key={o.slug}>
                <OfficeCard office={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
