import { useState } from 'react'
import { Button, Dialog } from '../design-system'

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
 * bar advocates from advertising or soliciting work.
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
      title="Before you continue"
      actions={
        <>
          <Button onClick={accept}>I agree</Button>
          <Button variant="ghost" href="https://www.google.com">
            Leave this site
          </Button>
        </>
      }
    >
      <p>
        The Bar Council of India does not permit advocates to advertise or solicit work. By choosing “I agree”, you
        confirm that:
      </p>
      <p>
        you are looking for information about Leeladhar Law Chambers on your own initiative; nothing on this site is
        an invitation to engage us or legal advice; and visiting the site or contacting us does not create an
        advocate–client relationship.
      </p>
    </Dialog>
  )
}
