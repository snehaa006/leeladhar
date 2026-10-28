import type { CSSProperties } from 'react'
import styles from './Orbit.module.css'

export type OrbitRing = {
  /** Centre in viewBox units (the viewBox is 1000 × 1000 unless overridden). */
  cx: number
  cy: number
  r: number
  /** Positions of nodes on the ring, in degrees clockwise from 3 o'clock. */
  nodes?: number[]
  /** Node that glows mint — the "live" point on the ring. */
  live?: number
}

type OrbitProps = {
  rings: OrbitRing[]
  viewBox?: string
  tone?: 'light' | 'dark'
  /** Draw the rings in on mount. Respects reduced motion. */
  animate?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Thin orbital lines with nodes — the signature motif of the conference screen,
 * read here as the swing of the scales' pans and the sweep of a court rotunda.
 * Purely decorative: hidden from assistive tech.
 */
export function Orbit({ rings, viewBox = '0 0 1000 1000', tone = 'light', animate = true, className, style }: OrbitProps) {
  return (
    <svg
      className={[styles.orbit, className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-animate={animate || undefined}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      {rings.map((ring, i) => (
        <g key={i} style={{ ['--i' as string]: i }}>
          <circle className={styles.ring} cx={ring.cx} cy={ring.cy} r={ring.r} pathLength={1} />
          {ring.nodes?.map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x = ring.cx + ring.r * Math.cos(rad)
            const y = ring.cy + ring.r * Math.sin(rad)
            const isLive = deg === ring.live
            return (
              <g key={deg} className={isLive ? styles.liveNode : styles.node}>
                {isLive && <circle cx={x} cy={y} r={14} className={styles.halo} />}
                <circle cx={x} cy={y} r={isLive ? 5.5 : 4.5} />
              </g>
            )
          })}
        </g>
      ))}
    </svg>
  )
}
