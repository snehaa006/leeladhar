import { Link } from 'react-router-dom'
import { ArrowRight, Navigation, Phone } from 'lucide-react'
import { contact, mapEmbed, mapLink, tel, type Office } from '../data'
import styles from './OfficeCard.module.css'

/** One chambers: map, address and actions, after "Our presence" on legacylawoffices.com. */
export function OfficeCard({ office, showMore = true }: { office: Office; showMore?: boolean }) {
  return (
    <article className={styles.card} aria-labelledby={`office-${office.slug}`}>
      <iframe
        className={styles.map}
        src={mapEmbed(office.mapQuery)}
        title={`Map: ${office.mapQuery}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className={styles.body}>
        <h3 id={`office-${office.slug}`} className={styles.city}>
          {office.city} chambers
        </h3>
        <p className={styles.court}>{office.court}</p>
        <address className={styles.address}>
          {office.lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </address>
        <div className={styles.actions}>
          <a href={tel(contact.phone)} className={styles.action}>
            <Phone aria-hidden="true" /> Call
          </a>
          <a href={mapLink(office.mapQuery)} target="_blank" rel="noreferrer" className={styles.action}>
            <Navigation aria-hidden="true" /> Directions
          </a>
          {showMore && (
            <Link to={`/locations/${office.slug}`} className={styles.more}>
              About this chambers <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
