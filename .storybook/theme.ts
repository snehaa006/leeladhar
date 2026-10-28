import { create } from '@storybook/theming/create'

export default create({
  base: 'light',
  // HTML title so the monogram and the name sit together in the sidebar.
  brandTitle:
    '<span style="display:flex;align-items:center;gap:12px;font-weight:640;line-height:1.1;font-stretch:125%">' +
    '<img src="/brand/storybook-brand.png" alt="" height="30" />' +
    '<span>Leeladhar<br/><span style="font-size:10px;letter-spacing:.14em;font-weight:500;opacity:.7">LAW CHAMBERS</span></span></span>',
  brandTarget: '_self',

  colorPrimary: '#15211F',
  colorSecondary: '#147050',

  appBg: '#F3F1ED',
  appContentBg: '#FAF9F6',
  appPreviewBg: '#F3F1ED',
  appBorderColor: 'rgba(21, 33, 31, 0.12)',
  appBorderRadius: 10,

  textColor: '#15211F',
  textMutedColor: '#626D69',
  textInverseColor: '#F3F1ED',

  barTextColor: '#4A5653',
  barSelectedColor: '#147050',
  barHoverColor: '#147050',
  barBg: '#FAF9F6',

  inputBg: '#FAF9F6',
  inputBorder: '#DAD5CA',
  inputTextColor: '#15211F',
  inputBorderRadius: 10,

  fontBase: '"Archivo", ui-sans-serif, system-ui, sans-serif',
  fontCode: 'ui-monospace, "SF Mono", Menlo, monospace',
})
