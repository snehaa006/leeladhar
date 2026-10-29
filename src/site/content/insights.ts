// Insights: general legal information written for clients. Each item has a
// page at /insights/:slug. Not legal advice; laws as in force in 2026.

export type InsightCategory = 'articles' | 'legal-updates' | 'guides'

export const insightCategories: { id: InsightCategory; label: string }[] = [
  { id: 'articles', label: 'Articles' },
  { id: 'legal-updates', label: 'Legal updates' },
  { id: 'guides', label: 'Guides' },
]

export type Insight = {
  slug: string
  title: string
  category: InsightCategory
  date: string // ISO
  practice: string // practice area slug
  excerpt: string
  sections: { heading?: string; paragraphs: string[] }[]
}

export const insights: Insight[] = [
  {
    slug: 'cheque-bounce-section-138-step-by-step',
    title: 'Your cheque bounced. What Section 138 lets you do, step by step',
    category: 'guides',
    date: '2026-09-18',
    practice: 'cheque-dishonour',
    excerpt:
      'A dishonoured cheque gives you a criminal remedy with short, fixed deadlines. Here is the order in which things must happen.',
    sections: [
      {
        paragraphs: [
          'Section 138 of the Negotiable Instruments Act, 1881 makes it an offence to issue a cheque for a legally enforceable debt that is returned unpaid for insufficient funds or because it exceeds the arrangement with the bank. The remedy is strong, but it works only if each step is taken within time.',
        ],
      },
      {
        heading: '1. Present the cheque in time',
        paragraphs: ['A cheque is valid for three months from its date. It must be presented to the bank within that period.'],
      },
      {
        heading: '2. Send a demand notice within 30 days',
        paragraphs: [
          'Once the bank returns the cheque with a memo, you have 30 days from receiving that information to send a written notice demanding payment. Keep proof of dispatch and delivery.',
        ],
      },
      {
        heading: '3. Wait 15 days, then file within a month',
        paragraphs: [
          'The drawer has 15 days from receiving the notice to pay. If they do not, the offence is complete, and the complaint must be filed before the Magistrate within one month after those 15 days end.',
        ],
      },
      {
        heading: 'What the court can order',
        paragraphs: [
          'The court may direct interim compensation of up to 20% of the cheque amount while the case is pending, and on conviction can impose imprisonment of up to two years, a fine of up to twice the cheque amount, or both. The offence is compoundable, so a settlement can be recorded at any stage.',
        ],
      },
    ],
  },
  {
    slug: 'new-criminal-laws-bns-bnss-bsa',
    title: 'The new criminal laws: what BNS, BNSS and BSA changed',
    category: 'legal-updates',
    date: '2026-08-04',
    practice: 'criminal-law',
    excerpt:
      'Since 1 July 2024, three new codes have replaced the IPC, CrPC and Evidence Act. What that means for a case filed today.',
    sections: [
      {
        paragraphs: [
          'On 1 July 2024 the Bharatiya Nyaya Sanhita (BNS), the Bharatiya Nagarik Suraksha Sanhita (BNSS) and the Bharatiya Sakshya Adhiniyam (BSA) came into force, replacing the Indian Penal Code, the Code of Criminal Procedure and the Indian Evidence Act respectively.',
        ],
      },
      {
        heading: 'Which law applies to my case?',
        paragraphs: [
          'Broadly, offences committed before 1 July 2024 continue to be governed by the IPC, while the procedure in pending and new cases follows the transition provisions of the BNSS. Which code applies to a particular step can turn on dates, so it is worth checking for each case.',
        ],
      },
      {
        heading: 'What stayed the same',
        paragraphs: [
          'Most offences and procedures carried over with new section numbers. The familiar principles on bail, anticipatory bail and quashing continue to guide the courts.',
        ],
      },
      {
        heading: 'What is new',
        paragraphs: [
          'The new codes add timelines for investigation and trial, wider use of electronic records and video hearings, and some new offences. Expect references in FIRs and orders to use the new section numbers.',
        ],
      },
    ],
  },
  {
    slug: 'succession-certificate-probate-legal-heir',
    title: 'Succession certificate, probate or legal heir certificate: which one do you need?',
    category: 'guides',
    date: '2026-07-11',
    practice: 'wills-succession',
    excerpt: 'Banks, registrars and insurers ask for different documents after a death. This is how to tell them apart.',
    sections: [
      {
        paragraphs: [
          'When a family member passes away, institutions holding their assets ask for proof of who is entitled to receive them. Three documents are commonly confused.',
        ],
      },
      {
        heading: 'Succession certificate',
        paragraphs: [
          'Issued by a civil court under the Indian Succession Act, 1925, a succession certificate allows the holder to collect debts and securities of the deceased, such as bank deposits, shares and amounts due. It is most useful where there is no will.',
        ],
      },
      {
        heading: 'Probate',
        paragraphs: [
          'Probate is the court’s certification of a will. It is compulsory only in certain cases, chiefly for wills connected to the former presidency towns of Kolkata, Chennai and Mumbai. In Haryana it is optional, but it can make a will much harder to challenge.',
        ],
      },
      {
        heading: 'Legal heir certificate',
        paragraphs: [
          'A legal heir certificate is issued by the revenue authorities and identifies the heirs. It is often enough for pensions, utility transfers and smaller claims, but it does not by itself decide title to property.',
        ],
      },
    ],
  },
  {
    slug: 'consumer-complaint-haryana',
    title: 'Filing a consumer complaint in Haryana: where, when and how',
    category: 'articles',
    date: '2026-06-02',
    practice: 'consumer-protection',
    excerpt:
      'The Consumer Protection Act, 2019 lets you claim compensation without a civil suit. The forum depends on what you paid.',
    sections: [
      {
        heading: 'Which commission',
        paragraphs: [
          'The forum depends on the value of goods or services paid for. The District Commission hears complaints up to ₹50 lakh, the State Commission above ₹50 lakh and up to ₹2 crore, and the National Commission above ₹2 crore.',
        ],
      },
      {
        heading: 'Where',
        paragraphs: [
          'You may file where you live or work, not only where the seller is located. For Panipat residents, that is usually the District Consumer Disputes Redressal Commission at Panipat.',
        ],
      },
      {
        heading: 'When',
        paragraphs: ['A complaint should be filed within two years of the cause of action. Later complaints need an application explaining the delay.'],
      },
      {
        heading: 'How',
        paragraphs: [
          'Complaints can be filed online through the e-Daakhil portal or in person. Attach the invoice, warranty or policy, your correspondence with the seller and any expert report. A complete file is the single biggest factor in how quickly a complaint moves.',
        ],
      },
    ],
  },
  {
    slug: 'mutual-consent-divorce-waiting-period',
    title: 'Mutual consent divorce: the six-month wait can be waived',
    category: 'legal-updates',
    date: '2026-04-21',
    practice: 'family-matrimonial',
    excerpt:
      'Section 13B of the Hindu Marriage Act sets a cooling-off period. Courts have held that it is not always mandatory.',
    sections: [
      {
        paragraphs: [
          'Under Section 13B of the Hindu Marriage Act, 1955, spouses who have lived separately for a year or more may jointly seek divorce. The second motion is ordinarily made at least six months after the first.',
        ],
      },
      {
        heading: 'When the wait can go',
        paragraphs: [
          'In Amardeep Singh v. Harveen Kaur (2017), the Supreme Court held that the six-month period is directory, not mandatory. A family court may waive it where the parties have separated for a long time, mediation has failed, and all issues of alimony and custody are settled.',
        ],
      },
      {
        heading: 'What to prepare',
        paragraphs: [
          'A clear settlement on maintenance, custody, return of articles and withdrawal of pending cases. A waiver application is decided on its own facts, and a complete settlement is what persuades the court.',
        ],
      },
    ],
  },
  {
    slug: 'sarfaesi-notice-what-borrowers-can-do',
    title: 'Received a SARFAESI notice? What a borrower can do in 60 days',
    category: 'articles',
    date: '2026-03-09',
    practice: 'banking-recovery-insolvency',
    excerpt: 'A demand notice under Section 13(2) starts a short clock. The steps that matter, in the order they come.',
    sections: [
      {
        paragraphs: [
          'Under the SARFAESI Act, 2002, a secured creditor can enforce its security without going to court once a loan is classified as a non-performing asset. The process starts with a demand notice under Section 13(2).',
        ],
      },
      {
        heading: 'Respond to the notice',
        paragraphs: [
          'You have 60 days to repay. Within that time you can make a representation or raise objections, and the bank must consider them and reply with reasons before it takes possession.',
        ],
      },
      {
        heading: 'If the bank takes possession',
        paragraphs: [
          'You can apply to the Debts Recovery Tribunal under Section 17 within 45 days of the measure taken. The Tribunal can examine whether the bank followed the procedure and can restore possession.',
        ],
      },
      {
        heading: 'Settlement is still open',
        paragraphs: [
          'Banks consider one-time settlements at most stages. A realistic written proposal, made early, is often the most effective step of all.',
        ],
      },
    ],
  },
]

export const insightBySlug = (slug: string | undefined) => insights.find((i) => i.slug === slug)

export const categoryLabel = (id: InsightCategory) => insightCategories.find((c) => c.id === id)?.label ?? id

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
