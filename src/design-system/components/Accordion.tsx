import { useId, useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import styles from './Accordion.module.css'

export type AccordionItem = {
  id: string
  title: ReactNode
  /** Shown on the right of the header row, e.g. forums or a count. */
  aside?: ReactNode
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  /** Item open on first render. */
  defaultOpen?: string | null
  tone?: 'light' | 'dark'
  /** `list` is a ruled list with large titles; `cards` gives each item its own panel. */
  variant?: 'list' | 'cards'
  className?: string
}

/** One-open-at-a-time disclosure list. */
export function Accordion({ items, defaultOpen = null, tone = 'light', variant = 'cards', className }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen)
  const base = useId()

  return (
    <div className={[styles.accordion, className].filter(Boolean).join(' ')} data-tone={tone} data-variant={variant}>
      {items.map((item) => {
        const isOpen = open === item.id
        const headId = `${base}-h-${item.id}`
        const panelId = `${base}-p-${item.id}`
        return (
          <div key={item.id} className={styles.item} data-open={isOpen || undefined}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={headId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span className={styles.title}>{item.title}</span>
                {item.aside && <span className={styles.aside}>{item.aside}</span>}
                <span className={styles.icon} aria-hidden="true">
                  <Plus strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={headId} className={styles.panel} hidden={!isOpen}>
              <div className={styles.content}>{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
