// Events, CSR, pro bono and media, after the Events menu on duaassociates.com.
// Placeholder entries for the mock-up: replace with the chambers' real activity.

export type EventCategory = 'events' | 'csr' | 'pro-bono' | 'media'

export const eventCategories: { id: EventCategory; label: string }[] = [
  { id: 'events', label: 'Talks & sessions' },
  { id: 'csr', label: 'CSR' },
  { id: 'pro-bono', label: 'Pro bono initiatives' },
  { id: 'media', label: 'Media' },
]

export type FirmEvent = {
  id: string
  category: EventCategory
  title: string
  date: string // ISO
  place: string
  body: string
}

export const events: FirmEvent[] = [
  {
    id: 'consumer-rights-session',
    category: 'events',
    title: 'Know your rights as a consumer: an evening session for traders and shoppers',
    date: '2026-09-27',
    place: 'Panipat',
    body: 'How to file a complaint before the District Commission, what to keep on record, and when a complaint is not the right route.',
  },
  {
    id: 'legal-aid-camp',
    category: 'pro-bono',
    title: 'Free legal advice camp for senior citizens',
    date: '2026-08-15',
    place: 'Panipat',
    body: 'One-to-one advice on wills, pensions, maintenance and property, with follow-up through the District Legal Services Authority where needed.',
  },
  {
    id: 'school-awareness',
    category: 'csr',
    title: 'Legal awareness for school students: cyber safety and the law',
    date: '2026-07-24',
    place: 'Panipat',
    body: 'A session for senior students on online fraud, harassment and how to report it.',
  },
  {
    id: 'bail-explainer',
    category: 'media',
    title: 'Explainer: how bail works under the new criminal laws',
    date: '2026-06-30',
    place: 'Chandigarh',
    body: 'A plain-language explainer on regular and anticipatory bail under the Bharatiya Nagarik Suraksha Sanhita.',
  },
]
