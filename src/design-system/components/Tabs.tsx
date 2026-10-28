import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react'
import styles from './Tabs.module.css'

export type TabItem = {
  id: string
  label: ReactNode
}

type TabsProps = {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  /** Accessible name for the tab list. */
  label: string
  tone?: 'light' | 'dark'
  /** Stretch tabs to fill the row. */
  fill?: boolean
  className?: string
  /** Render prop for the panel of the selected tab. */
  children: (selected: string) => ReactNode
}

/**
 * Underlined tabs, after the Mosey role switcher. Arrow keys move between tabs,
 * Home/End jump to the ends; selection follows focus.
 */
export function Tabs({ items, value, onChange, label, tone = 'light', fill = false, className, children }: TabsProps) {
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const index = Math.max(0, items.findIndex((t) => t.id === value))

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    onChange(items[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div className={[styles.tabs, className].filter(Boolean).join(' ')} data-tone={tone}>
      <div role="tablist" aria-label={label} className={styles.list} data-fill={fill || undefined} onKeyDown={onKeyDown}>
        {items.map((item, i) => {
          const selected = item.id === value
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${value}`} className={styles.panel} tabIndex={0}>
        {children(value)}
      </div>
    </div>
  )
}
