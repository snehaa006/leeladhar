import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Chip.module.css'

type ChipProps = {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

/** Static tag — practice areas, forums, languages. */
export function Chip({ children, tone = 'light', className }: ChipProps) {
  return (
    <span className={[styles.chip, className].filter(Boolean).join(' ')} data-tone={tone}>
      {children}
    </span>
  )
}

type FilterChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean
  count?: number
  children: ReactNode
}

/** Toggleable chip for filtering a list. */
export function FilterChip({ selected, count, children, className, ...rest }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={[styles.chip, styles.filter, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  )
}
