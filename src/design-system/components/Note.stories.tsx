import type { Meta, StoryObj } from '@storybook/react'
import { Note } from './Note'

const meta = {
  title: 'Components/Note',
  component: Note,
  args: {
    title: 'Interim relief granted',
    meta: 'Delhi High Court, this morning',
    status: 'done',
    tone: 'light',
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['done', 'active', 'awaiting'] },
    tone: { control: 'inline-radio', options: ['light', 'dark'] },
    leading: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A floating matter note: one fact about a matter, with its state. Borrowed from the Mosey hero, where notes orbit the illustration. ' +
          'The status is announced to screen readers as well as shown by colour and icon.',
      },
    },
  },
} satisfies Meta<typeof Note>

export default meta
type Story = StoryObj<typeof meta>

export const Done: Story = {}

export const Active: Story = {
  args: { status: 'active', title: 'Strategy note sent', meta: 'Two days after the first call' },
}

export const Awaiting: Story = {
  args: { status: 'awaiting', title: 'FC-GPR filing with the RBI', meta: 'Due within 30 days of allotment' },
}

export const Dark: Story = {
  args: { tone: 'dark', status: 'awaiting', title: 'Next hearing on 4 December', meta: 'We’ll call you the same evening' },
  parameters: { backgrounds: { default: 'chamber' } },
}

export const WithPortrait: Story = {
  args: {
    title: 'Relocating to Mumbai',
    meta: 'Arjun Deshpande',
    leading: (
      <img
        src="https://images.unsplash.com/photo-1778692258270-bc0e80e975c0?auto=format&fit=crop&w=120&h=120&q=70"
        alt=""
      />
    ),
  },
}

export const MatterTimeline: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, background: '#17302F', borderRadius: 20 }}>
      <Note tone="dark" title="Title search complete" meta="30 years, clear" />
      <Note tone="dark" title="Family settlement drafted" meta="Shared with all heirs" />
      <Note tone="dark" status="active" title="Mediation, second session" meta="Thursday, 11:00" />
      <Note tone="dark" status="awaiting" title="Registration at sub-registrar" meta="After all heirs sign" />
    </div>
  ),
}
