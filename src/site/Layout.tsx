import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Disclaimer } from './Disclaimer'
import { Footer } from './sections/Footer'
import { Nav } from './sections/Nav'

/** Scroll to the top on a new page, or to the #section a link points at. */
function useScrollManager() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      // 'instant' overrides the smooth scrolling set on <html>: a new page should start at the top.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    // The target may render a frame or two after the route changes.
    let tries = 0
    let frame = 0
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ block: 'start' })
      else if (tries++ < 20) frame = requestAnimationFrame(seek)
    }
    seek()
    return () => cancelAnimationFrame(frame)
  }, [pathname, search, hash])
}

/**
 * Plain <a href="/…"> links (including design-system Buttons) navigate in-app
 * instead of reloading the page. Router <Link>s already handle themselves.
 */
function useInAppLinks() {
  const navigate = useNavigate()

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      e.preventDefault()
      navigate(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])
}

export function Layout() {
  useScrollManager()
  useInAppLinks()

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Disclaimer />
    </>
  )
}
