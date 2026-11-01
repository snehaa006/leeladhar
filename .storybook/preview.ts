import type { Preview } from '@storybook/react'
import '../src/design-system/styles.css'
import './preview.css'
import theme from './theme'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'sand',
      values: [
        { name: 'sand', value: '#F6EEDF' },
        { name: 'sunken', value: '#E6D5B7' },
        { name: 'cadet', value: '#1E223D' },
        { name: 'flame', value: '#F54F1B' },
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
