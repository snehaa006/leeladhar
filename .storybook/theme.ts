import { create } from '@storybook/theming/create'

export default create({
  base: 'light',
  // HTML title so the monogram and the name sit together in the sidebar.
  brandTitle:
    '<span style="display:flex;align-items:center;gap:12px;font-weight:640;line-height:1.1;font-stretch:125%">' +
    '<img src="/brand/storybook-brand.png" alt="" height="30" />' +
    '<span>Leeladhar<br/><span style="font-size:10px;letter-spacing:.14em;font-weight:500;opacity:.7">LAW CHAMBERS</span></span></span>',
  brandTarget: '_self',

  colorPrimary: '#1A2E2C',
  colorSecondary: '#AD3719',

  appBg: '#F6F1E9',
  appContentBg: '#FBF8F3',
  appPreviewBg: '#F6F1E9',
  appBorderColor: 'rgba(21, 33, 31, 0.12)',
  appBorderRadius: 10,

  textColor: '#1A2E2C',
  textMutedColor: '#586967',
  textInverseColor: '#F6F1E9',

  barTextColor: '#3D4F4D',
  barSelectedColor: '#AD3719',
  barHoverColor: '#AD3719',
  barBg: '#FBF8F3',

  inputBg: '#FBF8F3',
  inputBorder: '#DDD0BC',
  inputTextColor: '#1A2E2C',
  inputBorderRadius: 10,

  fontBase: '"Archivo", ui-sans-serif, system-ui, sans-serif',
  fontCode: 'ui-monospace, "SF Mono", Menlo, monospace',
})
