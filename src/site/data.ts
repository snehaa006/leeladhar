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
  { href: '#faq', label: 'FAQ' },
]

export const forums = [
  'Supreme Court of India',
  'Delhi High Court',
  'Bombay High Court',
  'Punjab & Haryana High Court',
  'National Company Law Tribunal',
  'NCLAT',
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
        { label: 'Interim relief granted', meta: 'Delhi High Court', status: 'done' },
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
    body: 'One partner leads your matter. After every hearing you hear from us the same day.',
    when: 'For the life of the matter',
  },
  {
    title: 'Closure',
    body: 'We close the file with a summary of what was decided and anything you still need to do.',
    when: 'At the final order',
  },
]

// ── Team ──────────────────────────────────────────────────────

export type PracticeKey = 'corporate' | 'disputes' | 'family' | 'insolvency' | 'criminal'

export const practiceFilters: { id: PracticeKey | 'all'; label: string }[] = [
  { id: 'all', label: 'Everyone' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'disputes', label: 'Disputes' },
  { id: 'family', label: 'Family & property' },
  { id: 'insolvency', label: 'Insolvency' },
  { id: 'criminal', label: 'Criminal' },
]

export type Member = {
  id: string
  name: string
  role: string
  practice: PracticeKey
  focus: string
  years: number
  enrolled: string
  languages: string[]
  photo: string
  quote?: string
}

export const team: Member[] = [
  {
    id: 'rajiv',
    name: 'Rajiv Malhotra',
    role: 'Managing Partner',
    practice: 'disputes',
    focus: 'Commercial disputes and arbitration',
    years: 24,
    enrolled: 'Bar Council of Delhi, 2001',
    languages: ['English', 'Hindi', 'Punjabi'],
    photo: unsplash('photo-1742981365880-698cfb84492d', 1000),
    quote:
      'Most people who walk in here don’t need a fight. They need to know where they stand, in plain words, before they decide anything.',
  },
  {
    id: 'nandini',
    name: 'Nandini Iyer',
    role: 'Senior Partner',
    practice: 'corporate',
    focus: 'Investments, M&A and joint ventures',
    years: 19,
    enrolled: 'Bar Council of Tamil Nadu, 2006',
    languages: ['English', 'Tamil', 'Hindi'],
    photo: unsplash('photo-1770627016447-cb9d29ed0398'),
  },
  {
    id: 'sana',
    name: 'Sana Qureshi',
    role: 'Partner',
    practice: 'family',
    focus: 'Succession, matrimonial and property',
    years: 14,
    enrolled: 'Bar Council of Delhi, 2011',
    languages: ['English', 'Hindi', 'Urdu'],
    photo: unsplash('photo-1637589267610-6c66fc2a086b'),
  },
  {
    id: 'arjun',
    name: 'Arjun Deshpande',
    role: 'Partner',
    practice: 'insolvency',
    focus: 'IBC proceedings and restructuring',
    years: 12,
    enrolled: 'Bar Council of Maharashtra & Goa, 2013',
    languages: ['English', 'Marathi', 'Hindi'],
    photo: unsplash('photo-1778692258270-bc0e80e975c0'),
  },
  {
    id: 'meera',
    name: 'Meera Kapoor',
    role: 'Senior Associate',
    practice: 'family',
    focus: 'Real estate, RERA and tenancy',
    years: 8,
    enrolled: 'Bar Council of Delhi, 2017',
    languages: ['English', 'Hindi'],
    photo: unsplash('photo-1758518729466-827cd8293992'),
  },
  {
    id: 'kabir',
    name: 'Kabir Sethi',
    role: 'Associate',
    practice: 'criminal',
    focus: 'Bail, quashing and white-collar defence',
    years: 5,
    enrolled: 'Bar Council of Delhi, 2020',
    languages: ['English', 'Hindi'],
    photo: unsplash('photo-1659353220660-710d4c28c673'),
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
    id: 'partner',
    q: 'Will a partner handle my matter?',
    a: 'Yes. A partner leads every matter and appears for the important hearings. Associates prepare drafts and attend routine dates under that partner’s supervision.',
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
    q: 'Do you take matters outside Delhi?',
    a: 'We appear regularly in Mumbai and Chandigarh and before the Supreme Court. Elsewhere we work alongside local counsel we know and trust.',
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

export const contact = {
  address: ['Chamber 214, Lawyers’ Block', 'New Delhi 110001'],
  phone: '+91 11 0000 0000',
  email: 'chambers@leeladhar.example',
  hours: 'Monday to Saturday, 10:00–18:00',
}
