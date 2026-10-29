import { Link } from 'react-router-dom'
import { Logo } from '../../design-system'
import { practiceAreas } from '../content/practiceAreas'
import { contact, nav, offices, tel } from '../data'
import styles from './Footer.module.css'

const quickLinks = [...nav.map(({ to, label }) => ({ to, label })), { to: '/contact', label: 'Contact Us' }]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo tone="patina" size={44} />
          <p className={styles.motto}>Navigating the law with clarity and care.</p>
          <dl className={styles.reach}>
            <div>
              <dt>Call</dt>
              <dd>
                <a href={tel(contact.phone)}>{contact.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Write</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{contact.hours}</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Footer" className={styles.cols}>
          <div>
            <h2 className={styles.colTitle}>Quick links</h2>
            <ul role="list">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.practice}>
            <h2 className={styles.colTitle}>Practice areas</h2>
            <ul role="list">
              {practiceAreas.map((p) => (
                <li key={p.slug}>
                  <Link to={`/practice-areas/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.colTitle}>Our locations</h2>
            <ul role="list" className={styles.offices}>
              {offices.map((o) => (
                <li key={o.slug}>
                  <Link to={`/locations/${o.slug}`} className={styles.city}>
                    {o.city}
                  </Link>
                  {o.lines.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>
          As per the rules of the Bar Council of India, this website is for information only and is not an
          advertisement or solicitation.
        </p>
        <p>
          © {new Date().getFullYear()} Leeladhar Law Chambers. Mock-up: figures, client stories and events are
          placeholders.
        </p>
      </div>
    </footer>
  )
}
