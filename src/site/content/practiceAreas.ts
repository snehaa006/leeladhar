// Practice areas. Each one gets a page at /practice-areas/:slug.
// Statements of law are general information and current as of 2026.

export type PracticeIcon =
  | 'scale'
  | 'gavel'
  | 'cheque'
  | 'family'
  | 'home'
  | 'scroll'
  | 'shield'
  | 'briefcase'
  | 'landmark'
  | 'handshake'
  | 'bank'
  | 'map'

export type PracticeArea = {
  slug: string
  title: string
  icon: PracticeIcon
  /** One or two sentences: the explorer card and listings. */
  summary: string
  body: string[]
  offerings: { title: string; body: string }[]
  approach: string
  forums: string[]
  faqs: { q: string; a: string }[]
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'commercial-suits-arbitration',
    title: 'Commercial Suits & Arbitration',
    icon: 'handshake',
    summary: 'Commercial suits, recovery of dues, arbitration and contract disputes for traders, manufacturers and exporters across India.',
    body: [
      'Manufacturers, exporters and traders run on contracts with buyers, suppliers and agents, often in other states. When those contracts break down, we help you recover what is owed without losing the relationship if it can be kept.',
      'We act in commercial suits, domestic arbitrations and the court proceedings around them, including interim relief and enforcement of awards.',
    ],
    offerings: [
      { title: 'Contract drafting and review', body: 'Supply, distribution and agency agreements with workable dispute clauses.' },
      { title: 'Commercial suits', body: 'Suits under the Commercial Courts Act, including pre-institution mediation.' },
      { title: 'Arbitration', body: 'Appointment of arbitrators, conduct of the arbitration and final hearing.' },
      { title: 'Interim measures', body: 'Section 9 petitions to secure assets before or during arbitration.' },
      { title: 'Challenge and enforcement', body: 'Section 34 challenges and execution of arbitral awards.' },
    ],
    approach: 'We start with a notice that sets out the claim fully, because a well-built first letter is often what brings the other side to the table.',
    forums: ['Commercial courts', 'Arbitral tribunals', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'Do I have to try mediation before filing a commercial suit?',
        a: 'Yes, unless you need urgent interim relief. Pre-institution mediation is mandatory under Section 12A of the Commercial Courts Act, 2015.',
      },
      {
        q: 'What if the contract has an arbitration clause?',
        a: 'The dispute will generally have to go to arbitration. A court can still grant interim protection under Section 9 of the Arbitration Act.',
      },
      {
        q: 'Can an arbitral award be challenged?',
        a: 'Only on limited grounds under Section 34, such as lack of a fair hearing or patent illegality. Courts do not re-hear the merits.',
      },
    ],
  },
  {
    slug: 'msme-recovery',
    title: 'MSME Delayed Payments & Recovery',
    icon: 'briefcase',
    summary: 'Recovery of delayed payments for micro and small enterprises before the MSME Facilitation Councils, with interest at three times the bank rate.',
    body: [
      'A micro or small enterprise that supplies goods or services has special protection when a buyer pays late. The MSMED Act, 2006 caps the credit period at 45 days and makes the buyer liable for compound interest at three times the bank rate notified by the Reserve Bank of India.',
      'We file and argue references before the Micro and Small Enterprises Facilitation Councils of the states where our clients and their buyers are, through conciliation and then arbitration, and defend the awards in court.',
    ],
    offerings: [
      { title: 'Delayed payment claims', body: 'Working out the principal and statutory interest, and filing the reference, including on the MSME Samadhaan portal.' },
      { title: 'Conciliation and arbitration', body: 'Appearing before the Facilitation Council through conciliation and, if that fails, arbitration.' },
      { title: 'Enforcing awards', body: 'Execution of Council awards against buyers anywhere in India.' },
      { title: 'Challenges to awards', body: 'Section 19 proceedings, where a buyer must first deposit 75% of the amount awarded.' },
      { title: 'Paperwork that protects you', body: 'Udyam registration timing, purchase orders and invoices with clear payment terms.' },
    ],
    approach: 'We start with your Udyam certificate and the invoices, because the date of registration and the terms on the invoice decide what you can claim.',
    forums: ['MSME Facilitation Councils', 'Commercial courts', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'Who can file before the MSME Facilitation Council?',
        a: 'A micro or small enterprise registered on the Udyam portal that has supplied goods or services and not been paid on time. Medium enterprises are not covered by these delayed-payment provisions.',
      },
      {
        q: 'How much interest can I claim?',
        a: 'Compound interest with monthly rests at three times the bank rate notified by the RBI, from the date payment fell due under Section 15 of the MSMED Act.',
      },
      {
        q: 'Does it matter when I registered?',
        a: 'Yes. Courts have held that the protection generally applies to supplies made after the enterprise was registered, so registering early matters.',
      },
      {
        q: 'Can the buyer challenge the award?',
        a: 'Only after depositing 75% of the amount awarded with the court, under Section 19 of the MSMED Act.',
      },
    ],
  },
  {
    slug: 'civil-litigation',
    title: 'Civil Litigation',
    icon: 'scale',
    summary:
      'Suits for recovery, declaration, injunction and specific performance, from the first notice to execution of the decree.',
    body: [
      'Most civil disputes we see start with something small: a payment that stopped, a boundary that moved, an agreement one side no longer wants to honour. We look at the documents first and tell you plainly whether a suit is worth bringing, what it will cost and how long it is likely to take.',
      'We file and defend suits in the civil courts wherever the cause of action arises, and argue first and regular second appeals before the Punjab & Haryana High Court. Because a decree is only worth what you can recover, we plan for execution from the start.',
    ],
    offerings: [
      { title: 'Recovery suits', body: 'Money owed under invoices, loans and agreements, including summary suits on written contracts.' },
      { title: 'Injunctions', body: 'Urgent interim orders to stop dispossession, construction or the sale of disputed property.' },
      { title: 'Declaration and title', body: 'Suits to declare ownership or set aside documents obtained by fraud.' },
      { title: 'Specific performance', body: 'Enforcing agreements to sell when the other side backs out.' },
      { title: 'Appeals and execution', body: 'First and regular second appeals, and execution proceedings to make a decree count.' },
    ],
    approach:
      'Before anything is filed you get a written note on the merits, the limitation period and the likely timeline. Where a settlement is realistic, we try it first.',
    forums: ['Civil courts across India', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'How long do I have to file a civil suit?',
        a: 'It depends on the claim. Many suits for money must be filed within three years under the Limitation Act, 1963, but some periods are shorter and some run from a later date. Bring your documents early so the deadline can be checked.',
      },
      {
        q: 'Can I get an order quickly if someone is about to sell or occupy my property?',
        a: 'Yes. Courts can grant a temporary injunction at the first hearing when there is urgency, a strong prima facie case and a risk of irreparable harm.',
      },
      {
        q: 'What happens after I win?',
        a: 'If the other side does not comply voluntarily, the decree is enforced through execution proceedings, which can include attachment and sale of property.',
      },
    ],
  },
  {
    slug: 'criminal-law',
    title: 'Criminal Law & Bail',
    icon: 'gavel',
    summary:
      'Regular and anticipatory bail, quashing petitions and trial defence, with someone reachable when it is urgent.',
    body: [
      'Criminal matters rarely wait for office hours. When an FIR is registered or an arrest is made, the first steps decide a great deal, and we move quickly on bail and on protecting your rights during investigation.',
      'We appear before the trial courts for bail and trials, and before the Punjab & Haryana High Court for anticipatory bail, quashing petitions and criminal appeals under the Bharatiya Nagarik Suraksha Sanhita, 2023.',
    ],
    offerings: [
      { title: 'Regular bail', body: 'Applications before the Magistrate, Sessions Court and High Court after arrest.' },
      { title: 'Anticipatory bail', body: 'Protection from arrest when you expect to be named in a case.' },
      { title: 'Quashing petitions', body: 'Petitions to the High Court to quash FIRs and proceedings that should not continue.' },
      { title: 'Trial defence', body: 'Cross-examination, defence evidence and final arguments in Sessions and Magistrate trials.' },
      { title: 'Appeals and revisions', body: 'Challenging convictions, sentences and orders before the higher courts.' },
    ],
    approach:
      'We tell the family what will happen next, in which court and when. After every hearing you hear from us the same day.',
    forums: ['Sessions Courts', 'Judicial Magistrates', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'What is the difference between regular and anticipatory bail?',
        a: 'Regular bail is sought after arrest. Anticipatory bail is sought before arrest by someone who expects to be arrested, and if granted it directs release on bail in the event of arrest.',
      },
      {
        q: 'Did the new criminal laws change the bail process?',
        a: 'Since 1 July 2024 the Bharatiya Nagarik Suraksha Sanhita has replaced the Code of Criminal Procedure. The section numbers changed, but the basic principles courts apply to bail remain broadly the same.',
      },
      {
        q: 'Can an FIR be cancelled?',
        a: 'The High Court can quash an FIR or criminal proceedings in suitable cases, for example where the allegations do not disclose an offence or the parties have genuinely settled certain disputes.',
      },
    ],
  },
  {
    slug: 'cheque-dishonour',
    title: 'Cheque Dishonour (Section 138)',
    icon: 'cheque',
    summary:
      'Legal notices, complaints and defence under Section 138 of the Negotiable Instruments Act, where the deadlines are strict.',
    body: [
      'A bounced cheque gives the payee a strong criminal remedy, but only if each step is taken on time. Miss a deadline and the complaint can fail, however good the claim.',
      'We act for payees and for people who have been served a notice or summoned, in the Magistrate courts where the cheque was presented and in revisions and petitions before the High Court.',
    ],
    offerings: [
      { title: 'Statutory notice', body: 'Drafting and sending the demand notice within 30 days of the bank’s return memo.' },
      { title: 'Filing the complaint', body: 'Complaints within the one-month window after the notice period expires.' },
      { title: 'Interim compensation', body: 'Applications for interim compensation of up to 20% of the cheque amount.' },
      { title: 'Defence', body: 'Defending complaints where the debt is disputed or the notice was defective.' },
      { title: 'Settlement', body: 'The offence is compoundable, so many cases end in a recorded settlement.' },
    ],
    approach:
      'We put every date on one page for you on the first day, so you can see exactly when the notice must go out and when the complaint must be filed.',
    forums: ['Judicial Magistrates', 'Sessions Courts', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'How soon must I send a notice after the cheque bounces?',
        a: 'Within 30 days of receiving the information from the bank that the cheque was returned unpaid.',
      },
      {
        q: 'When can I file the complaint?',
        a: 'If the drawer does not pay within 15 days of receiving the notice, the complaint must be filed within one month after those 15 days end.',
      },
      {
        q: 'Can the case be settled?',
        a: 'Yes. The offence under Section 138 is compoundable, and courts encourage settlement at every stage.',
      },
    ],
  },
  {
    slug: 'family-matrimonial',
    title: 'Family & Matrimonial',
    icon: 'family',
    summary: 'Divorce, maintenance, custody and domestic violence matters, handled privately and with mediation first where it can work.',
    body: [
      'Family cases are about people before they are about law. We listen first, explain the realistic outcomes and look for an agreed way out wherever that protects you and your children.',
      'When a matter has to be contested, we represent you before the family courts and the Punjab & Haryana High Court, including in transfer petitions and appeals.',
    ],
    offerings: [
      { title: 'Divorce', body: 'Mutual consent and contested divorce under the Hindu Marriage Act and other personal laws.' },
      { title: 'Maintenance', body: 'Claims and defence for maintenance for spouses, children and parents.' },
      { title: 'Child custody', body: 'Custody and visitation under the Guardians and Wards Act, with the child’s welfare first.' },
      { title: 'Domestic violence', body: 'Protection and residence orders under the Protection of Women from Domestic Violence Act, 2005.' },
      { title: 'Mediation and settlement', body: 'Court-annexed mediation and drafting of settlement terms that hold.' },
    ],
    approach: 'Conversations are confidential and unhurried. We prepare you for each hearing so nothing in court comes as a surprise.',
    forums: ['Family courts', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'Is the six-month waiting period for mutual consent divorce compulsory?',
        a: 'No. The Supreme Court has held that the court may waive it where the parties have genuinely separated, settled all issues and reconciliation is not possible.',
      },
      {
        q: 'Who can claim maintenance?',
        a: 'A wife, children and parents who are unable to maintain themselves can claim maintenance, under personal laws and under the Bharatiya Nagarik Suraksha Sanhita.',
      },
      {
        q: 'Will I have to go to court every date?',
        a: 'Not always. Your presence is required on certain dates, such as statements and mediation, and we tell you in advance which ones.',
      },
    ],
  },
  {
    slug: 'property-real-estate',
    title: 'Property & Real Estate',
    icon: 'home',
    summary: 'Title checks before you buy, sale deeds and mutation, partition and possession disputes, and RERA complaints.',
    body: [
      'Property is usually the largest thing a family owns, and most disputes begin with a document nobody checked. We check title before you pay, and we fight for possession when something has already gone wrong.',
      'We handle registration and mutation work, partition and possession suits in the civil courts, and complaints before the Real Estate Regulatory Authorities, including Haryana RERA.',
    ],
    offerings: [
      { title: 'Title due diligence', body: 'Searches of revenue records and the chain of title before purchase.' },
      { title: 'Sale deeds and registration', body: 'Agreements, sale deeds, gift deeds and their registration.' },
      { title: 'Partition', body: 'Partition of family property by settlement or by suit.' },
      { title: 'Possession and tenancy', body: 'Recovery of possession, eviction and tenancy disputes.' },
      { title: 'RERA complaints', body: 'Complaints by homebuyers for delayed possession, refunds and interest.' },
    ],
    approach: 'You get a short written opinion on title in plain language: what is clear, what is not, and what to fix before you sign.',
    forums: ['Civil courts', 'RERA authorities', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'What should I check before buying land?',
        a: 'At the least, the revenue records (jamabandi and mutation entries), the chain of earlier sale deeds, any encumbrances and whether the seller has the right to sell the whole share.',
      },
      {
        q: 'Is mutation proof of ownership?',
        a: 'No. Mutation updates revenue records for fiscal purposes. Title comes from the registered documents and the law of succession.',
      },
      {
        q: 'My builder has delayed possession. What can I do?',
        a: 'If the project is registered, you can file a complaint before the Real Estate Regulatory Authority seeking possession with interest for the delay, or a refund with interest.',
      },
    ],
  },
  {
    slug: 'wills-succession',
    title: 'Wills, Succession & Probate',
    icon: 'scroll',
    summary: 'Wills that will stand up, succession certificates, probate and inheritance disputes, settled with as little friction as possible.',
    body: [
      'A well-drafted will saves a family years. We draft wills that are clear about who gets what, and we help families take over assets when someone has passed away without one.',
      'Where an inheritance is disputed, we look for a family settlement first, and represent you in court when that is not possible.',
    ],
    offerings: [
      { title: 'Drafting wills', body: 'Wills with proper attestation, and optional registration for added certainty.' },
      { title: 'Succession certificates', body: 'Certificates to collect debts, deposits and securities of a deceased person.' },
      { title: 'Probate and letters of administration', body: 'Applications to prove a will in court where required or advisable.' },
      { title: 'Family settlements', body: 'Recording agreed division among heirs so it is binding.' },
      { title: 'Inheritance disputes', body: 'Challenges to wills and claims by legal heirs, including daughters’ coparcenary rights.' },
    ],
    approach: 'We map every asset and every heir on one sheet before advising, so nothing is missed and nobody is surprised.',
    forums: ['Civil courts across India', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'Does a will have to be registered?',
        a: 'No. A will is valid if it is in writing, signed by the testator and attested by two witnesses. Registration is optional but makes it harder to dispute.',
      },
      {
        q: 'Do I need probate in Haryana?',
        a: 'Probate is not mandatory for wills made in Haryana, but it can be useful where the will may be challenged or an institution asks for it.',
      },
      {
        q: 'Do daughters have an equal share in ancestral property?',
        a: 'Yes. Since the 2005 amendment to the Hindu Succession Act, daughters are coparceners by birth with the same rights as sons, as confirmed by the Supreme Court in 2020.',
      },
    ],
  },
  {
    slug: 'consumer-protection',
    title: 'Consumer Protection',
    icon: 'shield',
    summary: 'Complaints for defective goods, poor services, insurance claims and medical negligence before the consumer commissions.',
    body: [
      'Consumer commissions exist so that ordinary people can hold sellers, builders, banks and insurers to account without a long civil suit. We help you file a complaint that is complete the first time.',
      'We also defend businesses and professionals against complaints, and handle appeals before the State Commission.',
    ],
    offerings: [
      { title: 'Defective goods and services', body: 'Refunds, replacement and compensation for deficiencies.' },
      { title: 'Insurance claims', body: 'Claims wrongly rejected or settled for less than they should be.' },
      { title: 'Banking and finance', body: 'Unfair charges and service failures by banks and lenders.' },
      { title: 'Medical negligence', body: 'Complaints and defence where treatment fell below the expected standard.' },
      { title: 'Appeals', body: 'Appeals against District Commission orders before the State Commission.' },
    ],
    approach: 'We collect every bill, email and policy document first, and file only when the record is complete.',
    forums: ['District Consumer Commissions', 'State Consumer Commissions'],
    faqs: [
      {
        q: 'Which commission do I file in?',
        a: 'It depends on the value paid. The District Commission hears claims up to ₹50 lakh, the State Commission above ₹50 lakh up to ₹2 crore, and the National Commission above ₹2 crore.',
      },
      {
        q: 'Is there a time limit?',
        a: 'A complaint should be filed within two years of the cause of action. Delay can be condoned only for sufficient cause.',
      },
      {
        q: 'Can I file online?',
        a: 'Yes. Complaints can be filed through the e-Daakhil portal.',
      },
    ],
  },
  {
    slug: 'service-matters',
    title: 'Service Matters',
    icon: 'briefcase',
    summary: 'Appointment, promotion, seniority, pay and pension disputes of government and public-sector employees.',
    body: [
      'Employees of the government and public bodies often have the strongest claims and the least time to pursue them. We take on service disputes from the departmental representation onwards.',
      'Most of this work is argued in writ petitions before the Punjab & Haryana High Court, and before the Central Administrative Tribunal for central government employees.',
    ],
    offerings: [
      { title: 'Recruitment and appointment', body: 'Challenges to selection processes and appointments.' },
      { title: 'Promotion and seniority', body: 'Disputes over seniority lists, promotions and confirmation.' },
      { title: 'Pay and pension', body: 'Pay fixation, arrears, pension and retirement benefits.' },
      { title: 'Disciplinary proceedings', body: 'Defence in inquiries and challenges to penalties.' },
      { title: 'Transfers and regularisation', body: 'Arbitrary transfers and claims for regularisation of service.' },
    ],
    approach: 'We begin with the rules that govern your service and the representation you made, because the strongest writ petitions are built on that record.',
    forums: ['Punjab & Haryana High Court', 'Central Administrative Tribunal, Chandigarh'],
    faqs: [
      {
        q: 'Do I need to make a representation before going to court?',
        a: 'Usually it helps. Courts generally expect the department to have been given a chance to decide your grievance first.',
      },
      {
        q: 'Where do central government employees file?',
        a: 'Most service disputes of central government employees go first to the Central Administrative Tribunal, with a writ petition to the High Court against its order.',
      },
      {
        q: 'Is there a time limit?',
        a: 'Delay can defeat a service claim, particularly for one-time actions like promotion. Recurring claims such as pay may be treated differently, but it is best not to wait.',
      },
    ],
  },
  {
    slug: 'writs-constitutional',
    title: 'Writ Petitions & Constitutional Law',
    icon: 'landmark',
    summary: 'Writ petitions under Article 226 against the State, its departments and authorities, including urgent protection.',
    body: [
      'When a government department, board or authority acts unlawfully or fails to act at all, the High Court’s writ jurisdiction is often the fastest effective remedy.',
      'We draft and argue writ petitions before the Punjab & Haryana High Court, from licensing and tender disputes to protection petitions and habeas corpus.',
    ],
    offerings: [
      { title: 'Mandamus', body: 'Directing an authority to perform a duty it is avoiding.' },
      { title: 'Certiorari', body: 'Quashing orders passed without jurisdiction or in breach of natural justice.' },
      { title: 'Habeas corpus', body: 'Urgent petitions for the production of a person unlawfully detained.' },
      { title: 'Protection petitions', body: 'Protection of life and liberty, including for couples facing threats.' },
      { title: 'Licensing and tenders', body: 'Arbitrary cancellations, refusals and tender decisions.' },
    ],
    approach: 'We check whether an alternative remedy exists first, so that your petition is not dismissed at the threshold.',
    forums: ['Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'Against whom can a writ petition be filed?',
        a: 'Against the State, its departments and bodies that perform public functions. Purely private disputes generally belong in the civil courts.',
      },
      {
        q: 'How quickly can a writ petition be heard?',
        a: 'Urgent matters can be mentioned for early listing. Many petitions are taken up within days of filing.',
      },
      {
        q: 'Will the court refuse if I have another remedy?',
        a: 'Often, yes. Where an effective statutory appeal exists, the High Court usually asks you to use it, unless there is a breach of fundamental rights or natural justice.',
      },
    ],
  },
  {
    slug: 'banking-recovery-insolvency',
    title: 'Banking, Recovery & Insolvency',
    icon: 'bank',
    summary: 'SARFAESI actions, Debts Recovery Tribunal proceedings, one-time settlements and insolvency before the NCLT.',
    body: [
      'For borrowers, a SARFAESI notice can put a home or a factory at risk within weeks. For creditors, recovery depends on choosing the right forum early. We act for both.',
      'We appear before the Debts Recovery Tribunals and the NCLT bench at Chandigarh, and in writ petitions before the High Court.',
    ],
    offerings: [
      { title: 'SARFAESI defence', body: 'Objections to demand notices and applications under Section 17 before the DRT.' },
      { title: 'Recovery proceedings', body: 'Original applications and their defence before the Debts Recovery Tribunal.' },
      { title: 'One-time settlements', body: 'Negotiating and documenting settlements with banks.' },
      { title: 'Insolvency', body: 'Petitions and claims under the Insolvency and Bankruptcy Code, 2016.' },
      { title: 'Guarantor matters', body: 'Personal guarantor proceedings and their defence.' },
    ],
    approach: 'We check the bank’s notices and timelines line by line, because procedural defects are often a borrower’s strongest point.',
    forums: ['Debts Recovery Tribunals, Chandigarh', 'NCLT, Chandigarh', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'The bank has sent a SARFAESI notice. What now?',
        a: 'You have 60 days to pay or respond, and you may raise objections, which the bank must answer. If it takes possession, you can apply to the Debts Recovery Tribunal under Section 17.',
      },
      {
        q: 'Can I still settle with the bank?',
        a: 'Often, yes. Banks consider one-time settlements at most stages, and a proper proposal can stop further action.',
      },
      {
        q: 'Who can start insolvency against a company?',
        a: 'A financial creditor, an operational creditor or the company itself can apply to the NCLT, subject to the minimum default threshold in force.',
      },
    ],
  },
  {
    slug: 'land-revenue',
    title: 'Land Acquisition & Revenue',
    icon: 'map',
    summary: 'Compensation in land acquisition, mutation, demarcation and partition of agricultural land before revenue courts.',
    body: [
      'Agricultural land in Haryana is governed as much by revenue records as by deeds. Errors in those records, or a low acquisition award, can cost a family dearly.',
      'We handle mutation, demarcation and partition before revenue officers, references for enhanced compensation, and appeals before the High Court.',
    ],
    offerings: [
      { title: 'Enhanced compensation', body: 'References and appeals for fair compensation in land acquisition.' },
      { title: 'Mutation', body: 'Getting revenue entries corrected after sale, inheritance or a court decree.' },
      { title: 'Demarcation', body: 'Fixing boundaries when neighbours disagree.' },
      { title: 'Partition of land', body: 'Partition of joint agricultural holdings before revenue courts.' },
      { title: 'Revenue appeals', body: 'Appeals and revisions before the Collector, Commissioner and Financial Commissioner.' },
    ],
    approach: 'We start with certified copies of the revenue record, because most land disputes are won or lost on what those entries say.',
    forums: ['Revenue courts', 'Reference courts', 'Punjab & Haryana High Court'],
    faqs: [
      {
        q: 'The compensation for my acquired land is too low. Can it be increased?',
        a: 'Yes. You can seek a reference to the court for enhanced compensation within the time allowed after the award, and appeal further to the High Court.',
      },
      {
        q: 'How do I correct a wrong entry in the jamabandi?',
        a: 'By applying to the revenue authorities with the documents that support the correct entry. Contested corrections are decided by revenue officers, with appeals above them.',
      },
      {
        q: 'Can joint agricultural land be partitioned without a civil suit?',
        a: 'Yes. Partition of agricultural land can be sought before the revenue courts under the Punjab Land Revenue Act, 1887, which applies in Haryana.',
      },
    ],
  },
]

export const practiceBySlug = (slug: string | undefined) => practiceAreas.find((p) => p.slug === slug)
