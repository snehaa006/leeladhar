import { ArrowUpRight } from 'lucide-react'
import { Button, Orbit } from '../../design-system'
import { Particles } from '../motion/Particles'
import { ScrollText } from '../motion/ScrollText'
import { TypeOnView } from '../motion/TypeOnView'
import styles from './CtaBanner.module.css'

/** Closing call to action, after the "Need legal guidance on …?" band on legacylawoffices.com. */
export function CtaBanner({
  topic,
  title,
  body = 'Tell us what has happened. We will tell you where you stand, what your options are and what it is likely to cost.',
  href = '/contact',
  action = 'Get in touch',
}: {
  topic?: string
  title?: string
  body?: string
  href?: string
  action?: string
}) {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`} data-reveal="zoom">
        <Particles tone="dark" density={0.8} />
        <Orbit
          className={styles.orbit}
          tone="dark"
          animate={false}
          viewBox="0 0 1200 320"
          rings={[{ cx: 1100, cy: 360, r: 300, nodes: [200, 236], live: 200 }]}
        />
        <div className={styles.copy}>
          <h2 id="cta-title" className={styles.title}>
            {title ?? (
              <>
                Need legal{' '}
                <em>
                  <TypeOnView text="guidance" />
                </em>
                {topic ? ` on ${topic}?` : '?'}
              </>
            )}
          </h2>
          <ScrollText tone="dark" className={styles.body} text={body} />
        </div>
        <Button href={href} size="lg" icon={<ArrowUpRight />}>
          {action}
        </Button>
      </div>
    </section>
  )
}
