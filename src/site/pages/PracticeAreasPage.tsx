import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { CtaBanner } from '../components/CtaBanner'
import { PageBanner } from '../components/PageBanner'
import { PracticeArt } from '../components/PracticeArt'
import { PracticeExplorer } from '../components/PracticeExplorer'
import { SectionHead } from '../components/SectionHead'
import { practiceAreas } from '../content/practiceAreas'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './PracticeAreasPage.module.css'

export function PracticeAreasPage() {
  usePageTitle('Practice areas')
  return (
    <>
      <PageBanner
        title="Our practice areas"
        lead="The work we take on for clients across India, in the trial courts, tribunals and the Punjab & Haryana High Court. Choose an area to see what it covers."
        crumbs={[{ label: 'Practice areas' }]}
      />

      <section className={`${page.section} ${page.sunken}`} aria-label="Explore practice areas">
        <PracticeExplorer headingLevel={2} />
      </section>

      <section className={page.section} aria-labelledby="all-areas">
        <div className="container">
          <SectionHead id="all-areas" title="Every practice area at a glance" />
          <ul role="list" className={styles.grid}>
            {practiceAreas.map((p, i) => (
              <li key={p.slug}>
                <article className={styles.card}>
                  <div className={styles.thumb}>
                    <PracticeArt icon={p.icon} index={i} number={i + 1} className={styles.art} />
                    <span className={styles.arrow} aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.title}>
                      <Link to={`/practice-areas/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p>{p.summary}</p>
                    <span className={styles.more} aria-hidden="true">
                      Learn more →
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
