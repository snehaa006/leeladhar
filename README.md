# leeladhar

Design system and mock website for **Leeladhar Law Chambers** — React 18, TypeScript, Vite, Storybook 8.

```bash
npm install
npm run dev              # site on http://localhost:5173 (design system page at /design-system)
npm run storybook        # Storybook on http://localhost:6006
npm run tokens           # rebuild the token library after editing /tokens
npm run build            # type-check + production build of the site
npm run build-storybook  # static Storybook in storybook-static/
```

## Structure

```
tokens/                         Token source (W3C design-token JSON) — edit here
scripts/build-tokens.mjs        Builds the token library
public/brand/                   Monogram mask cut from the supplied logo, original artwork
src/design-system/
  tokens/                       Generated: tokens.css, tokens.ts, tokens.json (do not edit)
  base.css, styles.css          Element defaults and type roles (.t-display, .t-h1 …)
  components/                   11 components, each with a .stories.tsx
  docs/                         Storybook MDX: introduction, colour, typography, space
  utils/contrast.ts             WCAG contrast helpers
src/site/                       The mock website (sections, content in data.ts)
src/showcase/                   The /design-system page
```

## Palette

| Role | Token | Hex | Source |
| --- | --- | --- | --- |
| Background | `--cream-100` | `#F3F1ED` | Mosey compliance site background |
| Primary | `--mint-400` | `#62E8B3` | Stage-floor glow in the Legal Point conference photo |
| Dark sections | `--chamber-900` | `#17302F` | The conference screen teal |
| Monogram | `--patina-400` | `#78B4BC` | The supplied logo |
| Text | `--ink-900` | `#15211F` | Shadows of the conference photo |

Mint is never used for text on cream (1.4:1); use `--accent-text` (`#147050`, 5.4:1) instead.

## Notes

- Names, figures, addresses and phone numbers in `src/site/data.ts` are placeholders.
- Photos are hot-linked from Unsplash (free licence) and shown through the duotone `Portrait` component.
