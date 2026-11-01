import type { Meta, StoryObj } from '@storybook/react'
import { Portrait } from './Portrait'

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=70`

const meta = {
  title: 'Components/Portrait',
  component: Portrait,
  args: {
    src: photo('photo-1742981365880-698cfb84492d'),
    alt: 'Portrait of Rajiv Malhotra',
    duotone: 'sand',
    aspect: '4/5',
    revealOnHover: false,
  },
  argTypes: {
    duotone: { control: 'inline-radio', options: ['sand', 'flame', 'none'] },
    aspect: { control: 'inline-radio', options: ['1/1', '4/5', '3/4', '16/10'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The house photographic treatment: a cadet-to-sand duotone (CSS blend modes, no image processing) so stock and studio portraits read as one set. ' +
          'The round name badge echoes the conference-screen portrait.',
      },
    },
  },
} satisfies Meta<typeof Portrait>

export default meta
type Story = StoryObj<typeof meta>

export const Duotone: Story = {}

export const WithBadge: Story = {
  args: { badge: 'Rajiv Malhotra' },
}

export const FlameDuotone: Story = {
  args: { duotone: 'flame', badge: 'Managing Partner' },
}

export const RevealOnHover: Story = {
  args: { revealOnHover: true, src: photo('photo-1637589267610-6c66fc2a086b'), alt: 'Portrait of Sana Qureshi' },
}

export const Original: Story = {
  args: { duotone: 'none' },
}
