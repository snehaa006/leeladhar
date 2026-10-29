import type { ReactNode } from 'react'
import styles from './SectionHead.module.css'

/** Centred section title with a short rule beneath, as on duaassociates.com. */
export function SectionHead({
  id,
  title,
  lead,
  align = 'center',
  tone = 'light',
  as: Tag = 'h2',
}: {
  id?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'center' | 'start'
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2'
}) {
  return (
    <header className={styles.head} data-align={align} data-tone={tone}>
      <Tag id={id} className={`t-h1 ${styles.title}`}>
        {title}
      </Tag>
      <span className={styles.rule} aria-hidden="true" />
      {lead && <p className={`t-lead ${styles.lead}`}>{lead}</p>}
    </header>
  )
}
