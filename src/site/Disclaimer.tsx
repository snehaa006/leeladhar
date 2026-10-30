import { useState } from 'react'
import { Button, Dialog } from '../design-system'
import styles from './Disclaimer.module.css'

const KEY = 'llc-bci-accepted'

function alreadyAccepted() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Indian law-firm sites carry this notice because Bar Council of India rules
 * bar advocates from advertising or soliciting work. Wording after the
 * disclaimer on legacylawoffices.com.
 */
export function Disclaimer() {
  const [open, setOpen] = useState(() => !alreadyAccepted())

  function accept() {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* private mode — show again next time */
    }
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      title="Disclaimer"
      actions={
        <>
          <Button onClick={accept}>I agree</Button>
          <Button variant="ghost" href="https://www.google.com">
            Decline
          </Button>
        </>
      }
    >
      <p>
        This website is merely a listing of Leeladhar Law Chambers on the World Wide Web. The rules of the Bar Council
        of India do not allow us to advertise or to solicit work. By clicking “I agree” below, the user acknowledges
        the following:
      </p>
      <ol className={styles.list}>
        <li>
          There has been no advertisement, personal communication, solicitation, invitation or inducement of any sort
          whatsoever from us or any of our lawyers to solicit any work through this website;
        </li>
        <li>The user voluntarily wishes to gain more information about us for their own information and use;</li>
        <li>
          The information about us is made available to the user only on their specific request, and any information
          obtained or materials downloaded from this website is completely at the user’s volition, and any
          transmission, receipt or use of this site would not create any lawyer–client relationship.
        </li>
      </ol>
      <p>
        The information provided under this website is solely available at your request for informational purposes
        only. The same should not be interpreted as soliciting or advertising. We are not liable for any consequence of
        any action taken by the user relying on the information provided under this website.
      </p>
      <p>
        The information contained on the website is not intended to constitute legal advice, and Leeladhar Law
        Chambers cannot accept any responsibility towards those who rely solely on the contents of this website.
        Leeladhar Law Chambers makes no warranty, express or implied, with respect to the information contained on this
        website or on any third-party website which may be accessed by a link from this website.
      </p>
    </Dialog>
  )
}
