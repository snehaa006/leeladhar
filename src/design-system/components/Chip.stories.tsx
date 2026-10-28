import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip, FilterChip } from './Chip'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: 'Supreme Court', tone: 'light' },
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'dark'] } },
  parameters: {
    docs: {
      description: {
        component: 'Static tags for forums, practice areas and languages. `FilterChip` is the pressable version for filtering lists.',
      },
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnDark: Story = {
  args: { tone: 'dark', children: 'NCLT' },
  parameters: { backgrounds: { default: 'chamber' } },
}

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      <Chip>English</Chip>
      <Chip>Hindi</Chip>
      <Chip>Marathi</Chip>
    </div>
  ),
}

const filters = [
  { id: 'all', label: 'Everyone', count: 5 },
  { id: 'corporate', label: 'Corporate', count: 1 },
  { id: 'family', label: 'Family & property', count: 2 },
  { id: 'criminal', label: 'Criminal', count: 1 },
]

export const Filters: Story = {
  render: function Render() {
    const [selected, setSelected] = useState('all')
    return (
      <div role="group" aria-label="Filter by practice" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <FilterChip key={f.id} selected={selected === f.id} count={f.count} onClick={() => setSelected(f.id)}>
            {f.label}
          </FilterChip>
        ))}
      </div>
    )
  },
}
