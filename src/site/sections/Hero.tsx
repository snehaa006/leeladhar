import { ArrowUpRight } from 'lucide-react'
import { Button, Orbit, Portrait } from '../../design-system'
import { team } from '../data'
import { Particles } from '../motion/Particles'
import { Typewriter } from '../motion/Typewriter'
import styles from './Hero.module.css'

const [lead, second] = team

const matters = [
  'commercial disputes',
  'MSME payment recovery',
  'bail and criminal defence',
  'property and succession',
  'contract management',
  'writ petitions',
]

/**
 * A centred statement (the house tagline) held between two orbital lines, the
 * two partners' portraits, each with a round name badge at its lower corner, and marginal notes at the edges.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Particles />
      <Orbit
        className={styles.orbit}
        viewBox="0 0 1440 860"
        rings={[
          { cx: -60, cy: 520, r: 620, nodes: [-33, 6], live: -33 },
          { cx: 1500, cy: 360, r: 560, nodes: [166, 204] },
        ]}
      />

      <p className={`t-margin ${styles.marginLeft}`}>
        Solutions
        <br />
        that protect
      </p>
      <p className={`t-margin ${styles.marginRight}`}>
        Advice
        <br />
        that empowers
      </p>

      <div className={`container ${styles.center}`}>
        <h1 id="hero-title" className={`t-display ${styles.title}`}>
          <span className={styles.line}>
            <span>Decoding Law</span>
          </span>
          <span className={styles.pipe} aria-hidden="true" />
          <span className="visually-hidden"> | </span>
          <span className={styles.line}>
            <span>
              Delivering <em>Solutions</em>
            </span>
          </span>
        </h1>
        <p className={styles.typed}>
          Advocates for <Typewriter phrases={matters} />
        </p>
        <p className={`t-lead ${styles.lead}`}>
          Leeladhar Law Chambers provides strategic legal counsel and dedicated representation to clients across India,
          guided by an unwavering commitment to their interests and a promise of transparency through clear and timely
          updates on the progress of every matter after each hearing.
        </p>
        <div className={styles.actions}>
          <Button href="/contact" size="lg" icon={<ArrowUpRight />}>
            Book a consultation
          </Button>
          <Button href="/practice-areas" size="lg" variant="ghost">
            Explore practice areas
          </Button>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={`${styles.person} ${styles.portrait}`} data-parallax="0.12">
          <Portrait
            src={lead.photo}
            alt={`${lead.name}, ${lead.role}`}
            aspect="4/5"
            badge={lead.name}
            badgeAt="bottom-right"
          />
        </div>
        <div className={`${styles.person} ${styles.photo}`} data-parallax="-0.1">
          <Portrait
            src={second.photo}
            alt={`${second.name}, ${second.role}`}
            aspect="4/5"
            badge={second.name}
            badgeAt="bottom-right"
          />
        </div>
      </div>
    </section>
  )
}
