import styles from './StatRing.module.css'

export type Stat = {
  value: string
  suffix?: string
  label: string
}

type StatRingsProps = {
  stats: Stat[]
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Overlapping outline rings, each holding one figure — after the Legal Point
 * stats row. The figures are set in Bodoni: numbers are evidence.
 */
export function StatRings({ stats, tone = 'light', className }: StatRingsProps) {
  return (
    <dl className={[styles.rings, className].filter(Boolean).join(' ')} data-tone={tone}>
      {stats.map((s) => (
        <div key={s.label} className={styles.ring}>
          <dt className={styles.label}>{s.label}</dt>
          <dd className={styles.value}>
            {s.value}
            {s.suffix && <span className={styles.suffix}>{s.suffix}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}
