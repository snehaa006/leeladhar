import { useSearchParams } from 'react-router-dom'
import { CalendarDays, MapPin } from 'lucide-react'
import { FilterChip } from '../../design-system'
import { CtaBanner } from '../components/CtaBanner'
import { PageBanner } from '../components/PageBanner'
import { formatDate } from '../content/insights'
import { eventCategories, events, type EventCategory } from '../content/events'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './EventsPage.module.css'

/** /events?category=… — events, CSR, pro bono and media, after the Events menu on duaassociates.com. */
export function EventsPage() {
  const [params, setParams] = useSearchParams()
  const current = eventCategories.find((c) => c.id === (params.get('category') as EventCategory | null))
  usePageTitle(current ? `${current.label} | Events` : 'Events')

  const visible = [...events]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((e) => !current || e.category === current.id)

  const choose = (id: EventCategory | null) => setParams(id ? { category: id } : {})

  return (
    <>
      <PageBanner
        title={current ? current.label : 'Events'}
        lead="Talks, legal awareness sessions, pro bono work and the chambers in the media."
        crumbs={current ? [{ to: '/events', label: 'Events' }, { label: current.label }] : [{ label: 'Events' }]}
      />

      <section className={page.section} aria-labelledby="events-list">
        <div className="container">
          <h2 id="events-list" className="visually-hidden">
            {current ? current.label : 'All events'}
          </h2>
          <div className={styles.filters} role="group" aria-label="Filter events">
            <FilterChip selected={!current} count={events.length} onClick={() => choose(null)}>
              All
            </FilterChip>
            {eventCategories.map((c) => (
              <FilterChip
                key={c.id}
                selected={current?.id === c.id}
                count={events.filter((e) => e.category === c.id).length}
                onClick={() => choose(c.id)}
              >
                {c.label}
              </FilterChip>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className={`${page.empty} ${styles.list}`}>Nothing published under {current?.label} yet.</p>
          ) : (
            <ul role="list" className={`${page.grid2} ${styles.list}`}>
              {visible.map((e) => (
                <li key={e.id}>
                  <article className={styles.card}>
                    <div className={styles.date} aria-hidden="true">
                      <span>{new Date(e.date + 'T00:00:00').getDate()}</span>
                      {new Date(e.date + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className={styles.body}>
                      <p className={styles.kind}>{eventCategories.find((c) => c.id === e.category)?.label}</p>
                      <h3 className={styles.title}>{e.title}</h3>
                      <p>{e.body}</p>
                      <p className={styles.meta}>
                        <span>
                          <CalendarDays aria-hidden="true" />
                          <time dateTime={e.date}>{formatDate(e.date)}</time>
                        </span>
                        <span>
                          <MapPin aria-hidden="true" />
                          {e.place}
                        </span>
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
