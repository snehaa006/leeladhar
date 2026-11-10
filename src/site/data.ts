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
  'High Court of Delhi',
  'High Court of Himachal Pradesh',
  'Commercial Courts',
  'MSME Facilitation Councils',
  'District & Sessions Courts',
  'National Company Law Tribunal',
  'Debts Recovery Tribunal',
  'Consumer Commissions',
]

// ── The firm ──────────────────────────────────────────────────

export const practisingSince = 2011

/**
 * The firm's own account of itself, used on the home page, on /about and in the footer.
 * **words** and ==words== are the phrases that light up in teal and brick as the text scrolls in.
 */
export const about = {
  question: 'Every legal challenge has an answer.',
  answer: 'The key lies in knowing where to find it.',
  intro:
    'At Leeladhar Law Chambers, we look **beyond the obvious** to understand the law, uncover possibilities and build ==strategies that move matters towards solutions==.',
  story: [
    "Our approach is simple yet focused — **decode the complexity, identify the opportunity and deliver the solution**. With strategic thinking, thorough preparation and a clear understanding of our clients' objectives, we turn legal challenges into ==a well-defined course of action==. Our practice is driven by a **solution-oriented approach**, with a focus on understanding the finer aspects of every dispute, developing ==sound legal strategies== and representing our clients with diligence and commitment.",
    'We believe in understanding **the law beyond its text**, approaching every challenge with strategic insight and delivering ==practical, solution-oriented legal services==.',
  ],
  closing: 'Because the right solution begins with asking the right questions.',
  motto: 'Every matter begins with understanding.',
}

export type HighCourt = { name: string; url: string; host: string }

export const phhc: HighCourt = {
  name: 'Punjab & Haryana High Court',
  url: 'https://new.phhc.gov.in',
  host: 'new.phhc.gov.in',
}

export const dhc: HighCourt = {
  name: 'Delhi High Court',
  url: 'https://www.delhihighcourt.nic.in/web/',
  host: 'delhihighcourt.nic.in',
}

/** The High Court websites linked from the site, shown side by side. */
export const highCourts = [phhc, dhc]

// ── People ────────────────────────────────────────────────────

export type Member = {
  slug: string
  name: string
  role: string
  /** The year the advocate began practising. */
  since: number
  photo: string
  overview: string[]
  /** As the partner lists them; `slug` links to the practice-area page where there is one. */
  practices: { label: string; slug?: string; note?: string }[]
}

const execution = {
  label: 'Execution Proceedings',
  note: 'Enforcing decrees, awards and orders so that a judgment in your favour is actually honoured.',
}

export const team: Member[] = [
  {
    slug: 'priyanka-aggarwal',
    name: 'Priyanka Aggarwal',
    role: 'Partner',
    since: 2011,
    photo: '/team/priyanka-aggarwal.jpg',
    overview: [
      'She has been practising law since 2011 and has extensive courtroom experience. Her work is marked by careful preparation, clarity and sensitivity to her clients’ concerns.',
      'She studies every aspect of a case closely and shapes her strategy around the client’s needs. She believes good legal advice is advice that arrives on time and is easy to understand.',
      'As a Partner at Leeladhar Law Chambers, she guides clients through the legal process with confidence and care.',
    ],
    practices: [
      { label: 'Civil Litigation', slug: 'civil-litigation' },
      { label: 'Family Matters', slug: 'family-matrimonial' },
      { label: 'Contract Management', slug: 'contract-management' },
      { label: 'Property Disputes', slug: 'property-real-estate' },
      execution,
      {
        label: 'Documentation & Advisory',
        note: 'Drafting and reviewing documents, and advice before a dispute arises.',
      },
    ],
  },
  {
    slug: 'lakshay-bajaj',
    name: 'Lakshay Bajaj',
    role: 'Managing Partner',
    since: 2014,
    photo: '/team/lakshay-bajaj.jpg',
    overview: [
      'He has been practising law since 2014. With the years of experience, he has built a strong practice in civil, criminal and execution matters, appearing before trial courts and the High Court.',
      'His approach is to understand each case thoroughly, give clear and practical advice, and represent his clients diligently. He explains legal procedure in plain language so that clients stay informed at every stage.',
      'As a Managing Partner at Leeladhar Law Chambers, he is committed to providing clients with dependable legal support.',
    ],
    practices: [
      { label: 'Commercial Disputes', slug: 'commercial-suits-arbitration' },
      { label: 'Civil Litigation', slug: 'civil-litigation' },
      { label: 'Criminal Law', slug: 'criminal-law' },
      { label: 'MSME', slug: 'msme-recovery' },
      execution,
      { label: 'Property Disputes', slug: 'property-real-estate' },
      { label: 'High Court Matters', note: 'Writ petitions, appeals and revisions before the High Court.' },
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
      'Our chambers are at the Punjab & Haryana High Court. From here we handle writ petitions, bail and quashing, commercial appeals and tribunal matters, and coordinate work for clients in other states.',
    practices: ['commercial-suits-arbitration', 'msme-recovery', 'writs-constitutional', 'criminal-law', 'banking-recovery-insolvency', 'service-matters'],
    mapQuery: 'Punjab and Haryana High Court, Sector 1, Chandigarh',
  },
  {
    slug: 'panipat',
    city: 'Panipat',
    lines: ['Chamber No. 439', 'District Court, Panipat'],
    court: 'District & Sessions Court',
    intro:
      'Our chambers are in the District Court complex. From here we handle commercial suits, MSME recovery and trial-court work for businesses, families and individuals, in Haryana and wherever else in India a matter takes us.',
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
