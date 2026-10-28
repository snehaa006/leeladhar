import type { Meta, StoryObj } from '@storybook/react'
import { Contact } from '../sections/Contact'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { Practice } from '../sections/Practice'
import { Process } from '../sections/Process'
import { Solutions } from '../sections/Solutions'
import { Team } from '../sections/Team'

const meta = {
  title: 'Patterns/Site sections',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full sections of the mock site, composed only from design-system components and tokens.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const HeroSection: Story = { name: 'Hero', render: () => <Hero /> }
export const SolutionsSection: Story = { name: 'Solutions', render: () => <Solutions /> }
export const PracticeSection: Story = { name: 'Practice areas', render: () => <Practice /> }
export const ProcessSection: Story = { name: 'Process', render: () => <Process /> }
export const TeamSection: Story = { name: 'Team', render: () => <Team /> }
export const FaqSection: Story = { name: 'FAQ', render: () => <Faq /> }
export const ContactSection: Story = { name: 'Contact', render: () => <Contact /> }
