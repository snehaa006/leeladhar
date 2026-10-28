import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Accordion } from './Accordion'
import { Chip } from './Chip'

const faq = [
  {
    id: 'first',
    title: 'What happens in the first consultation?',
    content: 'We listen, ask about documents and dates, and tell you honestly whether you need a lawyer at all.',
  },
  {
    id: 'fees',
    title: 'How are fees decided?',
    content: 'Drafting and advisory work is a fixed fee. Litigation is billed per appearance.',
  },
  {
    id: 'partner',
    title: 'Will a partner handle my matter?',
    content: 'Yes. A partner leads every matter and appears for the important hearings.',
  },
]

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    items: faq,
    defaultOpen: 'first',
    tone: 'light',
    variant: 'cards',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['light', 'dark'] },
    variant: { control: 'inline-radio', options: ['cards', 'list'] },
    items: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100vw - 48px, 720px)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'One-open-at-a-time disclosure. `cards` is the FAQ treatment from Legal Point (the open card inverts to ink); ' +
          '`list` is the ruled, large-title practice list for dark sections.',
      },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Cards: Story = {}

export const PracticeList: Story = {
  args: {
    tone: 'dark',
    variant: 'list',
    defaultOpen: 'corporate',
    items: [
      {
        id: 'corporate',
        title: 'Corporate & commercial',
        aside: (
          <>
            <Chip tone="dark">Advisory</Chip>
            <Chip tone="dark">ROC</Chip>
          </>
        ),
        content: 'Company formation, investment and M&A documentation, and joint ventures.',
      },
      {
        id: 'insolvency',
        title: 'Insolvency & restructuring',
        aside: <Chip tone="dark">NCLT</Chip>,
        content: 'Corporate insolvency resolution and creditor claims under the IBC.',
      },
      {
        id: 'tax',
        title: 'Tax',
        aside: <Chip tone="dark">ITAT</Chip>,
        content: 'Direct and indirect tax disputes, GST notices and appeals.',
      },
    ],
  },
  parameters: { backgrounds: { default: 'chamber' } },
}

export const AllClosed: Story = {
  args: { defaultOpen: null },
}

export const OpensOneAtATime: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const fees = canvas.getByRole('button', { name: /How are fees decided/ })
    await userEvent.click(fees)
    await expect(fees).toHaveAttribute('aria-expanded', 'true')
    await expect(canvas.getByRole('button', { name: /first consultation/ })).toHaveAttribute('aria-expanded', 'false')
  },
}
