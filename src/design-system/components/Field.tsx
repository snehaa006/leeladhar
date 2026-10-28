import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Field.module.css'

type ShellProps = {
  label: string
  hint?: string
  error?: string
  tone?: 'light' | 'dark'
  className?: string
}

function Shell({
  id,
  label,
  hint,
  error,
  tone = 'light',
  className,
  children,
}: ShellProps & { id: string; children: ReactNode }) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')} data-tone={tone} data-invalid={error ? true : undefined}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className={styles.error}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}

type TextFieldProps = ShellProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

export function TextField({ label, hint, error, tone, className, id, ...input }: TextFieldProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Shell id={fieldId} label={label} hint={hint} error={error} tone={tone} className={className}>
      <input
        id={fieldId}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fieldId}-msg` : undefined}
        {...input}
      />
    </Shell>
  )
}

type TextAreaProps = ShellProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>

export function TextArea({ label, hint, error, tone, className, id, rows = 4, ...input }: TextAreaProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Shell id={fieldId} label={label} hint={hint} error={error} tone={tone} className={className}>
      <textarea
        id={fieldId}
        rows={rows}
        className={[styles.control, styles.textarea].join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fieldId}-msg` : undefined}
        {...input}
      />
    </Shell>
  )
}

type SelectFieldProps = ShellProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
    options: { value: string; label: string }[]
    placeholder?: string
  }

export function SelectField({ label, hint, error, tone, className, id, options, placeholder, ...select }: SelectFieldProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Shell id={fieldId} label={label} hint={hint} error={error} tone={tone} className={className}>
      <span className={styles.selectWrap}>
        <select
          id={fieldId}
          className={[styles.control, styles.select].join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${fieldId}-msg` : undefined}
          {...select}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.chevron} aria-hidden="true" strokeWidth={1.5} />
      </span>
    </Shell>
  )
}
