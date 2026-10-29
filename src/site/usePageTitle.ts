import { useEffect } from 'react'

const SITE = 'Leeladhar Law Chambers'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Advocates, Panipat & Chandigarh`
  }, [title])
}
