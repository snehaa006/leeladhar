import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Upload } from 'lucide-react'
import { Button, SelectField, TextArea, TextField } from '../../design-system'
import { PageBanner } from '../components/PageBanner'
import { SectionHead } from '../components/SectionHead'
import { contact } from '../data'
import { usePageTitle } from '../usePageTitle'
import page from './Page.module.css'
import styles from './CareersPage.module.css'

const life = [
  {
    title: 'Real courtroom exposure',
    body: 'Interns and juniors attend hearings at the District Court and the High Court from the first week, not just the library.',
  },
  {
    title: 'Drafting that gets used',
    body: 'You draft notices, applications and petitions that are actually filed, with line-by-line feedback.',
  },
  {
    title: 'Two courts, one practice',
    body: 'See how a matter moves from a trial court to the High Court, for clients across India.',
  },
  {
    title: 'Close mentorship',
    body: 'A small chambers means you work directly with the advocates who lead every matter.',
  },
]

const roles = [
  { value: 'internship', label: 'Internship (law students)' },
  { value: 'junior', label: 'Junior advocate' },
  { value: 'clerk', label: 'Legal assistant / clerk' },
]

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'role' | 'resume', string>>

/** /careers — after legacylawoffices.com/careers. Front end only in the mock-up. */
export function CareersPage() {
  usePageTitle('Careers')
  const [errors, setErrors] = useState<Errors>({})
  const [fileName, setFileName] = useState('')
  const [sent, setSent] = useState<string | null>(null)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const resume = data.get('resume')

    const next: Errors = {}
    if (!name) next.name = 'Enter your full name.'
    if (phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a mobile number with at least 10 digits.'
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter an email address we can reply to.'
    if (!data.get('role')) next.role = 'Choose what you are applying for.'
    if (!(resume instanceof File) || !resume.name) next.resume = 'Attach your CV as a PDF.'
    else if (resume.size > 5 * 1024 * 1024) next.resume = 'The file is over 5 MB. Please attach a smaller PDF.'
    setErrors(next)
    if (Object.keys(next).length === 0) setSent(name.split(' ')[0])
  }

  return (
    <>
      <PageBanner
        title="Careers"
        lead="Internships for law students and openings for young advocates who want to learn trial and High Court practice."
        crumbs={[{ label: 'Careers' }]}
      />

      <section className={`${page.section} ${page.sunken}`} aria-labelledby="life">
        <div className="container">
          <SectionHead id="life" title="Life at Leeladhar Law Chambers" />
          <ol role="list" className={styles.steps}>
            {life.map((l, i) => (
              <li key={l.title}>
                <span className={styles.num} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={styles.stepTitle}>{l.title}</h3>
                <p>{l.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={page.section} aria-labelledby="apply">
        <div className={`container ${styles.applyWrap}`}>
          <SectionHead id="apply" title="Apply" lead="Tell us about yourself and attach your CV. We reply to every application." />

          {sent ? (
            <div className={styles.done} role="status">
              <span className={styles.doneIcon} aria-hidden="true">
                <Check />
              </span>
              <h3>Application received</h3>
              <p>Thank you, {sent}. We read every application and will write to you within two weeks.</p>
              <Button variant="ghost" onClick={() => setSent(null)}>
                Send another application
              </Button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <TextField name="name" label="Full name" autoComplete="name" error={errors.name} />
              <TextField name="phone" label="Mobile number" type="tel" autoComplete="tel" inputMode="tel" error={errors.phone} />
              <TextField name="email" label="Email address" type="email" autoComplete="email" error={errors.email} />
              <SelectField
                name="role"
                label="Applying for"
                placeholder="Select an option"
                defaultValue=""
                options={roles}
                error={errors.role}
              />
              <div className={styles.wide}>
                <label className={styles.drop} data-invalid={errors.resume ? true : undefined}>
                  <Upload aria-hidden="true" />
                  <span className={styles.dropTitle}>{fileName || 'Choose your CV or drop it here'}</span>
                  <span className={styles.dropHint}>PDF only, up to 5 MB</span>
                  <input
                    type="file"
                    name="resume"
                    accept="application/pdf"
                    aria-describedby="resume-error"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                  />
                </label>
                {errors.resume && (
                  <p id="resume-error" className={styles.error}>
                    {errors.resume}
                  </p>
                )}
              </div>
              <TextArea className={styles.wide} name="message" label="Message (optional)" />
              <div className={styles.wide}>
                <Button type="submit" size="lg" icon={<ArrowUpRight />}>
                  Submit application
                </Button>
              </div>
              <p className={`${styles.wide} ${styles.small}`}>
                For questions about internships, write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
