import { useEffect } from 'react'

const SELECTOR = '[data-reveal]'

/**
 * Fades `[data-reveal]` elements in as they scroll into view and back out as
 * they leave it, in both directions. One observer serves the whole app; a
 * MutationObserver picks up elements added by route changes and tabs.
 *
 * The hidden starting state only applies under `html[data-motion]`, which
 * main.tsx sets when the visitor has not asked for reduced motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    if (!('dataset' in root) || root.dataset.motion === undefined) return
    if (!('IntersectionObserver' in window)) {
      delete root.dataset.motion
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.toggleAttribute('data-shown', entry.isIntersecting)
      },
      // Elements switch a little inside the viewport edges, so they are seen arriving and leaving.
      { rootMargin: '-6% 0px -6% 0px', threshold: 0 },
    )

    const each = (node: Node, fn: (el: Element) => void) => {
      if (!(node instanceof Element)) return
      if (node.matches(SELECTOR)) fn(node)
      node.querySelectorAll(SELECTOR).forEach(fn)
    }

    document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el))

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => each(n, (el) => io.observe(el)))
        m.removedNodes.forEach((n) => each(n, (el) => io.unobserve(el)))
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])
}
