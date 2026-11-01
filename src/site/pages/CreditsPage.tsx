import { PageBanner } from '../components/PageBanner'
import { photoCredits, photos } from '../content/photos'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './CreditsPage.module.css'

/** /credits — who took the photographs and under which licence, as their licences ask. */
export function CreditsPage() {
  usePageTitle('Photo credits')
  return (
    <>
      <PageBanner
        title="Photo credits"
        lead="The photographs on this site come from Wikimedia Commons, under the licences listed here."
        crumbs={[{ label: 'Photo credits' }]}
        photo={photos.lawReports}
      />
      <section className={page.section} aria-label="Photographs">
        <div className="container">
          <ul role="list" className={styles.list} data-reveal="stagger">
            {photoCredits.map((p) => (
              <li key={p.src} className={styles.item}>
                <img src={p.src} alt="" loading="lazy" decoding="async" />
                <div>
                  <a href={p.source} target="_blank" rel="noreferrer" className={styles.title}>
                    {p.title}
                  </a>
                  <p>
                    {p.author ? `${p.author} · ` : ''}
                    {p.licenseUrl ? (
                      <a href={p.licenseUrl} target="_blank" rel="noreferrer">
                        {p.license}
                      </a>
                    ) : (
                      p.license
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
