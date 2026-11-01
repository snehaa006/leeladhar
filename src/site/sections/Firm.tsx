import { ArrowRight } from 'lucide-react'
import { Button } from '../../design-system'
import { CountUp } from '../motion/CountUp'
import { ScrollText } from '../motion/ScrollText'
import { TypeOnView } from '../motion/TypeOnView'
import { HighCourtFrame } from '../components/HighCourtFrame'
import { about, forums, practisingSince } from '../data'
import styles from './Firm.module.css'

/** The about-us introduction that opens both reference homepages, then the courts we appear before. */
export function Firm() {
  return (
    <>
      <section id="about" className={styles.firm} aria-labelledby="firm-title">
        <div className={`container ${styles.grid}`}>
          <div>
            <p className={styles.eyebrow} data-reveal>
              About us
            </p>
            <h2 id="firm-title" className={`t-h1 ${styles.title}`} data-reveal style={{ ['--reveal-delay' as string]: '80ms' }}>
              No inherited legacy. Just a{' '}
              <em>
                <TypeOnView text="legacy in the making." />
              </em>
            </h2>
            <dl className={styles.stats} data-reveal="stagger" style={{ ['--reveal-delay' as string]: '160ms' }}>
              <div>
                <dt>Of experience</dt>
                <dd>
                  <CountUp to={2} duration={900} /> <span className={styles.unit}>Decades</span>
                </dd>
              </div>
              <div>
                <dt>In practice since</dt>
                <dd>
                  <CountUp from={1990} to={practisingSince} />
                </dd>
              </div>
            </dl>
          </div>
          <div className={styles.copy}>
            <ScrollText text={about.vision} className={`t-lead ${styles.lead}`} />
            {about.story.map((p) => (
              <ScrollText key={p} text={p} className={`t-body ${styles.body}`} />
            ))}
            <div data-reveal style={{ ['--reveal-delay' as string]: '200ms' }}>
              <Button href="/about" variant="ghost" className={styles.more} icon={<ArrowRight />}>
                More about us
              </Button>
            </div>
          </div>
        </div>
        <div className="container" data-reveal="zoom">
          <HighCourtFrame className={styles.court} />
        </div>
      </section>

      <section className={styles.forums} aria-label="Courts and tribunals we appear before">
        <div className={`container ${styles.forumsInner}`}>
          <p className={styles.forumsLabel}>We appear across India before</p>
          <div className={styles.ticker}>
            <div className={styles.tickerTrack}>
              <ul role="list" className={styles.forumList}>
                {forums.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <ul role="list" className={styles.forumList} aria-hidden="true" data-copy>
                {forums.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
