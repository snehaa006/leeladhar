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

The client's palette: Gargoyle Gas, Space Cadet and Orange.

| Role | Token | Hex | Source |
| --- | --- | --- | --- |
| Background | `--sand-100` | `#F6EEDF` | A light tint of Gargoyle Gas |
| Bands, sunken surfaces | `--sand-200` | `#E6D5B7` | Gargoyle Gas |
| Primary | `--flame-400` | `#F54F1B` | Orange |
| Dark sections, text | `--cadet-900` / `--ink-900` | `#1E223D` | Space Cadet |

Orange is never used for small text on sand (3.0:1); use `--accent-text` (`#A7300B`, 5.9:1) there and
`--accent-on-dark` (`#FF7A4D`, 6.0:1) on Space Cadet. Text on an orange fill is `--text-on-accent` (`#14172B`, 5.1:1).

## Motion

- Add `data-reveal` (`up` by default, or `left`, `right`, `zoom`, `fade`) to fade an element in as it scrolls into
  view and back out as it leaves, in both directions; `data-reveal="stagger"` brings a list's children in one after
  another, and `--reveal-delay` offsets either. `useScrollReveal()` in the layout drives it. Nothing is hidden for
  visitors who ask for reduced motion.
- The client wall loops each row left to right, the courts strip runs as a ticker; both pause on hover.
- `CountUp` counts the home-page figures up as they come into view.

## Notes

- The team (Lakshay Bajaj, Priyanka Aggarwal), both chambers addresses, phone and email in `src/site/data.ts` are real.
  Client names, client stories and events are placeholders. The forms (contact, careers) are front end only and
  don't send anything yet.
- Practice-area and insight visuals are drawn from the house orbit motif (`PracticeArt`), not stock photography.
- The tagline “Decoding Law | Delivering Solutions” is part of the logo lockup (`<Logo tagline={false} />` hides it).
