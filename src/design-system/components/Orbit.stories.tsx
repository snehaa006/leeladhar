import type { Meta, StoryObj } from '@storybook/react'
import { Orbit } from './Orbit'

const meta = {
  title: 'Components/Orbit',
  component: Orbit,
  args: {
    viewBox: '0 0 1440 860',
    tone: 'light',
    animate: true,
    rings: [
      { cx: -60, cy: 520, r: 620, nodes: [-33, 6], live: -33 },
      { cx: 1500, cy: 360, r: 560, nodes: [166, 204] },
    ],
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['light', 'dark'] },
  },
  decorators: [
    (Story, ctx) => (
      <div
        style={{
          width: 'min(100vw - 48px, 960px)',
          aspectRatio: '1440 / 860',
          borderRadius: 20,
          background: ctx.args.tone === 'dark' ? '#17302F' : '#F3F1ED',
          boxShadow: 'inset 0 0 0 1px rgba(21,33,31,.12)',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Thin orbital lines with nodes — the signature motif from the Legal Point conference screen. Rings are positioned in viewBox units; ' +
          'nodes are placed in degrees clockwise from 3 o’clock. Give one node per view the mint `live` state. Decorative only (aria-hidden). ' +
          'Rings draw in on mount; reduced-motion users see them static.',
      },
    },
  },
} satisfies Meta<typeof Orbit>

export default meta
type Story = StoryObj<typeof meta>

export const HeroRings: Story = {}

export const OnDark: Story = {
  args: {
    tone: 'dark',
    animate: false,
    viewBox: '0 0 1400 900',
    rings: [
      { cx: -200, cy: 980, r: 620, nodes: [-50, -28], live: -50 },
      { cx: 1480, cy: -60, r: 300 },
    ],
  },
}

export const SingleRing: Story = {
  args: {
    animate: false,
    viewBox: '0 0 1200 560',
    rings: [{ cx: 600, cy: 280, r: 220, nodes: [-30, 90, 210], live: -30 }],
  },
}
