import { Accordion, Button } from '../../design-system'
import { faqs } from '../data'
import styles from './Faq.module.css'

export function Faq() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside}>
          <h2 id="faq-title" className="t-h1">
            Before you call
          </h2>
          <p className={`t-lead ${styles.lead}`}>The questions people most often ask us in the first five minutes.</p>
          <Button href="#contact" variant="ghost" className={styles.more}>
            Ask something else
          </Button>
        </div>
        <Accordion
          className={styles.list}
          defaultOpen={faqs[0].id}
          items={faqs.map((f) => ({ id: f.id, title: f.q, content: <p>{f.a}</p> }))}
        />
      </div>
    </section>
  )
}
