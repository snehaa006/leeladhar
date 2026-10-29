import type { NoteStatus, Stat } from '../design-system'

// All names, figures and contact details are placeholders for the mock-up.

const unsplash = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

export const photos = {
  desk: unsplash('photo-1771244688590-1e481dba1b5a', 700),
}

export const navLinks = [
  { href: '#solutions', label: 'Solutions' },
  { href: '#practice', label: 'Practice' },
  { href: '#process', label: 'Process' },
  { href: '#team', label: 'Team' },
  { href: '#clients', label: 'Clients' },
  { href: '#faq', label: 'FAQ' },
]

export const forums = [
  'Punjab & Haryana High Court',
  'District & Sessions Court, Panipat',
  'Family Courts',
  'National Company Law Tribunal',
  'Debts Recovery Tribunal',
  'Consumer Commissions',
]

export const stats: Stat[] = [
  { value: '22', suffix: '+', label: 'Years in practice' },
  { value: '3,400', suffix: '+', label: 'Matters closed' },
  { value: '9', label: 'Courts and tribunals we appear before' },
]

// ── Solutions ─────────────────────────────────────────────────

export type Solution = {
  title: string
  body: string
  icon: 'building' | 'handshake' | 'users' | 'file' | 'scale' | 'landmark' | 'home' | 'scroll' | 'heart' | 'key' | 'globe' | 'video'
}

export type MatterStep = { label: string; meta: string; status: NoteStatus }

export type Audience = {
  id: string
  label: string
  summary: string
  solutions: Solution[]
  matter: { title: string; client: string; steps: MatterStep[] }
}

export const audiences: Audience[] = [
  {
    id: 'founders',
    label: 'Founders & startups',
    summary: 'From incorporation to your first priced round, paperwork that will survive due diligence.',
    solutions: [
      {
        icon: 'building',
        title: 'Incorporation and founder agreements',
        body: 'Company or LLP, a clean cap table from day one, and vesting that holds up if a co-founder leaves.',
      },
      {
        icon: 'handshake',
        title: 'Fundraising documents',
        body: 'Term sheets, shareholders’ and subscription agreements, and FEMA filings when the money comes from abroad.',
      },
      {
        icon: 'users',
        title: 'Employment and ESOPs',
        body: 'Offer letters, ESOP schemes and the workplace policies a growing team is required to have.',
      },
    ],
    matter: {
      title: 'Seed round',
      client: 'Northwind Labs Pvt Ltd',
      steps: [
        { label: 'Term sheet reviewed', meta: '12 comments resolved', status: 'done' },
        { label: 'Shareholders’ agreement signed', meta: 'All four investors', status: 'done' },
        { label: 'Board and shareholder resolutions', meta: 'Drafts with the board', status: 'active' },
        { label: 'FC-GPR filing with the RBI', meta: 'Due within 30 days of allotment', status: 'awaiting' },
      ],
    },
  },
  {
    id: 'businesses',
    label: 'Businesses',
    summary: 'Contracts that match how you trade, and a steady hand when a counterparty stops paying.',
    solutions: [
      {
        icon: 'file',
        title: 'Commercial contracts',
        body: 'Vendor, distribution and licensing agreements written around how your business actually runs.',
      },
      {
        icon: 'scale',
        title: 'Disputes and arbitration',
        body: 'Recovery suits, commercial court matters and arbitrations, from the first notice to the final award.',
      },
      {
        icon: 'landmark',
        title: 'Insolvency and restructuring',
        body: 'Creditors and corporate debtors before the NCLT under the Insolvency and Bankruptcy Code.',
      },
    ],
    matter: {
      title: 'Supply dispute',
      client: 'Arbitration under Section 9',
      steps: [
        { label: 'Legal notice served', meta: 'Reply received in 14 days', status: 'done' },
        { label: 'Interim relief granted', meta: 'Punjab & Haryana High Court', status: 'done' },
        { label: 'Tribunal constituted', meta: 'Sole arbitrator appointed', status: 'active' },
        { label: 'Statement of claim', meta: 'To be filed by 18 November', status: 'awaiting' },
      ],
    },
  },
  {
    id: 'families',
    label: 'Families',
    summary: 'Property, inheritance and matrimonial matters, handled privately and without needless conflict.',
    solutions: [
      {
        icon: 'home',
        title: 'Property and title',
        body: 'Title searches before you buy, sale deeds and registration, and disputes over possession.',
      },
      {
        icon: 'scroll',
        title: 'Wills and succession',
        body: 'Wills, probate and succession certificates, settled with as little friction in the family as possible.',
      },
      {
        icon: 'heart',
        title: 'Matrimonial matters',
        body: 'Divorce, maintenance and custody, with mediation first wherever it can work.',
      },
    ],
    matter: {
      title: 'Ancestral property',
      client: 'Partition among four heirs',
      steps: [
        { label: 'Title search complete', meta: '30 years, clear', status: 'done' },
        { label: 'Family settlement drafted', meta: 'Shared with all heirs', status: 'done' },
        { label: 'Mediation, second session', meta: 'Thursday, 11:00', status: 'active' },
        { label: 'Registration at sub-registrar', meta: 'After all heirs sign', status: 'awaiting' },
      ],
    },
  },
  {
    id: 'nri',
    label: 'NRIs & overseas clients',
    summary: 'Your property and family matters in India, managed without flying back for every hearing.',
    solutions: [
      {
        icon: 'key',
        title: 'Property you own in India',
        body: 'Powers of attorney, tenant disputes and sales, handled while you live overseas.',
      },
      {
        icon: 'globe',
        title: 'Inheritance and repatriation',
        body: 'Claiming inherited assets and moving the proceeds abroad within RBI limits.',
      },
      {
        icon: 'video',
        title: 'Representation from a distance',
        body: 'Video consultations in your time zone and one named contact for every hearing.',
      },
    ],
    matter: {
      title: 'Tenant eviction',
      client: 'Flat in Gurugram, owner in Toronto',
      steps: [
        { label: 'Power of attorney executed', meta: 'At the Indian consulate', status: 'done' },
        { label: 'Eviction notice served', meta: 'Acknowledged by tenant', status: 'done' },
        { label: 'Rent Controller hearing', meta: 'Next date: 4 December', status: 'active' },
        { label: 'Possession handed over', meta: 'Keys couriered to family', status: 'awaiting' },
      ],
    },
  },
]

// ── Practice areas ────────────────────────────────────────────

export const practiceAreas = [
  {
    id: 'corporate',
    title: 'Corporate & commercial',
    body: 'Company formation, investment and M&A documentation, joint ventures, and the contracts a business signs every week.',
    forums: ['Advisory', 'ROC', 'RBI'],
  },
  {
    id: 'disputes',
    title: 'Dispute resolution & arbitration',
    body: 'Civil and commercial litigation, domestic and international arbitration, and enforcement of awards and decrees.',
    forums: ['Supreme Court', 'High Courts', 'Tribunals'],
  },
  {
    id: 'insolvency',
    title: 'Insolvency & restructuring',
    body: 'Corporate insolvency resolution, creditor claims, pre-packs and personal guarantor proceedings under the IBC.',
    forums: ['NCLT', 'NCLAT'],
  },
  {
    id: 'property',
    title: 'Real estate & property',
    body: 'Due diligence, conveyancing, RERA complaints, landlord–tenant disputes and partition suits.',
    forums: ['RERA', 'Civil courts'],
  },
  {
    id: 'family',
    title: 'Family & succession',
    body: 'Wills, probate, succession certificates, divorce, maintenance and guardianship.',
    forums: ['Family courts', 'High Courts'],
  },
  {
    id: 'criminal',
    title: 'Criminal defence',
    body: 'Bail, quashing petitions, white-collar and economic offences, and cheque-dishonour cases.',
    forums: ['Sessions courts', 'High Courts'],
  },
  {
    id: 'tax',
    title: 'Tax',
    body: 'Direct and indirect tax disputes, GST notices, assessments and appeals.',
    forums: ['ITAT', 'CESTAT'],
  },
]

// ── Process (a real sequence, so it is numbered) ──────────────

export const process = [
  {
    title: 'First conversation',
    body: 'A 30-minute call to understand what happened and what you need. Nothing to sign yet.',
    when: 'Day 1',
  },
  {
    title: 'Strategy note',
    body: 'A written note with your options, likely timelines and our fee, before any work starts.',
    when: 'Within 3 working days',
  },
  {
    title: 'Representation',
    body: 'One advocate leads your matter from start to finish. After every hearing you hear from us the same day.',
    when: 'For the life of the matter',
  },
  {
    title: 'Closure',
    body: 'We close the file with a summary of what was decided and anything you still need to do.',
    when: 'At the final order',
  },
]

// ── Team ──────────────────────────────────────────────────────

export type Member = {
  id: string
  name: string
  role: string
  chambers: string
  photo: string
}

export const team: Member[] = [
  {
    id: 'lakshay',
    name: 'Lakshay Bajaj',
    role: 'Advocate',
    chambers: 'Punjab & Haryana High Court, Chandigarh',
    photo: '/team/lakshay-bajaj.jpg',
  },
  {
    id: 'priyanka',
    name: 'Priyanka Aggarwal',
    role: 'Advocate',
    chambers: 'District Court, Panipat',
    photo: '/team/priyanka-aggarwal.jpg',
  },
]

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

// ── FAQ ───────────────────────────────────────────────────────

export const faqs = [
  {
    id: 'first',
    q: 'What happens in the first consultation?',
    a: 'We listen, ask about documents and dates, and tell you honestly whether you need a lawyer at all. If you do, we explain the routes open to you and send a written strategy note within three working days.',
  },
  {
    id: 'fees',
    q: 'How are fees decided?',
    a: 'Drafting and advisory work is quoted as a fixed fee. Litigation is billed per appearance, with filing and clerkage costs listed separately. Every fee is set out in the strategy note before work starts.',
  },
  {
    id: 'advocate',
    q: 'Will an advocate handle my matter personally?',
    a: 'Yes. One of our advocates leads every matter, appears for the hearings and is the person you call. Nothing is handed off without telling you.',
  },
  {
    id: 'abroad',
    q: 'I live outside India. Can you still act for me?',
    a: 'Yes. We work by video and email, help you execute a power of attorney at your nearest consulate, and keep one named contact for you throughout.',
  },
  {
    id: 'documents',
    q: 'How do I share documents?',
    a: 'After the first call you receive a private folder link. Originals, where a court needs them, can be couriered to the chambers.',
  },
  {
    id: 'cities',
    q: 'Where do you practise?',
    a: 'From two chambers: at the District Court in Panipat and at the Punjab & Haryana High Court in Chandigarh. For courts elsewhere we work alongside local counsel we know and trust.',
  },
]

export const matterTypes = [
  { value: 'corporate', label: 'Business or startup' },
  { value: 'dispute', label: 'A dispute or court case' },
  { value: 'property', label: 'Property' },
  { value: 'family', label: 'Family or inheritance' },
  { value: 'criminal', label: 'Criminal matter' },
  { value: 'other', label: 'Something else' },
]

export type Office = { id: string; city: string; lines: string[]; court: string }

export const offices: Office[] = [
  {
    id: 'panipat',
    city: 'Panipat',
    lines: ['Chamber No. 439', 'District Court, Panipat'],
    court: 'District & Sessions Court',
  },
  {
    id: 'chandigarh',
    city: 'Chandigarh',
    lines: ['Bar Room No. 19', 'Punjab & Haryana High Court, Chandigarh'],
    court: 'Punjab & Haryana High Court',
  },
]

export const contact = {
  phone: '+91 90699 10000',
  email: 'leeladharlawchambers@gmail.com',
  hours: 'Monday to Saturday, 10:00–18:00',
}
