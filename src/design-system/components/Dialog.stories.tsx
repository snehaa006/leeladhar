import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Dialog } from './Dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    open: false,
    title: 'Before you continue',
    children: null,
    actions: null,
  },
  argTypes: {
    children: { control: false },
    actions: { control: false },
    onClose: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Modal on the native `<dialog>` element: the browser handles focus trapping, the top layer and Escape. ' +
          'Omit `onClose` to require an explicit choice, as the Bar Council disclaimer does.',
      },
    },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          actions={
            <>
              <Button onClick={() => setOpen(false)}>I agree</Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Leave this site
              </Button>
            </>
          }
        >
          <p>The Bar Council of India does not permit advocates to advertise or solicit work.</p>
          <p>
            By choosing “I agree”, you confirm you are looking for information about Leeladhar Law Chambers on your own
            initiative.
          </p>
        </Dialog>
      </>
    )
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const BarCouncilDisclaimer: Story = {}

export const OpenOnLoad: Story = {
  args: { open: true },
  parameters: { docs: { story: { inline: false, iframeHeight: 420 } } },
}
