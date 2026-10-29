import {
  Banknote,
  Briefcase,
  Gavel,
  Handshake,
  House,
  Landmark,
  Map,
  Receipt,
  Scale,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Orbit } from '../../design-system'
import type { PracticeIcon } from '../content/practiceAreas'
import styles from './PracticeArt.module.css'

export const practiceIcons: Record<PracticeIcon, LucideIcon> = {
  scale: Scale,
  gavel: Gavel,
  cheque: Receipt,
  family: Users,
  home: House,
  scroll: ScrollText,
  shield: ShieldCheck,
  briefcase: Briefcase,
  landmark: Landmark,
  handshake: Handshake,
  bank: Banknote,
  map: Map,
}

// A few ring layouts, so neighbouring areas don't look identical.
const layouts = [
  [{ cx: 820, cy: 760, r: 520, nodes: [200, 236], live: 200 }, { cx: 1040, cy: 120, r: 260, nodes: [160] }],
  [{ cx: 1080, cy: 640, r: 600, nodes: [190, 214], live: 214 }, { cx: 640, cy: -60, r: 220, nodes: [70] }],
  [{ cx: 760, cy: -120, r: 560, nodes: [120, 150], live: 120 }, { cx: 1120, cy: 700, r: 300, nodes: [210] }],
]

/**
 * Artwork for a practice area: the house orbit motif and a large line icon on
 * a chamber gradient. Stands in for photography so every area has a visual.
 */
export function PracticeArt({
  icon,
  index,
  number,
  className,
}: {
  icon: PracticeIcon
  /** Picks the colourway and ring layout. */
  index: number
  /** Large numeral in the corner, for numbered practice-area listings. */
  number?: number
  className?: string
}) {
  const Icon = practiceIcons[icon]
  return (
    <div className={[styles.art, className].filter(Boolean).join(' ')} data-hue={index % 3} aria-hidden="true">
      <Orbit className={styles.orbit} tone="dark" animate={false} viewBox="0 0 1200 680" rings={layouts[index % 3]} />
      <Icon className={styles.icon} strokeWidth={0.6} />
      {number !== undefined && <span className={styles.number}>{String(number).padStart(2, '0')}</span>}
    </div>
  )
}
