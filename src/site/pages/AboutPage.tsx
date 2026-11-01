import { Link } from 'react-router-dom'
import { CtaBanner } from '../components/CtaBanner'
import { PageBanner } from '../components/PageBanner'
import { PracticeArt } from '../components/PracticeArt'
import { photos } from '../content/photos'
import { about, offices } from '../data'
import { Particles } from '../motion/Particles'
import { ScrollText } from '../motion/ScrollText'
import { Team } from '../sections/Team'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './AboutPage.module.css'

const principles = [
  { title: 'One partner, start to finish', body: 'The partner you first meet leads your matter and appears for the hearings.' },
  { title: 'Plain words', body: 'You hear what the law says about your situation without jargon, including when the honest answer is “don’t litigate”.' },
  { title: 'Fees agreed upfront', body: 'Drafting is quoted as a fixed fee; court work is billed per appearance, set out before work starts.' },
  { title: 'A call after every hearing', body: 'The same evening, you hear what happened and what comes next.' },
]

/** /about — after legacylawoffices.com/about-our-company, with Why us and Our values from duaassociates.com/about-us. */
export function AboutPage() {
  usePageTitle('About us')
  return (
    <>
      <PageBanner
        title="About Leeladhar Law Chambers"
        lead={`${about.question} ${about.answer}`}
        crumbs={[{ label: 'About us' }]}
        photo={photos.courtroom}
      />

      <section id="story" className={page.section} aria-labelledby="who">
        <div className={`container ${styles.split}`}>
          <div className={styles.artWrap} data-reveal="wipe">
            <PracticeArt icon="landmark" index={0} photo={photos.lawBooks} className={styles.art} />
          </div>
          <div>
            <h2 id="who" className="t-h1" data-reveal>
              Who we are
            </h2>
            <span className={page.rule} aria-hidden="true" data-reveal="wipe" />
            <div className={`${page.prose} ${styles.copy}`}>
              <ScrollText className={styles.vision} text={about.intro} />
              {about.story.map((p) => (
                <ScrollText key={p} text={p} />
              ))}
            </div>
            <ul role="list" className={styles.places} data-reveal="stagger">
              {offices.map((o) => (
                <li key={o.slug}>
                  <Link to={`/locations/${o.slug}`}>
                    <strong>{o.city}</strong>
                    <span>{o.lines.join(', ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.legacy} aria-label="Our motto">
        <Particles tone="dark" density={0.8} />
        <div className={`container ${styles.legacyInner}`}>
          <ScrollText
            tone="dark"
            className={styles.legacyQuote}
            text="Because the right solution begins with **asking the right questions**."
          />
          <p className={styles.legacyTagline} data-reveal style={{ ['--reveal-delay' as string]: '180ms' }}>
            Decoding Law <span aria-hidden="true">|</span>
            <span className="visually-hidden">,</span> Delivering Solutions
          </p>
        </div>
      </section>

      <section className={page.section} aria-labelledby="principles">
        <div className={`container ${styles.split}`}>
          <div className={styles.artWrap} data-reveal="wipe">
            <PracticeArt icon="scale" index={1} photo={photos.ladyJustice} className={styles.art} />
          </div>
          <div>
            <h2 id="principles" className="t-h1" data-reveal>
              A practice defined by care and candour
            </h2>
            <p className={`t-lead ${styles.lead}`}>
              What clients can expect from us, whichever court in India their matter is in.
            </p>
            <ul role="list" className={styles.principles} data-reveal="stagger">
              {principles.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong> – {p.body}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="why-us" className={`${page.section} ${page.sunken}`} aria-labelledby="why-us-title">
        <div className={`container ${styles.split} ${styles.flip}`}>
          <div>
            <h2 id="why-us-title" className="t-h1" data-reveal>
              Why us
            </h2>
            <span className={page.rule} aria-hidden="true" data-reveal="wipe" />
            <div className={`${page.prose} ${styles.copy}`} data-reveal="stagger">
              <p>
                Large firms divide a matter among many hands. We keep it with one partner who knows the file, the court
                and you, and who is reachable on the phone.
              </p>
              <p>
                Because we practise in both the trial courts and the High Court, we draft every pleading with the appeal
                in mind, and we argue every appeal knowing exactly how the record was built.
              </p>
            </div>
          </div>
          <div className={styles.artWrap} data-reveal="wipe">
            <PracticeArt icon="handshake" index={2} photo={photos.handshake} className={styles.art} />
          </div>
        </div>
      </section>

      <section id="values" className={page.section} aria-labelledby="values-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.artWrap} data-reveal="wipe">
            <PracticeArt icon="shield" index={0} photo={photos.justiceStatue} className={styles.art} />
          </div>
          <div>
            <h2 id="values-title" className="t-h1" data-reveal>
              Our values
            </h2>
            <span className={page.rule} aria-hidden="true" data-reveal="wipe" />
            <div className={`${page.prose} ${styles.copy}`} data-reveal="stagger">
              <p>
                We conduct our practice in keeping with the Bar Council of India’s standards of professional conduct:
                honesty with the court, confidentiality for the client and fairness to the other side.
              </p>
              <p>
                We do not promise outcomes. We promise preparation, candour about your chances, and that you will
                never have to chase us for an update.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Team />

      <CtaBanner />
    </>
  )
}
