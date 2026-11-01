import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { motionAllowed, trackScrub } from './scroll'
import styles from './ScrollText.module.css'

type Tone = 'teal' | 'brick'
type Part = { text: string; tone?: Tone }

// **words** are highlighted in teal, ==words== in brick.
const MARK = /(\*\*[^*]+\*\*|==[^=]+==)/

function parse(source: string): Part[] {
  return source
    .split(MARK)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith('**') ? { text: chunk.slice(2, -2), tone: 'teal' }
      : chunk.startsWith('==') ? { text: chunk.slice(2, -2), tone: 'brick' }
      : { text: chunk },
    )
}

/** The text without its highlight markers, for places that show it plainly. */
export const plainText = (source: string) => source.replace(/\*\*|==/g, '')

/**
 * Text that reads itself in as you scroll: every word starts faded and lights
 * up in turn as the block moves up the screen, then fades again as you scroll
 * back. Key phrases are set in teal or brick. Driven by one CSS variable, `--p`, set by the shared scroll loop.
 * With reduced motion the text is simply shown.
 */
export function ScrollText({
  text,
  as: Tag = 'p',
  tone = 'light',
  className,
  style,
}: {
  /** Mark highlights with **teal** or ==brick==. */
  text: string
  as?: ElementType
  /** `dark` for teal or brick grounds. */
  tone?: 'light' | 'dark'
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !motionAllowed()) return
    return trackScrub(el)
  }, [])

  const parts = parse(text)
  let index = 0
  const nodes: ReactNode[] = []

  parts.forEach((part, k) => {
    const words = part.text.split(/(\s+)/).map((w, j) => {
      if (!w || /^\s+$/.test(w)) return w
      return (
        <span key={j} className={styles.word} style={{ '--i': index++ } as CSSProperties}>
          {w}
        </span>
      )
    })
    nodes.push(
      part.tone ? (
        <mark key={k} className={styles.mark} data-tone={part.tone}>
          {words}
        </mark>
      ) : (
        <span key={k}>{words}</span>
      ),
    )
  })

  return (
    <Tag
      ref={ref}
      className={[styles.text, className].filter(Boolean).join(' ')}
      data-tone={tone}
      style={{ '--n': index, ...style } as CSSProperties}
    >
      {nodes}
    </Tag>
  )
}
