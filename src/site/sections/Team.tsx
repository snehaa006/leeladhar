import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { Button, Orbit } from '../../design-system'
import { contact, team, tel } from '../data'
import { Particles } from '../motion/Particles'
import { ScrollText } from '../motion/ScrollText'
import { TypeOnView } from '../motion/TypeOnView'
import styles from './Team.module.css'

/**
 * Key individuals on a dark band: the heading holds the left column and the
 * advocates stand as tall, staggered portraits with their name set into the photo.
 */
export function Team() {
  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <Particles tone="dark" density={0.7} />
      <Orbit
        className={styles.orbit}
        tone="dark"
        animate={false}
        viewBox="0 0 1440 900"
        rings={[{ cx: 1500, cy: 980, r: 640, nodes: [196, 232], live: 196 }]}
      />
      <div className={`container ${styles.inner}`}>
        <header className={styles.header} data-reveal="left">
          <p className={styles.eyebrow}>Key individuals</p>
          <h2 id="team-title" className={`t-h1 ${styles.title}`}>
            The partners who will{' '}
            <em>
              <TypeOnView text="stand beside you" />
            </em>
          </h2>
          <ScrollText
            tone="dark"
            className={`t-lead ${styles.intro}`}
            text="Every matter is **led by a partner**, from the first call to the final order, wherever in India it is heard. You always know ==whose number to dial==."
          />
          <dl className={styles.direct}>
            <div>
              <dt>Call</dt>
              <dd>
                <a href={tel(contact.phone)}>{contact.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Write</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
          </dl>
          <Button href="/people" variant="ghost-dark" className={styles.all} icon={<ArrowRight />}>
            Meet our people
          </Button>
        </header>

        <ul role="list" className={styles.people} data-reveal="stagger" style={{ ['--reveal-delay' as string]: '150ms' }}>
          {team.map((m) => (
            <li key={m.slug}>
              <article className={styles.card} aria-labelledby={`member-${m.slug}`}>
                <img
                  className={styles.photo}
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  loading="lazy"
                  decoding="async"
                  data-parallax="0.05"
                />
                <div className={styles.actions}>
                  <a href={`mailto:${contact.email}`} aria-label={`Email ${m.name}`}>
                    <Mail aria-hidden="true" />
                  </a>
                  <a href={tel(contact.phone)} aria-label={`Call ${m.name}`}>
                    <Phone aria-hidden="true" />
                  </a>
                </div>
                <div className={styles.caption}>
                  <h3 id={`member-${m.slug}`} className={styles.name}>
                    <Link to={`/people#${m.slug}`}>{m.name}</Link>
                  </h3>
                  <p className={styles.role}>{m.role}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
