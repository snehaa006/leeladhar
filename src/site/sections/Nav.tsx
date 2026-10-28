import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Button, Logo } from '../../design-system'
import { navLinks } from '../data'
import styles from './Nav.module.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label="Leeladhar Law Chambers, home">
          <Logo size={34} />
        </a>

        <nav aria-label="Primary" className={styles.nav} id="primary-nav">
          <ul role="list" className={styles.links}>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <a href="/design-system" className={styles.dsLink}>
              Design system
            </a>
            <Button href="#contact" size="sm" icon={<ArrowUpRight />} onClick={() => setOpen(false)}>
              Book a consultation
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
