import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Tabs } from './Tabs'

const items = [
  { id: 'founders', label: 'Founders & startups' },
  { id: 'businesses', label: 'Businesses' },
  { id: 'families', label: 'Families' },
  { id: 'nri', label: 'NRIs & overseas clients' },
]

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    items,
    value: 'founders',
    label: 'Who the solutions are for',
    tone: 'light',
    fill: false,
    onChange: () => {},
    children: () => null,
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['light', 'dark'] },
    children: { control: false },
    onChange: { control: false },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Underlined tabs, after the Mosey role switcher. Follows the WAI-ARIA tabs pattern: arrow keys move and select, Home and End jump to the ends. ' +
          'The panel is a render prop that receives the selected id.',
      },
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return (
      <Tabs {...args} value={value} onChange={setValue}>
        {(id) => (
          <p style={{ paddingTop: 24, color: args.tone === 'dark' ? '#A9BDB8' : '#4A5653' }}>
            Solutions for <strong>{items.find((i) => i.id === id)?.label}</strong>.
          </p>
        )}
      </Tabs>
    )
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  args: { fill: true },
}

export const OnDark: Story = {
  args: { tone: 'dark' },
  parameters: { backgrounds: { default: 'chamber' } },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const first = canvas.getByRole('tab', { name: 'Founders & startups' })
    first.focus()
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('tab', { name: 'Businesses' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.keyboard('{End}')
    await expect(canvas.getByRole('tab', { name: 'NRIs & overseas clients' })).toHaveFocus()
  },
}
