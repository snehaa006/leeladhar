# leeladhar

Design system and mock website for **Leeladhar Law Chambers** — React 18, TypeScript, Vite, Storybook 8.

```bash
npm install
npm run dev              # site on http://localhost:5173
npm run storybook        # Storybook on http://localhost:6006
npm run tokens           # rebuild the token library after editing /tokens
npm run build            # type-check + production build of the site
npm run build-storybook  # static Storybook in storybook-static/
npm run cf:dev           # build, then serve the site and API in the Cloudflare Workers runtime (wrangler dev)
npm run deploy           # build, upload dist/ to R2, deploy the Worker (needs CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
```

## Structure

```
api/livelaw.ts                  Vercel function: the latest LiveLaw headlines as JSON, for Insights
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
src/site/content/               Practice areas and events (each item gets a page); Insights categories
src/site/useLiveLaw.ts          Loads /api/livelaw once and shares it between pages
src/site/data.ts                Navigation, people, chambers, contact details, clients
vercel.json                     Sends every path but /api/* to index.html so deep links work
worker/index.ts                 Cloudflare Worker: answers /api/livelaw (edge-cached 15 min), serves the site from R2
wrangler.jsonc                  Cloudflare config: the Worker, its R2 bucket, custom domains
scripts/deploy-cloudflare.mjs   Uploads dist/ to the R2 bucket, then deploys the Worker
```

## Pages

The tabs of legacylawoffices.com and duaassociates.com, merged:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` (`#why-us`, `#values`) | About us |
| `/practice-areas`, `/practice-areas/:slug` | Practice areas (Dua-style explorer) and one page per area |
| `/people` | Both partners' full profiles on one page (`/people/:slug` redirects to `/people#slug`) |
| `/insights?category=…` | The latest LiveLaw headlines, with categories and search (old `/insights/:slug` links land here) |
| `/events?category=…` | Events, CSR, pro bono and media |
| `/careers` | Careers and application form |
| `/contact` | Contact form, contact info and both chambers |
| `/locations/:slug` | Panipat and Chandigarh chambers |
| `/credits` | Photo credits |

To add a practice area or event, add an entry in `src/site/content/`; its page, menu entry and footer link follow.

## Hosting on Cloudflare

Live at https://leeladharlawchambers.com and https://www.leeladharlawchambers.com, also at
https://leeladhar-law-chambers.snehagupta.workers.dev (Worker `leeladhar-law-chambers`). The domain is registered at
GoDaddy with its DNS on Cloudflare; the custom domains in `wrangler.jsonc` own its apex and `www` records.

- The built site lives in the R2 bucket `leeladhar-law-chambers-site`; the Worker serves it, sends paths without a file
  extension to `index.html` so deep links work, and caches Vite's fingerprinted `/assets/*` for a year.
- `/api/livelaw` runs the same code as the Vercel function (`getLiveLawFeed` in `api/livelaw.ts`), cached at the edge.
- Files removed from `dist/` stay in the bucket until deleted there; old fingerprinted assets are harmless.

## Insights: LiveLaw headlines

Insights shows the latest judgments and legal news from [LiveLaw](https://www.livelaw.in), not articles of our own.

- `api/livelaw.ts` reads LiveLaw's public RSS feed (`https://www.livelaw.in/google_feeds.xml`, its latest ~60 stories),
  drops job notices, videos, podcasts, bare judgment listings and promotional posts, sorts the rest into Supreme Court,
  High Courts, Articles and News, and returns JSON. Vercel's CDN caches it for 15 minutes and keeps serving the last
  copy while it refreshes. LiveLaw sends no CORS headers, which is why the browser can't read the feed directly.
- `npm run dev` and `npm run preview` serve the same handler at `/api/livelaw` (see `vite.config.ts`).
- Only headlines, bylines, dates and links are shown; every card opens the report on livelaw.in in a new tab. The
  card artwork is the site's own photographs, chosen by court or matching practice area (`practiceFor` in
  `src/site/content/insights.ts`), not LiveLaw's images.
- Practice-area pages show matching headlines under "In the news" when the feed has any.
- If the feed can't be reached, the pages say so and link to LiveLaw instead.

## Palette

Three colours from the client's references: cream, brick red and teal.

| Role | Token | Hex | Source |
| --- | --- | --- | --- |
| Background | `--cream-100` | `#F6F1E9` | The cream of the “Client wins” reference |
| Primary | `--brick-400` | `#C2401F` | The red of the “Client wins” reference |
| Emphasis, orbit lines | `--teal-400` | `#468A86` | The teal of the “Customers” reference |
| Dark sections | `--teal-900` | `#234F4C` | A deeper shade of that teal, so text on it stays legible |
| Text | `--ink-900` | `#1A2E2C` | Teal-black |

Brick on cream is 4.6:1, so it can be text; `--accent-text` (`#AD3719`, 5.6:1) is used for small text, and
`--accent-on-dark` (`#F8D3C6`, 6.6:1) on teal. Text on a brick fill is cream (4.9:1). The brand teal is 3.6:1 on
cream, so it is kept for large words (`--highlight`), lines and icons.

## Motion

Everything lives in `src/site/motion/` and switches off for visitors who ask for reduced motion.

- `ScrollText` reads a paragraph in word by word as it scrolls up the screen and fades it again on the way back;
  phrases marked `**teal**` or `==brick==` take their colour and a highlighter stroke once read.
- `TypeOnView` types a heading's emphasised words behind a caret each time they come into view; `Typewriter`
  rotates the practice areas in the hero.
- `Particles` drifts dots behind the hero and the dark bands; `CountUp` counts the home-page figures.
- Add `data-reveal` (`up` by default, or `left`, `right`, `zoom`, `fade`, `blur`, `wipe`) to fade an element in as
  it scrolls into view and out as it leaves, in both directions; `data-reveal="stagger"` brings a list's children in
  one after another, and `--reveal-delay` offsets either. `data-parallax="0.08"` makes an element drift against
  the scroll.
- The client wall runs edge to edge in three rows that alternate direction at slightly different speeds; the
  courts strip runs as a ticker; both pause on hover. A bar at the top of the window tracks reading progress.

## Notes

- The team (Lakshay Bajaj, Priyanka Aggarwal), both chambers addresses, phone and email in `src/site/data.ts` are real.
  Client names, client stories and events are placeholders. The forms (contact, careers) are front end only and
  don't send anything yet.
- Practice-area, insight and About visuals are freely licensed photographs from Wikimedia Commons, in
  `public/photos/`, shown under a teal wash with the house orbit motif (`PracticeArt`). Their authors and licences
  are in `src/site/content/photos.ts` and listed on `/credits`, as the CC BY and CC BY-SA licences require.
- The tagline “Decoding Law | Delivering Solutions” is part of the logo lockup (`<Logo tagline={false} />` hides it).
