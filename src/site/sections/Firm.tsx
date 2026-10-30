import { ArrowRight } from 'lucide-react'
import { Button } from '../../design-system'
import { HighCourtFrame } from '../components/HighCourtFrame'
import { forums, practisingSince, yearsOfExperience } from '../data'
import styles from './Firm.module.css'

/** Courts strip, then the about-us introduction that opens both reference homepages. */
export function Firm() {
  return (
    <>
      <section className={styles.forums} aria-label="Courts and tribunals we appear before">
        <div className={`container ${styles.forumsInner}`}>
          <p className={styles.forumsLabel}>We appear across India before</p>
          <ul role="list" className={styles.forumList}>
            {forums.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.firm} aria-labelledby="firm-title">
        <div className={`container ${styles.grid}`}>
          <div>
            <h2 id="firm-title" className={`t-h1 ${styles.title}`}>
              A practice built in <em>Haryana</em>, taking on matters <em>across India</em>.
            </h2>
            <dl className={styles.stats}>
              <div>
                <dt>Years of experience</dt>
                <dd>{yearsOfExperience()}+</dd>
              </div>
              <div>
                <dt>In practice since</dt>
                <dd>{practisingSince}</dd>
              </div>
            </dl>
          </div>
          <div className={styles.copy}>
            <p className="t-lead">
              Leeladhar Law Chambers works from chambers at the Punjab &amp; Haryana High Court in Chandigarh and the
              District Court in Panipat, and acts for clients in Maharashtra, Karnataka, Rajasthan, Delhi and beyond.
              A matter that starts in one court is carried through to the next by the same team.
            </p>
            <p className={`t-body ${styles.body}`}>
              Every matter is led personally by a partner. You get plain explanations, fees agreed upfront and a call
              on the evening of every hearing.
            </p>
            <Button href="/about" variant="ghost" className={styles.more} icon={<ArrowRight />}>
              More about us
            </Button>
          </div>
        </div>
        <div className="container">
          <HighCourtFrame className={styles.court} />
        </div>
      </section>
    </>
  )
}
