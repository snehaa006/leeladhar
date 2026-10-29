import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { CtaBanner } from '../components/CtaBanner'
import { PageBanner } from '../components/PageBanner'
import { PracticeExplorer } from '../components/PracticeExplorer'
import { Clients } from '../sections/Clients'
import { Hero } from '../sections/Hero'
import { LatestInsights } from '../sections/LatestInsights'
import { StatementBand } from '../sections/StatementBand'
import { Team } from '../sections/Team'
import { WhyUs } from '../sections/WhyUs'

const meta = {
  title: 'Patterns/Site sections',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full sections of the site, composed only from design-system components and tokens.',
      },
    },
  },
  // Sections link between pages, so they need a router around them.
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const HeroSection: Story = { name: 'Hero', render: () => <Hero /> }
export const PracticeExplorerSection: Story = { name: 'Practice explorer', render: () => <PracticeExplorer /> }
export const StatementSection: Story = { name: 'Statement band', render: () => <StatementBand /> }
export const WhyUsSection: Story = { name: 'Why us', render: () => <WhyUs /> }
export const TeamSection: Story = { name: 'Key individuals', render: () => <Team /> }
export const ClientsSection: Story = { name: 'Clients', render: () => <Clients /> }
export const InsightsSection: Story = { name: 'Latest insights', render: () => <LatestInsights /> }
export const PageBannerSection: Story = {
  name: 'Page banner',
  render: () => (
    <PageBanner title="Our practice areas" lead="The work we take on." crumbs={[{ label: 'Practice areas' }]} />
  ),
}
export const CtaSection: Story = { name: 'Call to action', render: () => <CtaBanner topic="criminal law" /> }
