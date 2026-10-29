import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Button, SelectField, TextArea, TextField } from '../../design-system'
import { contact, matterTypes } from '../data'
import styles from './ContactForm.module.css'

type Errors = Partial<Record<'name' | 'phone' | 'matter', string>>

/** Call-back request. Front end only in the mock-up: nothing is sent anywhere yet. */
export function ContactForm({ defaultMatter = '' }: { defaultMatter?: string }) {
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

  if (sent) {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneIcon} aria-hidden="true">
          <Check />
        </span>
        <h3 className={styles.doneTitle}>Request received</h3>
        <p>
          Thank you, {sent}. A member of the chambers will call you within one working day. If it is urgent, such as an
          arrest or a hearing tomorrow, call us on {contact.phone}.
        </p>
        <Button variant="ghost" onClick={() => setSent(null)}>
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <TextField name="name" label="Full name" autoComplete="name" error={errors.name} />
      <TextField
        name="phone"
        label="Phone or WhatsApp"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        hint={`We call from ${contact.phone}.`}
        error={errors.phone}
      />
      <TextField name="email" label="Email (optional)" type="email" autoComplete="email" />
      <SelectField
        name="matter"
        label="What is it about?"
        placeholder="Choose one"
        defaultValue={defaultMatter}
        options={matterTypes}
        error={errors.matter}
      />
      <TextArea
        className={styles.wide}
        name="message"
        label="Describe your matter briefly"
        hint="Optional. Don’t include anything you wouldn’t want in an email."
      />
      <div className={styles.submit}>
        <Button type="submit" size="lg" icon={<ArrowUpRight />}>
          Request a call back
        </Button>
      </div>
    </form>
  )
}
