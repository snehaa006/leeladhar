# leeladhar

Design system and mock website for **Leeladhar Law Chambers** — React 18, TypeScript, Vite, Storybook 8.

```bash
npm install
npm run dev              # site on http://localhost:5173
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
public/team/                    Advocates' portraits
src/design-system/              Tokens, base styles and components (each with a .stories.tsx)
src/App.tsx                     Routes
src/site/Layout.tsx             Nav, footer, disclaimer; scroll-to-top and in-app links
src/site/pages/                 One component per route
src/site/sections/              Home-page sections (also used on inner pages)
src/site/components/            Shared pieces: page banner, practice explorer, CTA, cards
src/site/content/               Practice areas, insights and events (each item gets a page)
src/site/data.ts                Navigation, people, chambers, contact details, clients
vercel.json                     Sends every path to index.html so deep links work
```

## Pages

The tabs of legacylawoffices.com and duaassociates.com, merged:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` (`#why-us`, `#values`) | About us |
| `/practice-areas`, `/practice-areas/:slug` | Practice areas (Dua-style explorer) and one page per area |
| `/people`, `/people/:slug` | Our people and one profile per advocate |
| `/insights?category=…`, `/insights/:slug` | Insights with categories and search, and one page per article |
| `/events?category=…` | Events, CSR, pro bono and media |
| `/careers` | Careers and application form |
| `/contact` | Contact form, contact info and both chambers |
| `/locations/:slug` | Panipat and Chandigarh chambers |

To add a practice area, article or event, add an entry in `src/site/content/`; its page, menu entry and footer link follow.

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

- The team (Lakshay Bajaj, Priyanka Aggarwal), both chambers addresses, phone and email in `src/site/data.ts` are real.
  Client names, client stories and events are placeholders. The forms (contact, careers) are front end only and
  don't send anything yet.
- Practice-area and insight visuals are drawn from the house orbit motif (`PracticeArt`), not stock photography.
