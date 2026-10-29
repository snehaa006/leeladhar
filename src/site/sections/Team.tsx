import { Mail, Phone } from 'lucide-react'
import { Orbit } from '../../design-system'
import { contact, team } from '../data'
import styles from './Team.module.css'

/**
 * Key individuals on a dark band: the heading holds the left column and the
 * advocates stand as tall, staggered portraits with their name set into the photo.
 */
export function Team() {
  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <Orbit
        className={styles.orbit}
        tone="dark"
        animate={false}
        viewBox="0 0 1440 900"
        rings={[{ cx: 1500, cy: 980, r: 640, nodes: [196, 232], live: 196 }]}
      />
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Key individuals</p>
          <h2 id="team-title" className={`t-h1 ${styles.title}`}>
            The advocates who will stand beside you
          </h2>
          <p className={`t-lead ${styles.intro}`}>
            Every matter is led by one of us, from the first call to the final order. You always know whose number
            to dial.
          </p>
          <dl className={styles.direct}>
            <div>
              <dt>Call</dt>
              <dd>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Write</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
          </dl>
        </header>

        <ul role="list" className={styles.people}>
          {team.map((m) => (
            <li key={m.id}>
              <article className={styles.card} aria-labelledby={`member-${m.id}`}>
                <img className={styles.photo} src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" decoding="async" />
                <div className={styles.actions}>
                  <a href={`mailto:${contact.email}`} aria-label={`Email ${m.name}`}>
                    <Mail aria-hidden="true" />
                  </a>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} aria-label={`Call ${m.name}`}>
                    <Phone aria-hidden="true" />
                  </a>
                </div>
                <div className={styles.caption}>
                  <h3 id={`member-${m.id}`} className={styles.name}>
                    {m.name}
                  </h3>
                  <p className={styles.role}>{m.role}</p>
                  <p className={styles.chambers}>{m.chambers}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
