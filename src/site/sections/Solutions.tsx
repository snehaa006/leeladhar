import { useState, type ReactNode } from 'react'
import {
  ArrowUpRight,
  Building2,
  FileText,
  Globe2,
  Handshake,
  HeartHandshake,
  Home,
  KeyRound,
  Landmark,
  Scale,
  ScrollText,
  Users,
  Video,
} from 'lucide-react'
import { Button, Note, Orbit, Tabs } from '../../design-system'
import { audiences, type Solution } from '../data'
import styles from './Solutions.module.css'

const icons: Record<Solution['icon'], ReactNode> = {
  building: <Building2 />,
  handshake: <Handshake />,
  users: <Users />,
  file: <FileText />,
  scale: <Scale />,
  landmark: <Landmark />,
  home: <Home />,
  scroll: <ScrollText />,
  heart: <HeartHandshake />,
  key: <KeyRound />,
  globe: <Globe2 />,
  video: <Video />,
}

export function Solutions() {
  const [audienceId, setAudienceId] = useState(audiences[0].id)

  return (
    <section id="solutions" className={styles.section} aria-labelledby="solutions-title">
      <div className="container">
        <header className={styles.header}>
          <h2 id="solutions-title" className="t-h1">
            Solutions shaped around who you are
          </h2>
          <p className={`t-lead ${styles.intro}`}>
            A founder raising money and a family dividing a house need different things from a lawyer. Pick the one
            closest to you.
          </p>
        </header>

        <Tabs
          label="Who the solutions are for"
          items={audiences.map((a) => ({ id: a.id, label: a.label }))}
          value={audienceId}
          onChange={setAudienceId}
          className={styles.tabs}
        >
          {(selected) => {
            const a = audiences.find((x) => x.id === selected) ?? audiences[0]
            return (
              <div key={a.id} className={styles.panel}>
                <div className={styles.list}>
                  <p className={styles.summary}>{a.summary}</p>
                  <ul role="list">
                    {a.solutions.map((s) => (
                      <li key={s.title} className={styles.item}>
                        <span className={styles.icon} aria-hidden="true">
                          {icons[s.icon]}
                        </span>
                        <div>
                          <h3 className={styles.itemTitle}>{s.title}</h3>
                          <p className={styles.itemBody}>{s.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button href="#contact" variant="secondary" icon={<ArrowUpRight />} className={styles.cta}>
                    Talk to us about this
                  </Button>
                </div>

                <figure className={styles.matter} aria-label={`Example matter: ${a.matter.title}`}>
                  <Orbit
                    className={styles.matterOrbit}
                    tone="dark"
                    animate={false}
                    viewBox="0 0 600 640"
                    rings={[{ cx: 640, cy: 80, r: 300, nodes: [150] }]}
                  />
                  <figcaption className={styles.matterHead}>
                    <span className={styles.matterKicker}>Example matter</span>
                    <span className={styles.matterTitle}>{a.matter.title}</span>
                    <span className={styles.matterClient}>{a.matter.client}</span>
                  </figcaption>
                  <ol role="list" className={styles.steps}>
                    {a.matter.steps.map((step) => (
                      <li key={step.label} className={styles.step} data-status={step.status}>
                        <Note tone="dark" status={step.status} title={step.label} meta={step.meta} />
                      </li>
                    ))}
                  </ol>
                  <p className={styles.matterFoot}>
                    <span className={styles.liveDot} aria-hidden="true" />
                    You see this view for your own matter, updated after every hearing.
                  </p>
                </figure>
              </div>
            )
          }}
        </Tabs>
      </div>
    </section>
  )
}
