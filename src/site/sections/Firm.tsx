import { ArrowRight } from 'lucide-react'
import { Button } from '../../design-system'
import { forums } from '../data'
import styles from './Firm.module.css'

/** Courts strip, then the about-us introduction that opens both reference homepages. */
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
            A chambers in <em>Panipat</em> and at the <em>High Court</em>, run so you always know where your matter
            stands.
          </h2>
          <div className={styles.copy}>
            <p className="t-lead">
              Leeladhar Law Chambers practises from two chambers: at the District Court in Panipat and at the Punjab
              &amp; Haryana High Court in Chandigarh. A matter that starts in one can be carried through to the other
              by the same people.
            </p>
            <p className={`t-body ${styles.body}`}>
              Every matter is led personally by one of our advocates. You get plain explanations, fees agreed upfront
              and a call on the evening of every hearing.
            </p>
            <Button href="/about" variant="ghost" className={styles.more} icon={<ArrowRight />}>
              More about us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
