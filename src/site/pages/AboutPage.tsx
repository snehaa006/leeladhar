import { Link } from 'react-router-dom'
import { CtaBanner } from '../components/CtaBanner'
import { PageBanner } from '../components/PageBanner'
import { PracticeArt } from '../components/PracticeArt'
import { offices, practisingSince, yearsOfExperience } from '../data'
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
        lead={`First-generation lawyers, in practice since ${practisingSince}: ${yearsOfExperience()} years of preparation, plain advice and steady representation.`}
        crumbs={[{ label: 'About us' }]}
      />

      <section className={page.section} aria-labelledby="who">
        <div className={`container ${styles.split}`}>
          <PracticeArt icon="landmark" index={0} className={styles.art} />
          <div>
            <h2 id="who" className="t-h1">
              Who we are
            </h2>
            <span className={page.rule} aria-hidden="true" />
            <div className={`${page.prose} ${styles.copy}`}>
              <p>
                Leeladhar Law Chambers has been in practice since {practisingSince}, with chambers at the Punjab &amp;
                Haryana High Court in Chandigarh and the District Court in Panipat. Our practice is not limited to
                either city: we take on matters across India, for clients in Haryana, Rajasthan, Delhi, Maharashtra,
                Karnataka and beyond.
              </p>
              <p>
                A matter that begins in a trial court, a commercial suit, an MSME claim or a bail application, is
                carried to the High Court by the same team, without starting again with a new lawyer who has to learn
                the file.
              </p>
              <p>
                We act for manufacturers, exporters, traders, MSMEs, families and individuals, in commercial, civil,
                criminal, family, property, consumer, service and constitutional matters.{' '}
                <Link to="/practice-areas">See our practice areas</Link>.
              </p>
              <p>
                The chambers is now being constituted as a limited liability partnership (LLP), with its advocates as
                partners.
              </p>
            </div>
            <ul role="list" className={styles.places}>
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

      <section id="story" className={`${page.section} ${page.sunken}`} aria-labelledby="story-title">
        <div className={`container ${styles.split} ${styles.flip}`}>
          <div>
            <h2 id="story-title" className="t-h1">
              First-generation lawyers
            </h2>
            <span className={page.rule} aria-hidden="true" />
            <div className={`${page.prose} ${styles.copy}`}>
              <p>
                Neither of our partners was born into the profession. There was no family chamber to inherit, no
                senior’s practice handed down and no list of clients waiting. Since {practisingSince}, the practice has
                been built one matter at a time, on the strength of the work and on the word of clients who came back
                and sent others.
              </p>
              <p>
                That beginning shapes how we work. We remember walking into court without knowing anyone, so we explain
                every step and never assume a client already knows how the system works.
              </p>
              <p>
                It is also why we work so well with first-generation entrepreneurs: manufacturers, exporters and
                traders who built something from nothing and want advisers who understand what is at stake.
              </p>
            </div>
          </div>
          <PracticeArt icon="scroll" index={1} className={styles.art} />
        </div>
      </section>

      <section className={page.section} aria-labelledby="principles">
        <div className={`container ${styles.split}`}>
          <PracticeArt icon="scale" index={1} className={styles.art} />
          <div>
            <h2 id="principles" className="t-h1">
              A practice defined by care and candour
            </h2>
            <p className={`t-lead ${styles.lead}`}>
              What clients can expect from us, whichever court in India their matter is in.
            </p>
            <ul role="list" className={styles.principles}>
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
            <h2 id="why-us-title" className="t-h1">
              Why us
            </h2>
            <span className={page.rule} aria-hidden="true" />
            <div className={`${page.prose} ${styles.copy}`}>
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
          <PracticeArt icon="handshake" index={2} className={styles.art} />
        </div>
      </section>

      <section id="values" className={page.section} aria-labelledby="values-title">
        <div className={`container ${styles.split}`}>
          <PracticeArt icon="shield" index={0} className={styles.art} />
          <div>
            <h2 id="values-title" className="t-h1">
              Our values
            </h2>
            <span className={page.rule} aria-hidden="true" />
            <div className={`${page.prose} ${styles.copy}`}>
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
