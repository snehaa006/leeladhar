import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { Button, Logo } from '../../design-system'
import { nav } from '../data'
import styles from './Nav.module.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  // A new page closes the menu, and drops focus so a hover/focus dropdown does not stay open.
  useEffect(() => {
    setOpen(false)
    setExpanded(null)
    if (document.activeElement instanceof HTMLElement && document.activeElement.closest('header')) {
      document.activeElement.blur()
    }
  }, [location.pathname, location.search, location.hash])

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.brand} aria-label="Leeladhar Law Chambers, home">
          <Logo size={34} />
        </Link>

        <nav aria-label="Primary" className={styles.nav} id="primary-nav">
          <ul role="list" className={styles.links}>
            {nav.map((item) => (
              <li key={item.to} className={styles.item} data-has-menu={item.children ? true : undefined}>
                <div className={styles.row}>
                  <NavLink to={item.to} end={item.to === '/'} className={styles.link}>
                    {item.label}
                    {item.children && <ChevronDown aria-hidden="true" className={styles.caret} />}
                  </NavLink>
                  {item.children && (
                    <button
                      type="button"
                      className={styles.expand}
                      aria-expanded={expanded === item.to}
                      aria-controls={`menu-${item.label}`}
                      onClick={() => setExpanded((v) => (v === item.to ? null : item.to))}
                    >
                      <ChevronDown aria-hidden="true" />
                      <span className="visually-hidden">{item.label} menu</span>
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    id={`menu-${item.label}`}
                    className={styles.menu}
                    data-wide={item.wide || undefined}
                    data-expanded={expanded === item.to || undefined}
                  >
                    <ul role="list">
                      {item.children.map((c) => (
                        <li key={c.to + c.label}>
                          <Link to={c.to}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button href="/contact" size="sm" icon={<ArrowUpRight />}>
              Contact Us
            </Button>
          </div>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>
    </header>
  )
}
