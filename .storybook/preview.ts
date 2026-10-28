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
        { name: 'cream', value: '#F3F1ED' },
        { name: 'sunken', value: '#E9E5DD' },
        { name: 'chamber', value: '#17302F' },
        { name: 'mint', value: '#62E8B3' },
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
