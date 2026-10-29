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
      <PracticeExplorer headingLevel={3} />
      <div className={`container ${styles.foot}`}>
        <Button href="/practice-areas" variant="ghost" icon={<ArrowRight />}>
          View all practice areas
        </Button>
      </div>
    </section>
  )
}
