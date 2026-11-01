import { ArrowUpRight } from 'lucide-react'
import { Button, Logo, Orbit, Portrait } from '../../design-system'
import { team } from '../data'
import styles from './Hero.module.css'

const [lead, second] = team

/**
 * A centred statement (the house tagline) held between two orbital lines, the
 * two partners' portraits with their name badges, marginal notes at the edges,
 * and the monogram at the foot.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
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
        <p className={`t-lead ${styles.lead}`}>
          Leeladhar Law Chambers advises businesses and families across India, from chambers in Chandigarh and
          Panipat, and tells you where your matter stands after every hearing.
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
        <Portrait
          className={styles.portrait}
          src={lead.photo}
          alt={`${lead.name}, ${lead.role}`}
          badge={lead.name}
          aspect="4/5"
        />
        <Portrait
          className={styles.photo}
          src={second.photo}
          alt={`${second.name}, ${second.role}`}
          badge={second.name}
          aspect="1/1"
        />
      </div>

      <Logo variant="mark" size={26} tone="ink" className={styles.mark} />
    </section>
  )
}
