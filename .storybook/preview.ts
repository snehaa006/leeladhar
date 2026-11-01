import type { Preview } from '@storybook/react'
import '../src/design-system/styles.css'
import './preview.css'
import theme from './theme'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#F6F1E9' },
        { name: 'sunken', value: '#ECE3D5' },
        { name: 'teal', value: '#234F4C' },
        { name: 'brick', value: '#C2401F' },
      ],
    },
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Tokens', ['Colour', 'Typography', 'Space & shape'], 'Components', 'Patterns'],
      },
    },
    docs: { theme },
  },
}

export default preview
