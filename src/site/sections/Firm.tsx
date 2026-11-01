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
              Every legal challenge has an{' '}
              <em>
                <TypeOnView text="answer." />
              </em>
            </h2>
            <p className={`t-lead ${styles.answer}`} data-reveal style={{ ['--reveal-delay' as string]: '140ms' }}>
              {about.answer}
            </p>
            <dl className={styles.stats} data-reveal style={{ ['--reveal-delay' as string]: '200ms' }}>
              <div>
                <dt>In practice since</dt>
                <dd>
                  <CountUp from={1990} to={practisingSince} />
                </dd>
              </div>
            </dl>
          </div>
          <div className={styles.copy}>
            <ScrollText text={about.intro} className={`t-lead ${styles.lead}`} />
            {about.story.map((p) => (
              <ScrollText key={p} text={p} className={`t-body ${styles.body}`} />
            ))}
            <p className={styles.tagline} data-reveal>
              Decoding Law <span aria-hidden="true">|</span>
              <span className="visually-hidden">,</span> Delivering Solutions
            </p>
            <ScrollText text={about.closing} className={styles.closing} />
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
