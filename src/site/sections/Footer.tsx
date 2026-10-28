import { Logo } from '../../design-system'
import { contact, navLinks } from '../data'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo tone="patina" size={44} />
          <p className={styles.motto}>Navigating the law with clarity and care.</p>
        </div>
        <nav aria-label="Footer" className={styles.cols}>
          <div>
            <h2 className={styles.colTitle}>On this page</h2>
            <ul role="list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.colTitle}>Chambers</h2>
            <ul role="list">
              {contact.address.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={styles.colTitle}>Brand</h2>
            <ul role="list">
              <li>
                <a href="/design-system">Design system</a>
              </li>
              <li>
                <a href="http://localhost:6006" target="_blank" rel="noreferrer">
                  Storybook
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>
          As per the rules of the Bar Council of India, this website is for information only and is not an
          advertisement or solicitation.
        </p>
        <p>© {new Date().getFullYear()} Leeladhar Law Chambers. Mock-up: names, figures and contact details are placeholders.</p>
      </div>
    </footer>
  )
}
