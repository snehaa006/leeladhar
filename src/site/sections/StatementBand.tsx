import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { offices } from '../data'
import styles from './StatementBand.module.css'

/** One large sentence on a coloured band, after the offices statement on duaassociates.com. */
export function StatementBand() {
  return (
    <section className={styles.band} aria-label="Our chambers">
      <div className={`container ${styles.inner}`}>
        <p className={styles.statement}>
          From the District Court at Panipat to the Punjab &amp; Haryana High Court at Chandigarh, the same advocates
          take your matter from the first hearing to the last appeal.
        </p>
        <ul role="list" className={styles.places}>
          {offices.map((o) => (
            <li key={o.slug}>
              <Link to={`/locations/${o.slug}`}>
                <MapPin aria-hidden="true" />
                <span>
                  <strong>{o.city}</strong>
                  {o.lines[0]}, {o.court}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
