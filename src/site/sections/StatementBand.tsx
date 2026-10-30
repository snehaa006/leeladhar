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
          From the trial court to the High Court, in Haryana or anywhere else in India, the same team takes your matter
          from the first hearing to the last appeal.
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
