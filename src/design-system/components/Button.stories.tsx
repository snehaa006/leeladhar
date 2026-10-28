import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ArrowUpRight } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Book a consultation',
    variant: 'primary',
    size: 'md',
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'ghost-dark', 'link'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Pill buttons. **Primary** (mint) is the one action you most want taken in a view — use it once per screen. ' +
          'The round icon knob is reserved for that main action.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { icon: <ArrowUpRight /> },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Talk to us about this', icon: <ArrowUpRight /> },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Find your solution' },
}

export const GhostOnDark: Story = {
  args: { variant: 'ghost-dark', children: 'Send another request' },
  parameters: { backgrounds: { default: 'chamber' } },
}

export const Link: Story = {
  args: { variant: 'link', children: 'Read the strategy note' },
}

export const AsAnchor: Story = {
  args: { href: '#contact', children: 'Book a consultation', icon: <ArrowUpRight /> },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button icon={<ArrowUpRight />}>Primary</Button>
      <Button variant="secondary" icon={<ArrowUpRight />}>
        Secondary
      </Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}
