import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost' | 'ghost-dark' | 'link'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  variant?: Variant
  size?: Size
  /** Icon rendered in a round knob after the label. Reserve for the main action in a view. */
  icon?: ReactNode
  children: ReactNode
  className?: string
}

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = AsButton | AsLink

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, children, className, ...rest } = props
  const cls = [styles.button, styles[variant], styles[size], icon ? styles.withIcon : '', className]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {icon && (
        <span className={styles.knob} aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    )
  }

  return (
    <button className={cls} type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  )
}
