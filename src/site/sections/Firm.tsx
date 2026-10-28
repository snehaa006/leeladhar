import { StatRings } from '../../design-system'
import { forums, stats } from '../data'
import styles from './Firm.module.css'

export function Firm() {
  return (
    <>
      <section className={styles.forums} aria-label="Courts and tribunals we appear before">
        <div className={`container ${styles.forumsInner}`}>
          <p className={styles.forumsLabel}>We appear before</p>
          <ul role="list" className={styles.forumList}>
            {forums.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.firm} aria-labelledby="firm-title">
        <div className={`container ${styles.grid}`}>
          <h2 id="firm-title" className={`t-h1 ${styles.title}`}>
            A small chambers, run so that you always know what is happening in your matter.
          </h2>
          <div className={styles.copy}>
            <p className="t-lead">
              Fourteen advocates across Delhi and Mumbai. Every matter is led by a partner, and every client gets a
              written strategy note before we begin.
            </p>
            <p className={`t-body ${styles.body}`}>
              The law is serious; dealing with your lawyer shouldn’t be hard. That means plain explanations, fees
              agreed upfront, and a call on the evening of every hearing.
            </p>
          </div>
          <StatRings className={styles.stats} stats={stats} />
        </div>
      </section>
    </>
  )
}
