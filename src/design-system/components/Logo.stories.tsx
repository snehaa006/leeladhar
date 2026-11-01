import type { Meta, StoryObj } from '@storybook/react'
import { Logo } from './Logo'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  args: { variant: 'lockup', tone: 'ink', size: 48 },
  argTypes: {
    variant: { control: 'inline-radio', options: ['lockup', 'mark'] },
    tone: { control: 'inline-radio', options: ['ink', 'brick', 'cream'] },
    size: { control: { type: 'range', min: 20, max: 160, step: 2 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Leeladhar monogram, cut as a luminance mask from the supplied artwork so any token colour can fill it. ' +
          'Use the lockup, with its tagline, in navigation and the footer; the mark alone from 24px up.',
      },
    },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Lockup: Story = {}

export const CreamOnTeal: Story = {
  args: { tone: 'cream' },
  parameters: { backgrounds: { default: 'teal' } },
}

export const Brick: Story = {
  args: { tone: 'brick' },
}

export const WithoutTagline: Story = {
  args: { tagline: false },
}

export const Mark: Story = {
  args: { variant: 'mark', size: 120 },
}

export const CreamMarkOnBrick: Story = {
  args: { variant: 'mark', size: 120, tone: 'cream' },
  parameters: { backgrounds: { default: 'brick' } },
}

export const BrickMark: Story = {
  args: { variant: 'mark', size: 120, tone: 'brick' },
}
