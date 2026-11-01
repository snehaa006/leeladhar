import { ArrowRight } from 'lucide-react'
import { Button } from '../../design-system'
import { PracticeExplorer } from '../components/PracticeExplorer'
import { SectionHead } from '../components/SectionHead'
import styles from './PracticeSection.module.css'

export function PracticeSection() {
  return (
    <section id="practice" className={styles.section} aria-labelledby="practice-title">
      <div className="container">
        <SectionHead id="practice-title" title="Practice areas" />
      </div>
      <div data-reveal style={{ ['--reveal-delay' as string]: '120ms' }}>
        <PracticeExplorer headingLevel={3} />
      </div>
      <div className={`container ${styles.foot}`} data-reveal>
        <Button href="/practice-areas" variant="ghost" icon={<ArrowRight />}>
          View all practice areas
        </Button>
      </div>
    </section>
  )
}
