import type { Meta, StoryObj } from '@storybook/react'
import { StatRings } from './StatRing'

const meta = {
  title: 'Components/StatRings',
  component: StatRings,
  args: {
    tone: 'light',
    stats: [
      { value: '22', suffix: '+', label: 'Years in practice' },
      { value: '3,400', suffix: '+', label: 'Matters closed' },
      { value: '9', label: 'Courts and tribunals we appear before' },
    ],
  },
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'dark'] } },
  parameters: {
    docs: {
      description: {
        component:
          'Overlapping outline rings, one figure each, joined by a node where they meet — after the Legal Point stats row. ' +
          'Figures are set in Bodoni Moda: numbers are evidence. Marked up as a description list.',
      },
    },
  },
} satisfies Meta<typeof StatRings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnDark: Story = {
  args: { tone: 'dark' },
  parameters: { backgrounds: { default: 'chamber' } },
}

export const TwoStats: Story = {
  args: {
    stats: [
      { value: '48', label: 'Hours to a strategy note' },
      { value: '1', label: 'Named contact per matter' },
    ],
  },
}
