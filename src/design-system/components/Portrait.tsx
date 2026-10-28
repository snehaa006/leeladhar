import type { CSSProperties } from 'react'
import styles from './Portrait.module.css'

type PortraitProps = {
  src: string
  alt: string
  /** Name shown in the round badge, after the conference-screen portrait. */
  badge?: string
  /** `cream` is the default photographic treatment; `mint` is for hero moments. */
  duotone?: 'cream' | 'mint' | 'none'
  /** Reveal natural colour on hover or when an ancestor link is focused. */
  revealOnHover?: boolean
  aspect?: '1/1' | '4/5' | '3/4' | '16/10'
  className?: string
  style?: CSSProperties
}

/**
 * A photograph in the house treatment: a chamber-to-cream duotone so mixed
 * stock and studio portraits sit together as one set.
 */
export function Portrait({
  src,
  alt,
  badge,
  duotone = 'cream',
  revealOnHover = false,
  aspect = '4/5',
  className,
  style,
}: PortraitProps) {
  return (
    <figure
      className={[styles.portrait, className].filter(Boolean).join(' ')}
      data-duotone={duotone}
      data-reveal={revealOnHover || undefined}
      style={{ aspectRatio: aspect, ...style }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {badge && (
        <figcaption className={styles.badge}>
          <span>{badge}</span>
        </figcaption>
      )}
    </figure>
  )
}
