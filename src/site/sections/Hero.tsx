import { ArrowUpRight } from 'lucide-react'
import { Button, Logo, Note, Orbit, Portrait } from '../../design-system'
import { team } from '../data'
import styles from './Hero.module.css'

const [lead, second] = team

/**
 * The conference screen, brought onto cream: a centred statement held between
 * two orbital lines, a portrait with its name badge, marginal notes at the edges,
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
          Navigating the law with clarity and care
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
        <Note className={styles.noteA} title="Interim relief granted" meta="Punjab & Haryana High Court, this morning" />
        <Note
          className={styles.noteB}
          status="active"
          title="Strategy note sent"
          meta="Two days after the first call"
        />
        <Note
          className={styles.noteC}
          tone="dark"
          status="awaiting"
          title="Next hearing on 4 December"
          meta="We’ll call you the same evening"
        />
      </div>

      <Logo variant="mark" size={26} tone="ink" className={styles.mark} />
    </section>
  )
}
