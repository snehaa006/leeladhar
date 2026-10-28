import { Accordion, Chip, Orbit } from '../../design-system'
import { practiceAreas } from '../data'
import styles from './Practice.module.css'

export function Practice() {
  return (
    <section id="practice" className={styles.section} aria-labelledby="practice-title">
      <div className={styles.block}>
        <Orbit
          className={styles.orbit}
          tone="dark"
          animate={false}
          viewBox="0 0 1400 900"
          rings={[
            { cx: -200, cy: 980, r: 620, nodes: [-50, -28], live: -50 },
            { cx: 1480, cy: -60, r: 300 },
          ]}
        />
        <div className={styles.inner}>
          <header className={styles.header}>
            <h2 id="practice-title" className="t-h1">
              Practice areas
            </h2>
            <p className={`t-lead ${styles.lead}`}>
              The work we take on, and where we appear for it. Open an area to see what it covers.
            </p>
          </header>
          <Accordion
            className={styles.list}
            tone="dark"
            variant="list"
            defaultOpen={practiceAreas[0].id}
            items={practiceAreas.map((p) => ({
              id: p.id,
              title: p.title,
              aside: p.forums.map((f) => (
                <Chip key={f} tone="dark">
                  {f}
                </Chip>
              )),
              content: p.body,
            }))}
          />
        </div>
      </div>
    </section>
  )
}
