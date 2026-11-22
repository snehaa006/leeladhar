// GET /api/livelaw: the latest legal news from LiveLaw (https://www.livelaw.in), read from its public RSS feed.
//
// LiveLaw sends no CORS headers, so the browser can't read the feed itself. On Vercel this file runs as a
// serverless function; vite.config.ts mounts the same handler on the dev and preview servers.
// Only headlines, bylines, dates and links are passed on, and every item links back to its report on LiveLaw.
// The Insights pages read this through src/site/useLiveLaw.ts, which mirrors the types below.

import type { IncomingMessage, ServerResponse } from 'node:http'

const FEED_URL = 'https://www.livelaw.in/google_feeds.xml'
const ORIGIN = 'https://www.livelaw.in/'

export type LiveLawSection = 'supreme-court' | 'high-courts' | 'articles' | 'news'

export type LiveLawUpdate = {
  title: string
  url: string
  section: LiveLawSection
  /** Courts and subjects, as LiveLaw tags them, without its site-wide labels. */
  tags: string[]
  author?: string
  /** ISO timestamp */
  date: string
}

export type LiveLawFeed = { fetchedAt: string; items: LiveLawUpdate[] }

// Items in these categories are left out: vacancies, videos and podcasts, bare judgment listings
// (the story on the same judgment is usually in the feed too) and promotional posts.
const EXCLUDED = new Set(['job updates', 'videos', 'podcast', 'sc judgments', 'open news'])

// Site-wide labels that say nothing about the story itself.
const NOISE = new Set([
  'top stories',
  'mobile notification',
  'trending',
  'supreme court',
  'high court',
  'high courts',
  'all high courts',
  'news updates',
  'articles',
  'law schools',
  'law school articles',
  'minor acts',
  'events',
])

function sectionOf(categories: string[]): LiveLawSection {
  const has = (re: RegExp) => categories.some((c) => re.test(c))
  if (has(/^supreme court$/i)) return 'supreme-court'
  if (has(/high court/i)) return 'high-courts'
  if (has(/articles$/i)) return 'articles'
  return 'news'
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

/** Text of an element: CDATA unwrapped, entities decoded, any markup and extra spaces removed. */
function textOf(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))
  if (!match) return ''
  return match[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, name: string) => {
      if (name[0] === '#') {
        const code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10)
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity
      }
      return ENTITIES[name.toLowerCase()] ?? entity
    })
    .replace(/\s+/g, ' ')
    .trim()
}

/** "LIVELAW NEWS NETWORK" reads as "LiveLaw News Network". */
function byline(name: string): string | undefined {
  if (!name) return undefined
  if (name !== name.toUpperCase()) return name
  return name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bLivelaw\b/g, 'LiveLaw')
}

export function parseFeed(xml: string): LiveLawUpdate[] {
  const seen = new Set<string>()
  const items: LiveLawUpdate[] = []
  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const title = textOf(item, 'title')
    const url = textOf(item, 'link')
    const time = Date.parse(textOf(item, 'pubDate'))
    const categories = textOf(item, 'category')
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)

    // Only links to LiveLaw itself are passed on, since the page renders them as hrefs.
    if (!title || !url.startsWith(ORIGIN) || Number.isNaN(time) || seen.has(url)) continue
    if (categories.some((c) => EXCLUDED.has(c.toLowerCase()))) continue
    seen.add(url)

    items.push({
      title,
      url,
      section: sectionOf(categories),
      tags: categories.filter((c) => !NOISE.has(c.toLowerCase())),
      author: byline(textOf(item, 'dc:creator')),
      date: new Date(time).toISOString(),
    })
  }
  return items.sort((a, b) => b.date.localeCompare(a.date))
}

// A warm function instance keeps its last copy for a few minutes, and falls back to it if LiveLaw is down.
const FRESH_MS = 5 * 60_000
let cache: { feed: LiveLawFeed; at: number } | undefined

export async function getLiveLawFeed(): Promise<LiveLawFeed> {
  if (cache && Date.now() - cache.at < FRESH_MS) return cache.feed
  try {
    const res = await fetch(FEED_URL, {
      headers: { Accept: 'application/rss+xml, application/xml', 'User-Agent': 'Mozilla/5.0 (compatible; legal-updates-feed/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`LiveLaw answered ${res.status}`)
    const items = parseFeed(await res.text())
    if (items.length === 0) throw new Error('The LiveLaw feed had no usable items')
    cache = { feed: { fetchedAt: new Date().toISOString(), items }, at: Date.now() }
    return cache.feed
  } catch (error) {
    if (cache) return cache.feed
    throw error
  }
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  try {
    const feed = await getLiveLawFeed()
    res.statusCode = 200
    // Browsers keep it for 5 minutes and Vercel's CDN for 15, then the CDN serves the old copy while it refreshes.
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=900, stale-while-revalidate=86400')
    res.end(JSON.stringify(feed))
  } catch (error) {
    console.error('LiveLaw feed unavailable:', error)
    res.statusCode = 502
    res.setHeader('Cache-Control', 'no-store')
    res.end(JSON.stringify({ error: 'The LiveLaw feed is unavailable right now.' }))
  }
}
