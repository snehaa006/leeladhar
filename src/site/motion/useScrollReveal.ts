import { useEffect } from 'react'
import { motionAllowed, trackPage, trackParallax } from './scroll'

const REVEAL = '[data-reveal]'
const PARALLAX = '[data-parallax]'

/**
 * Site-wide scroll motion, set up once in the layout:
 *
 * - `[data-reveal]` elements fade in as they scroll into view and back out as
 *   they leave it, in both directions (styles in design-system/base.css).
 * - `[data-parallax="0.08"]` elements drift against the scroll at that speed.
 * - The page progress bar follows the scroll position.
 *
 * A MutationObserver picks up elements added by route changes and tabs.
 * Nothing runs unless `html[data-motion]` is set (main.tsx sets it when the
 * visitor has not asked for reduced motion).
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    if (!motionAllowed()) return
    if (!('IntersectionObserver' in window)) {
      delete root.dataset.motion
      return
    }

    trackPage()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.toggleAttribute('data-shown', entry.isIntersecting)
      },
      // Elements switch a little inside the viewport edges, so they are seen arriving and leaving.
      { rootMargin: '-6% 0px -6% 0px', threshold: 0 },
    )

    const untrack = new Map<Element, () => void>()

    const add = (el: Element) => {
      if (el.matches(REVEAL)) io.observe(el)
      if (el.matches(PARALLAX) && el instanceof HTMLElement && !untrack.has(el)) {
        untrack.set(el, trackParallax(el, Number(el.dataset.parallax) || 0.08))
      }
    }
    const remove = (el: Element) => {
      if (el.matches(REVEAL)) io.unobserve(el)
      untrack.get(el)?.()
      untrack.delete(el)
    }
    const each = (node: Node, fn: (el: Element) => void) => {
      if (!(node instanceof Element)) return
      if (node.matches(`${REVEAL}, ${PARALLAX}`)) fn(node)
      node.querySelectorAll(`${REVEAL}, ${PARALLAX}`).forEach(fn)
    }

    each(document.body, add)

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => each(n, add))
        m.removedNodes.forEach((n) => each(n, remove))
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
      untrack.forEach((stop) => stop())
    }
  }, [])
}
