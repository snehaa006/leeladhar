// One requestAnimationFrame-throttled scroll loop for every scroll-linked effect:
// the word-by-word text reveal (--p), parallax (--py) and the page progress bar (--scroll).

export const motionAllowed = () =>
  typeof document !== 'undefined' && document.documentElement.dataset.motion !== undefined

const scrubbed = new Set<HTMLElement>()
const parallax = new Map<HTMLElement, number>()
let listening = false
let queued = false

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

function frame() {
  queued = false
  const vh = window.innerHeight
  const root = document.documentElement
  const max = root.scrollHeight - vh
  root.style.setProperty('--scroll', max > 0 ? (window.scrollY / max).toFixed(4) : '0')

  for (const el of scrubbed) {
    const r = el.getBoundingClientRect()
    if (r.bottom < -vh || r.top > vh * 2) continue
    // 0 as the block's top reaches 88% of the viewport, 1 once its foot is at 50%.
    const p = clamp((vh * 0.88 - r.top) / (vh * 0.38 + r.height))
    el.style.setProperty('--p', p.toFixed(4))
  }

  for (const [el, speed] of parallax) {
    const r = el.getBoundingClientRect()
    if (r.bottom < -vh || r.top > vh * 2) continue
    const offset = (r.top + r.height / 2 - vh / 2) * -speed
    el.style.setProperty('--py', offset.toFixed(1))
  }
}

function schedule() {
  if (queued) return
  queued = true
  requestAnimationFrame(frame)
}

function listen() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
}

/** Keep `--p` (0–1, how far the element has been read) up to date while it is near the viewport. */
export function trackScrub(el: HTMLElement) {
  scrubbed.add(el)
  listen()
  schedule()
  return () => {
    scrubbed.delete(el)
  }
}

/** Keep `--py` (px) up to date so the element drifts at `speed` against the scroll. */
export function trackParallax(el: HTMLElement, speed: number) {
  parallax.set(el, speed)
  listen()
  schedule()
  return () => {
    parallax.delete(el)
  }
}

/** Starts the loop for the page progress bar. */
export function trackPage() {
  listen()
  schedule()
}
