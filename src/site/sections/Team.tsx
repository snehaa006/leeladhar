import { useMemo, useState } from 'react'
import { Chip, FilterChip, Orbit, Portrait } from '../../design-system'
import { practiceFilters, team, type PracticeKey } from '../data'
import styles from './Team.module.css'

const [lead, ...members] = team

export function Team() {
  const [filter, setFilter] = useState<PracticeKey | 'all'>('all')

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: members.length }
    for (const m of members) c[m.practice] = (c[m.practice] ?? 0) + 1
    return c
  }, [])

  const visible = filter === 'all' ? members : members.filter((m) => m.practice === filter)

  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <div className="container">
        <header className={styles.header}>
          <h2 id="team-title" className="t-h1">
            The people who will stand beside you
          </h2>
          <p className={`t-lead ${styles.intro}`}>
            Partners lead every matter. Associates draft and attend routine hearings under their supervision.
          </p>
        </header>

        <article className={styles.lead} aria-labelledby="lead-name">
          <Orbit
            className={styles.leadOrbit}
            animate={false}
            viewBox="0 0 1200 560"
            rings={[{ cx: 230, cy: 280, r: 245, nodes: [-30, 150], live: -30 }]}
          />
          <Portrait
            className={styles.leadPortrait}
            src={lead.photo}
            alt={`Portrait of ${lead.name}`}
            badge={lead.role}
            duotone="mint"
            aspect="4/5"
          />
          <div className={styles.leadBody}>
            <blockquote className={`t-testimony ${styles.quote}`}>
              <p>“{lead.quote}”</p>
            </blockquote>
            <div className={styles.leadMeta}>
              <h3 id="lead-name" className={styles.leadName}>
                {lead.name}
              </h3>
              <p className={styles.leadRole}>
                {lead.role}, {lead.focus.toLowerCase()}
              </p>
              <dl className={styles.facts}>
                <div>
                  <dt>In practice</dt>
                  <dd>
                    <span className="t-evidence">{lead.years}</span> years
                  </dd>
                </div>
                <div>
                  <dt>Enrolled</dt>
                  <dd>{lead.enrolled}</dd>
                </div>
                <div>
                  <dt>Speaks</dt>
                  <dd>{lead.languages.join(', ')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>

        <div className={styles.filters} role="group" aria-label="Filter the team by practice">
          {practiceFilters
            .filter((f) => counts[f.id])
            .map((f) => (
              <FilterChip key={f.id} selected={filter === f.id} count={counts[f.id]} onClick={() => setFilter(f.id)}>
                {f.label}
              </FilterChip>
            ))}
        </div>

        <ul role="list" className={styles.grid} aria-live="polite">
          {visible.map((m) => (
            <li key={m.id}>
              <article className={styles.card} aria-labelledby={`member-${m.id}`}>
                <Portrait src={m.photo} alt={`Portrait of ${m.name}`} aspect="4/5" revealOnHover />
                <div className={styles.cardBody}>
                  <h3 id={`member-${m.id}`} className={styles.name}>
                    {m.name}
                  </h3>
                  <p className={styles.role}>{m.role}</p>
                  <p className={styles.focus}>{m.focus}</p>
                  <p className={styles.years}>
                    <span className="t-evidence">{m.years}</span> years in practice
                  </p>
                  <div className={styles.langs} aria-label="Languages">
                    {m.languages.map((l) => (
                      <Chip key={l}>{l}</Chip>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
