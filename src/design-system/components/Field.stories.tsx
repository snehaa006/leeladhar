import type { Meta, StoryObj } from '@storybook/react'
import { SelectField, TextArea, TextField } from './Field'

const meta = {
  title: 'Components/Field',
  component: TextField,
  args: {
    label: 'Your name',
    placeholder: 'Full name',
    tone: 'light',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['light', 'dark'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100vw - 48px, 380px)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Labelled form controls: `TextField`, `TextArea` and `SelectField`. Hints and errors are tied to the control with `aria-describedby`; ' +
          'errors set `aria-invalid` and say how to fix the problem.',
      },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}

export const WithHint: Story = {
  args: { label: 'Phone or WhatsApp', hint: 'We call from a Delhi landline.', placeholder: undefined, type: 'tel' },
}

export const WithError: Story = {
  args: {
    label: 'Phone or WhatsApp',
    defaultValue: '98100',
    error: 'Enter a phone number with at least 10 digits.',
  },
}

export const OnDark: Story = {
  args: { tone: 'dark', hint: 'We’ll only use this to call you back.' },
  parameters: { backgrounds: { default: 'chamber' } },
}

export const Select: Story = {
  render: (args) => (
    <SelectField
      tone={args.tone}
      label="What is it about?"
      placeholder="Choose one"
      defaultValue=""
      options={[
        { value: 'corporate', label: 'Business or startup' },
        { value: 'dispute', label: 'A dispute or court case' },
        { value: 'property', label: 'Property' },
      ]}
    />
  ),
}

export const Multiline: Story = {
  render: (args) => (
    <TextArea
      tone={args.tone}
      label="A few lines about the matter"
      hint="Optional. Don’t include anything you wouldn’t want in an email."
    />
  ),
}
