import {
  Banknote,
  Briefcase,
  FilePenLine,
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
import type { Photo } from '../content/photos'
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
  contract: FilePenLine,
}

// A few ring layouts, so neighbouring areas don't look identical.
const layouts = [
  [{ cx: 820, cy: 760, r: 520, nodes: [200, 236], live: 200 }, { cx: 1040, cy: 120, r: 260, nodes: [160] }],
  [{ cx: 1080, cy: 640, r: 600, nodes: [190, 214], live: 214 }, { cx: 640, cy: -60, r: 220, nodes: [70] }],
  [{ cx: 760, cy: -120, r: 560, nodes: [120, 150], live: 120 }, { cx: 1120, cy: 700, r: 300, nodes: [210] }],
]

/**
 * Artwork for a practice area: a photograph under a deep teal wash, with the
 * house orbit motif over it. Without a photo, a large line icon stands in.
 */
export function PracticeArt({
  icon,
  index,
  number,
  photo,
  className,
}: {
  icon: PracticeIcon
  /** Picks the colourway and ring layout. */
  index: number
  /** Large numeral in the corner, for numbered practice-area listings. */
  number?: number
  photo?: Photo
  className?: string
}) {
  const Icon = practiceIcons[icon]
  return (
    <div
      className={[styles.art, className].filter(Boolean).join(' ')}
      data-hue={index % 3}
      data-photo={photo ? true : undefined}
      aria-hidden="true"
    >
      {photo && (
        <img
          className={styles.photo}
          src={photo.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: photo.position }}
          data-parallax="0.06"
        />
      )}
      <Orbit className={styles.orbit} tone="dark" animate={false} viewBox="0 0 1200 680" rings={layouts[index % 3]} />
      {!photo && <Icon className={styles.icon} strokeWidth={0.6} data-parallax="0.07" />}
      {number !== undefined && <span className={styles.number}>{String(number).padStart(2, '0')}</span>}
    </div>
  )
}
