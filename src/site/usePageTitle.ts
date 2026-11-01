import { useEffect } from 'react'

const SITE = 'Leeladhar Law Chambers'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Decoding Law, Delivering Solutions`
  }, [title])
}
