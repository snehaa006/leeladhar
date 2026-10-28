import { Note, Orbit } from '../../design-system'
import { clients, clientStories, type ClientStory } from '../data'
import styles from './Clients.module.css'

const [featured, ...stories] = clientStories

function Story({ story, tone }: { story: ClientStory; tone: 'light' | 'dark' }) {
  return (
    <figure className={styles.story} data-tone={tone}>
      <blockquote className={`t-testimony ${styles.quote}`}>
        <p>“{story.quote}”</p>
      </blockquote>
      <figcaption className={styles.who}>
        <span className={styles.whoName}>{story.who}</span>
        <span className={styles.whoPlace}>{story.where}</span>
      </figcaption>
      <Note className={styles.outcome} tone={tone} title={story.outcome} meta={story.matter} />
    </figure>
  )
}

export function Clients() {
  return (
    <section id="clients" className={styles.section} aria-labelledby="clients-title">
      <div className="container">
        <header className={styles.header}>
          <h2 id="clients-title" className="t-h1">
            The people and companies we act for
          </h2>
          <p className={`t-lead ${styles.intro}`}>
            Founders, family businesses, listed companies and individuals. Most prefer not to be named, so their
            stories below are told without names.
          </p>
        </header>

        <ul role="list" className={styles.wall} aria-label="Clients">
          {clients.map((c) => (
            <li key={c.name} className={styles.client}>
              <span className={styles.mark} data-mark={c.mark}>
                {c.name}
              </span>
              <span className={styles.sector}>{c.sector}</span>
            </li>
          ))}
        </ul>

        <div className={styles.stories}>
          <div className={styles.featured}>
            <Orbit
              className={styles.orbit}
              tone="dark"
              animate={false}
              viewBox="0 0 800 560"
              rings={[{ cx: 820, cy: 600, r: 360, nodes: [200, 236], live: 200 }]}
            />
            <Story story={featured} tone="dark" />
          </div>
          <div className={styles.side}>
            {stories.map((s) => (
              <Story key={s.id} story={s} tone="light" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
