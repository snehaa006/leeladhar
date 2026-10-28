import styles from './Logo.module.css'

type Tone = 'ink' | 'patina' | 'mint' | 'cream'

type LogoProps = {
  /** `mark` is the monogram alone; `lockup` adds the wordmark. */
  variant?: 'mark' | 'lockup'
  tone?: Tone
  /** Height of the monogram in px. */
  size?: number
  className?: string
}

// The monogram is a luminance mask cut from the supplied artwork, so any token
// colour can fill it without a second asset.
export function Logo({ variant = 'lockup', tone = 'ink', size = 40, className }: LogoProps) {
  const mark = (
    <span
      className={styles.mark}
      data-tone={tone}
      style={{ height: size, width: Math.round(size * 1.2245) }}
      aria-hidden={variant === 'lockup' ? true : undefined}
      role={variant === 'mark' ? 'img' : undefined}
      aria-label={variant === 'mark' ? 'Leeladhar Law Chambers' : undefined}
    />
  )

  if (variant === 'mark') return <span className={className}>{mark}</span>

  return (
    <span className={[styles.lockup, className].filter(Boolean).join(' ')} data-tone={tone} style={{ ['--logo-h' as string]: `${size}px` }}>
      {mark}
      <span className={styles.words}>
        <span className={styles.name}>Leeladhar</span>
        <span className={styles.sub}>Law Chambers</span>
      </span>
    </span>
  )
}
