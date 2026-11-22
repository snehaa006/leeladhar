// Insights: the latest judgments and legal news from LiveLaw (https://www.livelaw.in), served by
// /api/livelaw (api/livelaw.ts) and loaded with useLiveLaw(). Headlines link out to the reports on
// LiveLaw; nothing is republished here.

import { photos, type Photo } from './photos'
import type { PracticeIcon } from './practiceAreas'

export const LIVELAW_URL = 'https://www.livelaw.in'

export type InsightCategory = 'supreme-court' | 'high-courts' | 'articles' | 'news'

export const insightCategories: { id: InsightCategory; label: string }[] = [
  { id: 'supreme-court', label: 'Supreme Court' },
  { id: 'high-courts', label: 'High Courts' },
  { id: 'articles', label: 'Articles' },
  { id: 'news', label: 'News' },
]

/** One headline, in the shape api/livelaw.ts sends (`LiveLawUpdate`). */
export type Insight = {
  title: string
  url: string
  section: InsightCategory
  /** Courts and subjects, as LiveLaw tags them. */
  tags: string[]
  author?: string
  /** ISO timestamp */
  date: string
}

export const categoryLabel = (id: InsightCategory) => insightCategories.find((c) => c.id === id)?.label ?? 'News'

// ── Practice areas ────────────────────────────────────────────
// Which of our practice areas a headline is about, from LiveLaw's own tags and a few unambiguous words in
// the title. The first rule that matches wins, so narrower areas come before the broad ones they overlap.
const practiceRules: [slug: string, pattern: RegExp][] = [
  ['cheque-dishonour', /\bcheques?\b|negotiable instruments|section 138\b|\bNI Act\b/i],
  ['family-matrimonial', /family law|matrimonial|\bdivorce|\bcustody\b|\balimony\b|\bdowry\b|domestic violence/i],
  ['banking-recovery-insolvency', /insolvency|\bIBC\b|\bSARFAESI\b|\bDRT\b|\bNCLT\b|\bNCLAT\b|debts? recovery/i],
  ['consumer-protection', /\bconsumer\b|\bNCDRC\b/i],
  ['wills-succession', /succession|probate|inheritance|legal heirs?\b|testament/i],
  ['land-revenue', /land acquisition|revenue records?|\bmutation\b|jamabandi/i],
  ['property-real-estate', /\bRERA\b|homebuyers?|\btenants?\b|\blandlords?\b|\bflats?\b|(?<!intellectual )\bproperty\b/i],
  ['service-matters', /labour & service|service law|\bpension\b|reinstatement|\brecruitment\b/i],
  ['commercial-suits-arbitration', /\barbitra|commercial courts?|^corporate$/i],
  ['criminal-law', /criminal law|\bBNSS?\b|\bIPC\b|\bCrPC\b|\bbail\b|\bFIRs?\b|\bPOCSO\b|\bPMLA\b|\bNDPS\b/i],
  ['writs-constitutional', /constitutional law|article 226|fundamental rights?|\bwrit\b/i],
]

/** The practice-area slug a headline matches, if any. */
export function practiceFor(insight: Insight): string | undefined {
  const fields = [...insight.tags, insight.title]
  return practiceRules.find(([, pattern]) => fields.some((f) => pattern.test(f)))?.[0]
}

// ── Artwork ───────────────────────────────────────────────────
// Cards use the site's own licensed photographs, not LiveLaw's images: the matching practice area's photo,
// or else one from a small set for the court or section, taken in turn so neighbouring cards differ.
const sectionArt: Record<InsightCategory, { icon: PracticeIcon; photos: Photo[] }> = {
  'supreme-court': { icon: 'landmark', photos: [photos.ladyJustice, photos.justiceStatue, photos.scales] },
  'high-courts': { icon: 'gavel', photos: [photos.courtroomOld, photos.courtroom, photos.gavel] },
  articles: { icon: 'scroll', photos: [photos.lawLibrary, photos.lawReports] },
  news: { icon: 'scale', photos: [photos.lawReports, photos.scales, photos.constitution] },
}

/** `index` is the card's place in its list. */
export function sectionArtFor(insight: Insight, index: number): { icon: PracticeIcon; photo: Photo } {
  const art = sectionArt[insight.section] ?? sectionArt.news
  return { icon: art.icon, photo: art.photos[index % art.photos.length] }
}

// ── Dates ─────────────────────────────────────────────────────
const relative = new Intl.RelativeTimeFormat('en-IN', { numeric: 'auto' })

/** "5 minutes ago", "3 hours ago", then "21 November 2026". */
export function formatWhen(iso: string, now = Date.now()) {
  const minutes = Math.round((now - Date.parse(iso)) / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return relative.format(-minutes, 'minute')
  if (minutes < 24 * 60) return relative.format(-Math.round(minutes / 60), 'hour')
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
}
