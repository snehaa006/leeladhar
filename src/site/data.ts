import { practiceAreas } from './content/practiceAreas'
import { insightCategories } from './content/insights'

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
      { to: '/about#story', label: 'Our story' },
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
  { to: '/careers', label: 'Careers' },
]

export const forums = [
  'Punjab & Haryana High Court',
  'Commercial Courts',
  'MSME Facilitation Councils',
  'District & Sessions Courts',
  'National Company Law Tribunal',
  'Debts Recovery Tribunal',
  'Consumer Commissions',
]

// ── The firm ──────────────────────────────────────────────────

export const practisingSince = 2011
/** Whole years since the partners started practice, so the figure never goes stale. */
export const yearsOfExperience = () => new Date().getFullYear() - practisingSince

export const phhc = {
  name: 'Punjab & Haryana High Court',
  url: 'https://new.phhc.gov.in',
  host: 'new.phhc.gov.in',
}

// ── People ────────────────────────────────────────────────────

export type Member = {
  slug: string
  name: string
  role: string
  office: OfficeSlug
  photo: string
  overview: string[]
}

export const team: Member[] = [
  {
    slug: 'lakshay-bajaj',
    name: 'Lakshay Bajaj',
    role: 'Partner',
    office: 'chandigarh',
    photo: '/team/lakshay-bajaj.jpg',
    overview: [
      'Lakshay Bajaj is a partner at Leeladhar Law Chambers and works from the chambers in Chandigarh, at Bar Room No. 19 of the Punjab & Haryana High Court.',
      'The work spans commercial suits, MSME recovery, writ petitions, bail and quashing, and appeals, for clients from across India.',
    ],
  },
  {
    slug: 'priyanka-aggarwal',
    name: 'Priyanka Aggarwal',
    role: 'Partner',
    office: 'panipat',
    photo: '/team/priyanka-aggarwal.jpg',
    overview: [
      'Priyanka Aggarwal is a partner at Leeladhar Law Chambers and works from the chambers in Panipat, at Chamber No. 439 of the District Court.',
      'The work spans commercial suits, MSME recovery, cheque dishonour, civil and criminal trials, and family and property matters, for clients from across India.',
    ],
  },
]

export const memberBySlug = (slug: string | undefined) => team.find((m) => m.slug === slug)

// ── Clients ───────────────────────────────────────────────────

const clientList: { name: string; place: string }[] = [
  { name: 'Indo Flex Pvt. Ltd.', place: 'Maharashtra' },
  { name: 'Vetvista Pvt. Ltd.', place: 'Bangalore' },
  { name: 'Unnat Biotech', place: 'Haryana' },
  { name: 'Krishna Marketing', place: 'Haryana' },
  { name: 'Karp Traders', place: 'Haryana' },
  { name: 'Jain Packers', place: 'Haryana' },
  { name: 'Shree Shyam Enterprises', place: 'Haryana' },
  { name: 'Virsa Fashion', place: 'Haryana' },
  { name: 'Sadashiv Pumps & Lubricants', place: 'Haryana' },
  { name: 'Sahil International Pvt. Ltd.', place: 'Haryana' },
  { name: 'Nile Overseas', place: 'Haryana' },
  { name: 'DRJ Chemicals Ltd.', place: 'Haryana' },
  { name: 'Aakash International', place: 'Haryana' },
  { name: 'M.N. Carpets', place: 'Haryana' },
  { name: 'Master Exports', place: 'Haryana' },
  { name: 'P.V. Rugs', place: 'Haryana' },
  { name: 'T.H. Woolen Mills', place: 'Rajasthan' },
  { name: 'Priya Enterprises', place: 'Rajasthan' },
  { name: 'Sandeep Tayal & Co.', place: 'New Delhi' },
  { name: 'Barsat Machinery', place: 'Haryana' },
  { name: 'Shiv Shakti Textile', place: 'Haryana' },
  { name: 'Aggarwal Fabrics', place: 'Haryana' },
  { name: 'Navkar Woolen Mills Pvt. Ltd.', place: 'Rajasthan' },
  { name: 'SM Healthcare & Medical Pvt. Ltd.', place: 'Haryana' },
  { name: 'SM Pharmaceutical', place: 'Haryana' },
  { name: 'Surya Hatchery', place: 'Haryana' },
  { name: 'Dharamshetra, The GYM', place: 'Haryana' },
]

export const clients = [...clientList].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))

export type ClientStory = {
  id: string
  /** Set only when the client has agreed to be named alongside the quote. */
  client?: string
  quote: string
  who: string
  where: string
  matter: string
  outcome: string
}

// Placeholder stories for the mock-up, deliberately not tied to any named client.
// Replace with real feedback, adding `client` only where that client has agreed to be quoted.
export const clientStories: ClientStory[] = [
  {
    id: 'msme',
    quote:
      'A buyer in another state had held our payments for over a year. They filed before the MSME Facilitation Council, and the award came with interest at three times the bank rate.',
    who: 'Proprietor, manufacturing MSME',
    where: 'Haryana',
    matter: 'MSME delayed payment',
    outcome: 'Award with statutory interest',
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
// We take on matters anywhere in India; these are the two chambers we work from.

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
    slug: 'chandigarh',
    city: 'Chandigarh',
    lines: ['Bar Room No. 19', 'Punjab & Haryana High Court, Chandigarh'],
    court: 'Punjab & Haryana High Court',
    intro:
      'Our Chandigarh chambers are at the Punjab & Haryana High Court. From here we handle writ petitions, bail and quashing, commercial appeals and tribunal matters, and coordinate work for clients in other states.',
    practices: ['commercial-suits-arbitration', 'msme-recovery', 'writs-constitutional', 'criminal-law', 'banking-recovery-insolvency', 'service-matters'],
    mapQuery: 'Punjab and Haryana High Court, Sector 1, Chandigarh',
  },
  {
    slug: 'panipat',
    city: 'Panipat',
    lines: ['Chamber No. 439', 'District Court, Panipat'],
    court: 'District & Sessions Court',
    intro:
      'Our Panipat chambers sit in the District Court complex. From here we handle commercial suits, MSME recovery and trial-court work for businesses, families and individuals, in Haryana and wherever else in India a matter takes us.',
    practices: ['commercial-suits-arbitration', 'msme-recovery', 'cheque-dishonour', 'civil-litigation', 'criminal-law', 'family-matrimonial'],
    mapQuery: 'District Court, Panipat, Haryana',
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
