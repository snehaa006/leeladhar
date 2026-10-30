import { useEffect, useId, useRef, type ReactNode } from 'react'
import styles from './Dialog.module.css'

type DialogProps = {
  open: boolean
  /** Called on Escape. Omit to make the dialog require an explicit action. */
  onClose?: () => void
  title: string
  children: ReactNode
  actions: ReactNode
  className?: string
}

/** Modal built on the native <dialog>, so focus trapping and the top layer come from the browser. */
export function Dialog({ open, onClose, title, children, actions, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      // Start focus on the dialog itself, not on a scrollable body or the first action.
      el.focus()
    }
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={[styles.dialog, className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
      tabIndex={-1}
      onCancel={(e) => {
        if (!onClose) e.preventDefault()
        else onClose()
      }}
    >
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <div className={styles.body}>{children}</div>
      <div className={styles.actions}>{actions}</div>
    </dialog>
  )
}
