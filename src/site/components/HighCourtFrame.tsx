import { ArrowUpRight, FileSearch, Landmark, ListOrdered, Lock, ScrollText } from 'lucide-react'
import { photos } from '../content/photos'
import { highCourts, type HighCourt } from '../data'
import styles from './HighCourtFrame.module.css'

const shortcuts = [
  { label: 'Case status', icon: FileSearch },
  { label: 'Cause lists', icon: ListOrdered },
  { label: 'Orders & judgments', icon: ScrollText },
]

/**
 * A browser-window frame around a High Court's website. The court's site
 * cannot be embedded, so the whole frame is one link that opens it in a new tab.
 */
export function HighCourtFrame({ court, className }: { court: HighCourt; className?: string }) {
  return (
    <a
      href={court.url}
      target="_blank"
      rel="noopener noreferrer"
      className={[styles.frame, className].filter(Boolean).join(' ')}
    >
      <span className={styles.chrome} aria-hidden="true">
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.address}>
          <Lock />
          {court.host}
        </span>
      </span>

      <span className={styles.screen}>
        <img
          className={styles.shot}
          src={photos.courtroom.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: photos.courtroom.position }}
          data-parallax="0.05"
        />
        <span className={styles.crest} aria-hidden="true">
          <Landmark />
        </span>
        <span className={styles.copy}>
          <span className={styles.kicker}>Official website</span>
          <span className={styles.title}>{court.name}</span>
          <span className={styles.lead}>Check your case status, the day’s cause list and orders, straight from the court.</span>
        </span>
        <span className={styles.shortcuts} aria-hidden="true">
          {shortcuts.map(({ label, icon: Icon }) => (
            <span key={label}>
              <Icon />
              {label}
            </span>
          ))}
        </span>
        <span className={styles.open}>
          Open website
          <ArrowUpRight aria-hidden="true" />
          <span className="visually-hidden">(opens in a new tab)</span>
        </span>
      </span>
    </a>
  )
}

/** Every High Court website the chambers links to, side by side. */
export function HighCourtLinks({ className }: { className?: string }) {
  return (
    <div className={[styles.pair, className].filter(Boolean).join(' ')}>
      {highCourts.map((c) => (
        <HighCourtFrame key={c.url} court={c} />
      ))}
    </div>
  )
}
