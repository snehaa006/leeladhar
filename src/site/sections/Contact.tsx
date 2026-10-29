import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { Button, SelectField, TextArea, TextField } from '../../design-system'
import { contact, matterTypes, offices } from '../data'
import styles from './Contact.module.css'

type Errors = Partial<Record<'name' | 'phone' | 'matter', string>>

export function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<string | null>(null)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const matter = String(data.get('matter') ?? '')

    const next: Errors = {}
    if (!name) next.name = 'Enter your name so we know who to ask for.'
    if (phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a phone number with at least 10 digits.'
    if (!matter) next.matter = 'Choose the closest match. You can explain more below.'
    setErrors(next)

    if (Object.keys(next).length === 0) setSent(name.split(' ')[0])
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.block}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h2 id="contact-title" className="t-h1">
              Tell us what’s happening. We’ll tell you where you stand.
            </h2>
            <p className={`t-lead ${styles.lead}`}>
              Leave your number and a line about the matter. A member of the chambers calls back within one working
              day.
            </p>
            <ul role="list" className={styles.offices} aria-label="Our chambers">
              {offices.map((o) => (
                <li key={o.id} className={styles.office}>
                  <MapPin aria-hidden="true" />
                  <div>
                    <p className={styles.officeCity}>{o.city}</p>
                    <p className={styles.officeLines}>
                      {o.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className={styles.details}>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{contact.hours}</dd>
              </div>
            </dl>
          </div>

          {sent ? (
            <div className={styles.done} role="status">
              <span className={styles.doneIcon} aria-hidden="true">
                <Check />
              </span>
              <h3 className={styles.doneTitle}>Request received</h3>
              <p>
                Thank you, {sent}. A member of the chambers will call you within one working day. If it is urgent —
                an arrest, or a hearing tomorrow — call us on {contact.phone}.
              </p>
              <Button variant="ghost-dark" onClick={() => setSent(null)}>
                Send another request
              </Button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <TextField tone="dark" name="name" label="Your name" autoComplete="name" error={errors.name} />
              <TextField
                tone="dark"
                name="phone"
                label="Phone or WhatsApp"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                hint={`We call from ${contact.phone}.`}
                error={errors.phone}
              />
              <SelectField
                tone="dark"
                name="matter"
                label="What is it about?"
                placeholder="Choose one"
                defaultValue=""
                options={matterTypes}
                error={errors.matter}
              />
              <TextField tone="dark" name="city" label="City" autoComplete="address-level2" />
              <TextArea
                tone="dark"
                className={styles.wide}
                name="message"
                label="A few lines about the matter"
                hint="Optional. Don’t include anything you wouldn’t want in an email."
              />
              <div className={styles.submit}>
                <Button type="submit" size="lg" icon={<ArrowUpRight />}>
                  Request a call back
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
