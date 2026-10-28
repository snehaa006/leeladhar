import { process } from '../data'
import styles from './Process.module.css'

export function Process() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <div className="container">
        <header className={styles.header}>
          <h2 id="process-title" className="t-h1">
            How a matter moves
          </h2>
          <p className={`t-lead ${styles.lead}`}>The same four stages for every client, so you always know what comes next.</p>
        </header>

        <ol role="list" className={styles.steps}>
          {process.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.node} aria-hidden="true" data-first={i === 0 || undefined} />
              <span className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
              <p className={styles.when}>{step.when}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
