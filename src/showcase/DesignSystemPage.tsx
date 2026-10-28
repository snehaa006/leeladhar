import { useState } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import {
  Accordion,
  Button,
  Chip,
  Dialog,
  FilterChip,
  Logo,
  Note,
  Orbit,
  Portrait,
  SelectField,
  StatRings,
  Tabs,
  TextArea,
  TextField,
  contrastRatio,
  groupInfo,
  tokens,
  tokensIn,
  wcagLevel,
  type Token,
} from '../design-system'
import styles from './DesignSystemPage.module.css'

const sections = [
  { id: 'principles', label: 'Principles' },
  { id: 'logo', label: 'Logo' },
  { id: 'color', label: 'Colour' },
  { id: 'type', label: 'Typography' },
  { id: 'space', label: 'Space, radius, depth' },
  { id: 'motifs', label: 'Motifs' },
  { id: 'components', label: 'Components' },
  { id: 'tokens', label: 'Token library' },
]

const ramps = ['cream', 'mint', 'chamber', 'patina', 'ink', 'seal', 'brass']

const pairs: [string, string, string][] = [
  ['ink-900', 'cream-100', 'Ink on cream'],
  ['ink-700', 'cream-100', 'Secondary text on cream'],
  ['ink-500', 'cream-100', 'Muted text on cream'],
  ['ink-900', 'mint-400', 'Ink on mint (primary button)'],
  ['mint-700', 'cream-100', 'Mint text on cream'],
  ['mint-400', 'chamber-900', 'Mint on chamber'],
  ['cream-100', 'chamber-900', 'Cream on chamber'],
  ['mint-400', 'cream-100', 'Mint on cream'],
]

const hex = (name: string) => tokens.find((t) => t.name === name)!.resolved

const typeSamples: Record<string, [string, string]> = {
  display: ['t-display', 'Navigating the law'],
  '3xl': ['t-h1', 'Solutions shaped around you'],
  '2xl': ['t-h2', 'People who stand beside you'],
  xl: ['t-h3', 'Shareholders’ agreements'],
  lg: ['t-lead', 'We read the fine print so your decision is a clear one.'],
  base: ['t-body', 'Every matter gets a written strategy note within three working days.'],
  sm: ['t-small', 'Enrolled with the Bar Council of Delhi, 2001'],
  micro: ['t-margin', 'Solutions that protect'],
}

const portrait = 'https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?auto=format&fit=crop&w=600&q=70'

export function DesignSystemPage() {
  const [tab, setTab] = useState('one')
  const [filter, setFilter] = useState('all')
  const [dialog, setDialog] = useState(false)

  const semantic = tokens.filter((t) => t.tier === 'semantic') as readonly Token[]
  const sizes = tokensIn('text').filter((t) => t.type === 'dimension')
  const space = tokensIn('space')
  const radii = tokensIn('radius')

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <a href="/" className={styles.back}>
          <ArrowLeft aria-hidden="true" />
          Back to the site
        </a>
        <Logo size={30} />
        <Button href="http://localhost:6006" target="_blank" rel="noreferrer" size="sm" variant="secondary" icon={<ArrowUpRight />}>
          Open Storybook
        </Button>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="Design system sections">
          <ul role="list">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <main className={styles.main}>
          <section className={styles.intro}>
            <Orbit
              className={styles.introOrbit}
              viewBox="0 0 1000 420"
              rings={[
                { cx: 860, cy: 520, r: 380, nodes: [218, 250], live: 218 },
                { cx: 1040, cy: -40, r: 260 },
              ]}
            />
            <h1 className="t-display">Design system</h1>
            <p className={`t-lead ${styles.introLead}`}>
              The visual language of Leeladhar Law Chambers: cream from the Mosey reference, mint sampled from the
              stage light of the Legal Point conference, and the orbital lines of its screen — held together by the
              monogram’s teal.
            </p>
            <p className={styles.counts}>
              <span>
                <strong className="t-evidence">{tokens.length}</strong> tokens
              </span>
              <span>
                <strong className="t-evidence">11</strong> components
              </span>
              <span>
                <strong className="t-evidence">2</strong> typefaces
              </span>
            </p>
          </section>

          {/* ── Principles ─────────────────────────────────────── */}
          <section id="principles" className={styles.section}>
            <h2 className="t-h2">Principles</h2>
            <ul role="list" className={styles.principles}>
              <li>
                <h3>Cream is the room, mint is the light</h3>
                <p>
                  Pages sit on cream. Mint appears only where something is live or can be acted on: the main button,
                  a matter in progress, a focus ring, the glow under a dark block.
                </p>
              </li>
              <li>
                <h3>Archivo speaks, Bodoni testifies</h3>
                <p>
                  Everything is set in Archivo, stretched wider as it gets more important. Bodoni Moda — the serif of
                  the monogram’s L — is kept for figures and quotations: the evidence.
                </p>
              </li>
              <li>
                <h3>Lines connect</h3>
                <p>
                  Orbital lines and their nodes link related facts — the steps of a matter, the stats of the firm. If
                  a line joins nothing, remove it.
                </p>
              </li>
              <li>
                <h3>Radius follows size</h3>
                <p>Pills for things you press, 14px for photographs, 20px for panels, 32px for whole dark blocks.</p>
              </li>
            </ul>
          </section>

          {/* ── Logo ───────────────────────────────────────────── */}
          <section id="logo" className={styles.section}>
            <h2 className="t-h2">Logo</h2>
            <p className={styles.sectionLead}>
              The monogram is cut as a mask from the supplied artwork, so it takes any token colour. Use the lockup in
              navigation and the footer, and the mark alone from 24px up.
            </p>
            <div className={styles.logoGrid}>
              <figure className={styles.logoTile} data-bg="cream">
                <Logo size={56} tone="ink" />
                <figcaption>Ink on cream</figcaption>
              </figure>
              <figure className={styles.logoTile} data-bg="chamber">
                <Logo size={56} tone="patina" />
                <figcaption>Patina on chamber</figcaption>
              </figure>
              <figure className={styles.logoTile} data-bg="mint">
                <Logo variant="mark" size={88} tone="ink" />
                <figcaption>Mark on mint</figcaption>
              </figure>
              <figure className={styles.logoTile} data-bg="deep">
                <Logo variant="mark" size={88} tone="mint" />
                <figcaption>Mint mark, for stage moments</figcaption>
              </figure>
            </div>
          </section>

          {/* ── Colour ─────────────────────────────────────────── */}
          <section id="color" className={styles.section}>
            <h2 className="t-h2">Colour</h2>
            <p className={styles.sectionLead}>
              Primitive ramps. Components never use these directly — they use the roles further down.
            </p>
            <div className={styles.ramps}>
              {ramps.map((r) => {
                const info = groupInfo(r)
                return (
                  <div key={r} className={styles.ramp}>
                    <div className={styles.rampHead}>
                      <h3>{r[0].toUpperCase() + r.slice(1)}</h3>
                      <p>{info?.description}</p>
                    </div>
                    <ul role="list" className={styles.swatches}>
                      {tokensIn(r).map((t) => (
                        <li key={t.name} className={styles.swatch}>
                          <span className={styles.chip} style={{ background: t.resolved }} />
                          <span className={styles.swName}>{t.path[t.path.length - 1]}</span>
                          <code>{t.resolved}</code>
                          {t.description && <span className={styles.swNote}>{t.description}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <h3 className={`t-h3 ${styles.sub}`}>Roles</h3>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Token</th>
                    <th scope="col">Points to</th>
                    <th scope="col">Value</th>
                    <th scope="col">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {semantic.map((t) => (
                    <tr key={t.name}>
                      <td>
                        <code>{t.cssVar}</code>
                      </td>
                      <td>{t.alias ? <code>--{t.alias}</code> : '—'}</td>
                      <td>
                        <span className={styles.inlineSwatch} style={{ background: t.resolved }} />
                        <code>{t.resolved}</code>
                      </td>
                      <td>{t.description ?? groupInfo(t.path[0])?.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={`t-h3 ${styles.sub}`}>Contrast</h3>
            <ul role="list" className={styles.pairs}>
              {pairs.map(([fg, bg, label]) => {
                const ratio = contrastRatio(hex(fg), hex(bg))
                const level = wcagLevel(ratio)
                return (
                  <li key={label} className={styles.pair} style={{ background: hex(bg), color: hex(fg) }}>
                    <span className={styles.pairSample}>Aa</span>
                    <span className={styles.pairLabel}>{label}</span>
                    <span className={styles.pairRatio}>
                      {ratio.toFixed(1)}:1, {level === 'Fail' ? 'never for text' : level}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* ── Typography ─────────────────────────────────────── */}
          <section id="type" className={styles.section}>
            <h2 className="t-h2">Typography</h2>
            <div className={styles.faces}>
              <div className={styles.face}>
                <p className={styles.faceName}>Archivo</p>
                <p className={styles.faceUse}>Everything you read. Width grows with importance.</p>
                <p className={styles.widths}>
                  <span style={{ fontStretch: '100%' }}>Normal 100</span>
                  <span style={{ fontStretch: '112%' }}>Wide 112</span>
                  <span style={{ fontStretch: '125%' }}>Expanded 125</span>
                </p>
              </div>
              <div className={styles.face} data-dark>
                <p className={`${styles.faceName} ${styles.bodoni}`}>Bodoni Moda</p>
                <p className={styles.faceUse}>Figures and quotations only.</p>
                <p className={`t-evidence ${styles.numerals}`}>0123456789</p>
              </div>
            </div>

            <ul role="list" className={styles.scale}>
              {sizes.map((t) => {
                const [cls, text] = typeSamples[t.path[1]] ?? ['t-body', 'Sample']
                return (
                  <li key={t.name} className={styles.scaleRow}>
                    <div className={styles.scaleMeta}>
                      <code>{t.cssVar}</code>
                      <span>{t.description}</span>
                      <span>.{cls}</span>
                    </div>
                    <p className={cls}>{text}</p>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* ── Space, radius, depth ───────────────────────────── */}
          <section id="space" className={styles.section}>
            <h2 className="t-h2">Space, radius, depth</h2>
            <div className={styles.threeCol}>
              <div>
                <h3 className={styles.miniTitle}>Space</h3>
                <ul role="list" className={styles.spaceList}>
                  {space.map((t) => (
                    <li key={t.name}>
                      <code>{t.cssVar}</code>
                      <span className={styles.spaceBar} style={{ width: t.resolved }} />
                      <span>{t.resolved}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.miniTitle}>Radius</h3>
                <ul role="list" className={styles.radiusList}>
                  {radii.map((t) => (
                    <li key={t.name}>
                      <span className={styles.radiusTile} style={{ borderTopLeftRadius: t.resolved }} />
                      <code>{t.cssVar}</code>
                      <span>{t.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.miniTitle}>Depth</h3>
                <div className={styles.depth}>
                  <div style={{ boxShadow: 'var(--shadow-note)' }}>
                    <code>--shadow-note</code>
                  </div>
                  <div style={{ boxShadow: 'var(--shadow-panel)' }}>
                    <code>--shadow-panel</code>
                  </div>
                  <div style={{ boxShadow: 'var(--glow-mint)' }}>
                    <code>--glow-mint</code>
                  </div>
                  <div className={styles.stage}>
                    <code>--glow-stage</code>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Motifs ─────────────────────────────────────────── */}
          <section id="motifs" className={styles.section}>
            <h2 className="t-h2">Motifs</h2>
            <div className={styles.motifs}>
              <figure className={styles.motif}>
                <div className={styles.motifStage}>
                  <Orbit
                    viewBox="0 0 400 260"
                    rings={[
                      { cx: 40, cy: 300, r: 250, nodes: [-40, -70], live: -40 },
                      { cx: 420, cy: 40, r: 170, nodes: [150] },
                    ]}
                  />
                </div>
                <figcaption>
                  <strong>Orbit.</strong> The conference screen’s arcs. One live node per view, in mint.
                </figcaption>
              </figure>
              <figure className={styles.motif}>
                <div className={`${styles.motifStage} ${styles.motifPortrait}`}>
                  <Portrait src={portrait} alt="Duotone portrait sample" badge="Sana Qureshi" aspect="4/5" />
                </div>
                <figcaption>
                  <strong>Duotone.</strong> Chamber to cream, so every photograph belongs to the same set.
                </figcaption>
              </figure>
              <figure className={styles.motif}>
                <div className={`${styles.motifStage} ${styles.motifNotes}`}>
                  <Note title="Interim relief granted" meta="Delhi High Court" />
                  <Note status="active" title="Strategy note sent" meta="Two days after the call" />
                  <Note tone="dark" status="awaiting" title="Next hearing, 4 December" meta="Rent Controller" />
                </div>
                <figcaption>
                  <strong>Matter notes.</strong> One fact each, after Mosey’s floating cards.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ── Components ─────────────────────────────────────── */}
          <section id="components" className={styles.section}>
            <h2 className="t-h2">Components</h2>
            <p className={styles.sectionLead}>
              Live components from <code>src/design-system/components</code>. Every prop and state is documented in
              Storybook.
            </p>

            <div className={styles.specimen}>
              <h3 className={styles.miniTitle}>Button</h3>
              <div className={styles.row}>
                <Button icon={<ArrowUpRight />}>Book a consultation</Button>
                <Button variant="secondary" icon={<ArrowUpRight />}>
                  Talk to us
                </Button>
                <Button variant="ghost">Find your solution</Button>
                <Button variant="link">Read the strategy note</Button>
                <Button disabled>Disabled</Button>
              </div>
              <div className={styles.row}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className={styles.specimen}>
              <h3 className={styles.miniTitle}>Chip and filter chip</h3>
              <div className={styles.row}>
                <Chip>Supreme Court</Chip>
                <Chip>NCLT</Chip>
                <Chip>Hindi</Chip>
              </div>
              <div className={styles.row}>
                {['all', 'corporate', 'disputes'].map((f, i) => (
                  <FilterChip key={f} selected={filter === f} count={[6, 2, 1][i]} onClick={() => setFilter(f)}>
                    {['Everyone', 'Corporate', 'Disputes'][i]}
                  </FilterChip>
                ))}
              </div>
            </div>

            <div className={styles.specimen}>
              <h3 className={styles.miniTitle}>Tabs</h3>
              <Tabs
                label="Example tabs"
                items={[
                  { id: 'one', label: 'Founders & startups' },
                  { id: 'two', label: 'Businesses' },
                  { id: 'three', label: 'Families' },
                ]}
                value={tab}
                onChange={setTab}
              >
                {(id) => <p className={styles.tabBody}>Panel for “{id}”. Use the arrow keys to move between tabs.</p>}
              </Tabs>
            </div>

            <div className={styles.twoCol}>
              <div className={styles.specimen}>
                <h3 className={styles.miniTitle}>Accordion, cards</h3>
                <Accordion
                  defaultOpen="a"
                  items={[
                    {
                      id: 'a',
                      title: 'What happens in the first consultation?',
                      content: 'We listen and tell you honestly whether you need a lawyer at all.',
                    },
                    { id: 'b', title: 'How are fees decided?', content: 'Fixed for drafting, per appearance for litigation.' },
                  ]}
                />
              </div>
              <div className={`${styles.specimen} ${styles.darkSpecimen}`}>
                <h3 className={styles.miniTitle}>Accordion, list on dark</h3>
                <Accordion
                  tone="dark"
                  variant="list"
                  items={[
                    {
                      id: 'a',
                      title: 'Corporate & commercial',
                      aside: <Chip tone="dark">ROC</Chip>,
                      content: 'Company formation and investment documentation.',
                    },
                    { id: 'b', title: 'Insolvency', aside: <Chip tone="dark">NCLT</Chip>, content: 'Proceedings under the IBC.' },
                  ]}
                />
              </div>
            </div>

            <div className={styles.specimen}>
              <h3 className={styles.miniTitle}>Stat rings</h3>
              <StatRings
                stats={[
                  { value: '22', suffix: '+', label: 'Years in practice' },
                  { value: '3,400', suffix: '+', label: 'Matters closed' },
                  { value: '9', label: 'Courts and tribunals' },
                ]}
              />
            </div>

            <div className={styles.twoCol}>
              <div className={styles.specimen}>
                <h3 className={styles.miniTitle}>Fields</h3>
                <div className={styles.fields}>
                  <TextField label="Your name" placeholder="Full name" />
                  <TextField
                    label="Phone or WhatsApp"
                    defaultValue="98100"
                    error="Enter a phone number with at least 10 digits."
                  />
                  <SelectField
                    label="What is it about?"
                    placeholder="Choose one"
                    defaultValue=""
                    options={[{ value: 'p', label: 'Property' }]}
                  />
                  <TextArea label="A few lines" hint="Optional." rows={3} />
                </div>
              </div>
              <div className={`${styles.specimen} ${styles.darkSpecimen}`}>
                <h3 className={styles.miniTitle}>Fields on dark</h3>
                <div className={styles.fields}>
                  <TextField tone="dark" label="Your name" placeholder="Full name" />
                  <TextField tone="dark" label="Phone" hint="We call from a Delhi landline." />
                </div>
                <h3 className={`${styles.miniTitle} ${styles.spaced}`}>Dialog</h3>
                <Button variant="ghost-dark" onClick={() => setDialog(true)}>
                  Open the disclaimer dialog
                </Button>
                <Dialog
                  open={dialog}
                  onClose={() => setDialog(false)}
                  title="Before you continue"
                  actions={<Button onClick={() => setDialog(false)}>I agree</Button>}
                >
                  <p>The Bar Council of India does not permit advocates to advertise or solicit work.</p>
                </Dialog>
              </div>
            </div>
          </section>

          {/* ── Token library ──────────────────────────────────── */}
          <section id="tokens" className={styles.section}>
            <h2 className="t-h2">Token library</h2>
            <p className={styles.sectionLead}>
              Tokens are written once, in W3C design-token JSON under <code>/tokens</code>, then built into CSS
              variables, a typed TypeScript module and a flat JSON file.
            </p>
            <div className={styles.codeGrid}>
              <pre className={styles.code}>
                <code>{`tokens/
  color.primitives.json   ramps
  color.semantic.json     roles → {mint.400}
  typography.json
  layout.json
  effects.json

npm run tokens
→ src/design-system/tokens/tokens.css
→ src/design-system/tokens/tokens.ts
→ src/design-system/tokens/tokens.json`}</code>
              </pre>
              <pre className={styles.code}>
                <code>{`/* CSS */
.card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-panel);
}

// TypeScript
import { cssVar, tokenValue } from './design-system'

cssVar('accent')      // 'var(--accent)'
tokenValue('accent')  // '#62E8B3'`}</code>
              </pre>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
