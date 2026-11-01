import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PracticeArt } from '../components/PracticeArt'
import { ScrollText } from '../motion/ScrollText'
import { TypeOnView } from '../motion/TypeOnView'
import styles from './WhyUs.module.css'

const cards = [
  {
    id: 'why-us',
    title: 'Why us',
    body: 'One advocate leads your matter from the first call to the final order, in the trial court and the High Court alike. You always know whose number to dial.',
    icon: 'scale' as const,
  },
  {
    id: 'values',
    title: 'Our values',
    body: 'Plain words, honest odds, fees agreed upfront and a call after every hearing. We would rather tell you not to litigate than take a case we can’t help with.',
    icon: 'handshake' as const,
  },
]

/** "Why us" and "Our values" cards beside a heading, after the about block on duaassociates.com. */
export function WhyUs() {
  return (
    <section className={styles.section} aria-labelledby="why-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside} data-reveal="left">
          <h2 id="why-title" className="t-h1">
            Counsel you can{' '}
            <em>
              <TypeOnView text="reach" />
            </em>
          </h2>
          <ScrollText
            className={`t-lead ${styles.lead}`}
            text="A small chambers by design, so **the advocate you meet** is ==the advocate who argues your case==."
          />
        </div>
        <div className={styles.cards} data-reveal="stagger">
          {cards.map((c, i) => (
            <article key={c.id} className={styles.card} data-flip={i % 2 === 1 || undefined}>
              <PracticeArt icon={c.icon} index={i + 1} className={styles.art} />
              <div className={styles.body}>
                <h3 className={styles.title}>{c.title}</h3>
                <p>{c.body}</p>
                <Link to={`/about#${c.id}`} className={styles.more}>
                  Know more <ArrowRight aria-hidden="true" />
                  <span className="visually-hidden"> about {c.title.toLowerCase()}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
