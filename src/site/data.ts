import { practiceAreas } from './content/practiceAreas'
import { insightCategories } from './content/insights'
import { eventCategories } from './content/events'

// ── Navigation ────────────────────────────────────────────────
// The tabs of legacylawoffices.com and duaassociates.com, merged.

export type NavItem = { to: string; label: string; children?: { to: string; label: string }[]; wide?: boolean }

export const nav: NavItem[] = [
  { to: '/', label: 'Home' },
  {
    to: '/about',
    label: 'About Us',
    children: [
      { to: '/about', label: 'Our chambers' },
      { to: '/about#why-us', label: 'Why us' },
      { to: '/about#values', label: 'Our values' },
    ],
  },
  {
    to: '/practice-areas',
    label: 'Practice Areas',
    wide: true,
    children: [
      ...practiceAreas.map((p) => ({ to: `/practice-areas/${p.slug}`, label: p.title })),
      { to: '/practice-areas', label: 'View all practice areas' },
    ],
  },
  { to: '/people', label: 'Our People' },
  {
    to: '/insights',
    label: 'Insights',
    children: insightCategories.map((c) => ({ to: `/insights?category=${c.id}`, label: c.label })),
  },
  {
    to: '/events',
    label: 'Events',
    children: eventCategories.map((c) => ({ to: `/events?category=${c.id}`, label: c.label })),
  },
  { to: '/careers', label: 'Careers' },
]

export const forums = [
  'Punjab & Haryana High Court',
  'District & Sessions Court, Panipat',
  'Family Courts',
  'National Company Law Tribunal',
  'Debts Recovery Tribunal',
  'Consumer Commissions',
]

// ── People ────────────────────────────────────────────────────

export type Member = {
  slug: string
  name: string
  role: string
  office: OfficeSlug
  chambers: string
  photo: string
  overview: string[]
}

export const team: Member[] = [
  {
    slug: 'lakshay-bajaj',
    name: 'Lakshay Bajaj',
    role: 'Advocate',
    office: 'chandigarh',
    chambers: 'Punjab & Haryana High Court, Chandigarh',
    photo: '/team/lakshay-bajaj.jpg',
    overview: [
      'Lakshay Bajaj is an advocate with Leeladhar Law Chambers and practises before the Punjab & Haryana High Court at Chandigarh, from Bar Room No. 19.',
      'At the High Court, the chambers handles writ petitions, bail and quashing petitions, service matters and appeals from the courts at Panipat.',
    ],
  },
  {
    slug: 'priyanka-aggarwal',
    name: 'Priyanka Aggarwal',
    role: 'Advocate',
    office: 'panipat',
    chambers: 'District Court, Panipat',
    photo: '/team/priyanka-aggarwal.jpg',
    overview: [
      'Priyanka Aggarwal is an advocate with Leeladhar Law Chambers and practises before the District Court at Panipat, from Chamber No. 439.',
      'At Panipat, the chambers handles civil suits, criminal trials and bail, cheque dishonour cases, family and property matters, and consumer complaints.',
    ],
  },
]

export const memberBySlug = (slug: string | undefined) => team.find((m) => m.slug === slug)

// ── Clients ───────────────────────────────────────────────────
// Fictional names. Replace only with clients who have agreed to be named.

export type ClientMark = 'wide' | 'condensed' | 'serif' | 'serif-caps'

export const clients: { name: string; sector: string; mark: ClientMark }[] = [
  { name: 'Northwind Labs', sector: 'Fintech', mark: 'wide' },
  { name: 'Kaveri Looms', sector: 'Textiles', mark: 'serif' },
  { name: 'Tarang Mobility', sector: 'Electric vehicles', mark: 'condensed' },
  { name: 'Banyan Homes', sector: 'Real estate', mark: 'serif-caps' },
  { name: 'Saptarishi Foods', sector: 'Packaged foods', mark: 'condensed' },
  { name: 'Meridian Freight', sector: 'Logistics', mark: 'wide' },
  { name: 'Ankur Health', sector: 'Hospitals', mark: 'serif-caps' },
  { name: 'Deccan Agro', sector: 'Agriculture', mark: 'serif' },
]

export type ClientStory = {
  id: string
  quote: string
  who: string
  where: string
  matter: string
  outcome: string
}

// Anonymised on purpose: most clients of a chambers don't want to be named.
// Placeholder stories for the mock-up. Replace with real, consented feedback.
export const clientStories: ClientStory[] = [
  {
    id: 'founder',
    quote:
      'We had a term sheet on Friday and a board meeting on Monday. They read every clause over the weekend and told us which three were worth fighting for.',
    who: 'Founder, fintech startup',
    where: 'Bengaluru',
    matter: 'Seed round',
    outcome: 'Closed in 19 days',
  },
  {
    id: 'family',
    quote:
      'My brother and I hadn’t spoken in two years. The partition was settled in mediation, without a single court date.',
    who: 'Co-owner, ancestral property',
    where: 'Panipat',
    matter: 'Partition',
    outcome: 'Settled in mediation in 4 months',
  },
  {
    id: 'nri',
    quote: 'I was in Toronto the whole time. I got a call after every hearing, and the keys were couriered to my mother.',
    who: 'Landlord living abroad',
    where: 'Gurugram',
    matter: 'Tenant eviction',
    outcome: 'Possession recovered in 7 months',
  },
  {
    id: 'bail',
    quote:
      'It was past nine at night when my son was taken in. They picked up on the second ring, and the bail application was in court the next morning.',
    who: 'Parent of the accused',
    where: 'Panipat',
    matter: 'Regular bail',
    outcome: 'Bail granted at the first hearing',
  },
  {
    id: 'manufacturer',
    quote:
      'Our buyer had stopped paying three invoices. One firm notice and a commercial suit later, we were paid in full with interest.',
    who: 'Director, textile exporter',
    where: 'Panipat',
    matter: 'Recovery suit',
    outcome: 'Settled with interest in 5 months',
  },
  {
    id: 'appeal',
    quote:
      'The trial court order looked final to us. They explained exactly why it could be challenged, and the High Court agreed.',
    who: 'Landowner',
    where: 'Karnal',
    matter: 'Regular second appeal',
    outcome: 'Order set aside by the High Court',
  },
]

export const matterTypes = [
  ...practiceAreas.map((p) => ({ value: p.slug, label: p.title })),
  { value: 'other', label: 'Something else' },
]

// ── Chambers and contact ─────────────────────────────────────

export type OfficeSlug = 'panipat' | 'chandigarh'

export type Office = {
  slug: OfficeSlug
  city: string
  lines: string[]
  court: string
  intro: string
  practices: string[] // practice area slugs most often handled here
  /** Place name for map links and the embedded map. */
  mapQuery: string
}

export const offices: Office[] = [
  {
    slug: 'panipat',
    city: 'Panipat',
    lines: ['Chamber No. 439', 'District Court, Panipat'],
    court: 'District & Sessions Court',
    intro:
      'Our Panipat chambers sit in the District Court complex. From here we handle trial-court work across civil, criminal, family, property and consumer matters for individuals, families and the city’s businesses.',
    practices: ['civil-litigation', 'criminal-law', 'cheque-dishonour', 'family-matrimonial', 'property-real-estate', 'consumer-protection'],
    mapQuery: 'District Court, Panipat, Haryana',
  },
  {
    slug: 'chandigarh',
    city: 'Chandigarh',
    lines: ['Bar Room No. 19', 'Punjab & Haryana High Court, Chandigarh'],
    court: 'Punjab & Haryana High Court',
    intro:
      'Our Chandigarh chambers are at the Punjab & Haryana High Court. From here we handle writ petitions, bail and quashing, service matters and appeals, as well as matters before the tribunals in Chandigarh.',
    practices: ['writs-constitutional', 'criminal-law', 'service-matters', 'civil-litigation', 'banking-recovery-insolvency', 'land-revenue'],
    mapQuery: 'Punjab and Haryana High Court, Sector 1, Chandigarh',
  },
]

export const officeBySlug = (slug: string | undefined) => offices.find((o) => o.slug === slug)

export const contact = {
  phone: '+91 90699 10000',
  email: 'leeladharlawchambers@gmail.com',
  hours: 'Monday to Saturday, 10:00–18:00',
}

export const mapLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
export const mapEmbed = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`

export const tel = (phone: string) => `tel:${phone.replace(/\s/g, '')}`
