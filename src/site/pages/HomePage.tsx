import { CtaBanner } from '../components/CtaBanner'
import { Clients } from '../sections/Clients'
import { Firm } from '../sections/Firm'
import { Hero } from '../sections/Hero'
import { LatestInsights } from '../sections/LatestInsights'
import { PracticeSection } from '../sections/PracticeSection'
import { StatementBand } from '../sections/StatementBand'
import { Team } from '../sections/Team'
import { WhyUs } from '../sections/WhyUs'
import { usePageTitle } from '../usePageTitle'

// Only sections that appear on the legacylawoffices.com or duaassociates.com homepages.
export function HomePage() {
  usePageTitle()
  return (
    <>
      <Hero />
      <Firm />
      <PracticeSection />
      <StatementBand />
      <WhyUs />
      <Team />
      <Clients />
      <LatestInsights />
      <CtaBanner />
    </>
  )
}
