import { create } from '@storybook/theming/create'

export default create({
  base: 'light',
  // HTML title so the monogram and the name sit together in the sidebar.
  brandTitle:
    '<span style="display:flex;align-items:center;gap:12px;font-weight:640;line-height:1.1;font-stretch:125%">' +
    '<img src="/brand/storybook-brand.png" alt="" height="30" />' +
    '<span>Leeladhar<br/><span style="font-size:10px;letter-spacing:.14em;font-weight:500;opacity:.7">LAW CHAMBERS</span></span></span>',
  brandTarget: '_self',

  colorPrimary: '#1E223D',
  colorSecondary: '#A7300B',

  appBg: '#F6EEDF',
  appContentBg: '#FCF8F1',
  appPreviewBg: '#F6EEDF',
  appBorderColor: 'rgba(21, 33, 31, 0.12)',
  appBorderRadius: 10,

  textColor: '#1E223D',
  textMutedColor: '#52567A',
  textInverseColor: '#F6EEDF',

  barTextColor: '#43476A',
  barSelectedColor: '#A7300B',
  barHoverColor: '#A7300B',
  barBg: '#FCF8F1',

  inputBg: '#FCF8F1',
  inputBorder: '#D9C49E',
  inputTextColor: '#1E223D',
  inputBorderRadius: 10,

  fontBase: '"Archivo", ui-sans-serif, system-ui, sans-serif',
  fontCode: 'ui-monospace, "SF Mono", Menlo, monospace',
})
