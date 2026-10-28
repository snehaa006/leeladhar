import type { CSSProperties, ReactNode } from 'react'
import { Check, Clock3, CircleDot } from 'lucide-react'
import styles from './Note.module.css'

export type NoteStatus = 'done' | 'active' | 'awaiting'

type NoteProps = {
  title: string
  meta?: string
  status?: NoteStatus
  /** Replaces the status icon, e.g. a portrait thumbnail. */
  leading?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
  style?: CSSProperties
}

const statusIcon: Record<NoteStatus, ReactNode> = {
  done: <Check strokeWidth={2} />,
  active: <CircleDot strokeWidth={2} />,
  awaiting: <Clock3 strokeWidth={2} />,
}

const statusLabel: Record<NoteStatus, string> = {
  done: 'Done',
  active: 'In progress',
  awaiting: 'Awaiting',
}

/**
 * A floating matter note — a small pill that reports one fact about a matter.
 * Borrowed from the Mosey hero, where notes orbit the illustration.
 */
export function Note({ title, meta, status = 'done', leading, tone = 'light', className, style }: NoteProps) {
  return (
    <div className={[styles.note, className].filter(Boolean).join(' ')} data-tone={tone} data-status={status} style={style}>
      <span className={styles.lead}>
        {leading ?? (
          <span className={styles.icon}>
            {statusIcon[status]}
            <span className="visually-hidden">{statusLabel[status]}: </span>
          </span>
        )}
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {meta && <span className={styles.meta}>{meta}</span>}
      </span>
    </div>
  )
}
