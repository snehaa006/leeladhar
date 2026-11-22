import { useEffect, useState } from 'react'
import { LIVELAW_URL, type Insight } from './content/insights'

export type LiveLawState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; items: Insight[]; fetchedAt: string }

type Feed = { items: Insight[]; fetchedAt: string }

// One request is shared by every component on the page and reused for a few minutes, so moving between
// the home page, Insights and the practice areas doesn't fetch the feed again.
const MAX_AGE = 5 * 60_000
let request: { at: number; promise: Promise<Feed> } | undefined
let last: { at: number; feed: Feed } | undefined

async function fetchFeed(): Promise<Feed> {
  const res = await fetch('/api/livelaw', { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`/api/livelaw answered ${res.status}`)
  const data = (await res.json()) as Partial<Feed>
  if (!Array.isArray(data.items)) throw new Error('Unexpected response from /api/livelaw')
  // The links become hrefs, so only links to LiveLaw itself are kept.
  const items = data.items.filter((i) => typeof i?.title === 'string' && i.url?.startsWith(`${LIVELAW_URL}/`))
  return { items, fetchedAt: data.fetchedAt ?? new Date().toISOString() }
}

function load(): Promise<Feed> {
  if (!request || Date.now() - request.at > MAX_AGE) {
    const promise = fetchFeed()
    const entry = { at: Date.now(), promise }
    request = entry
    promise.then(
      (feed) => (last = { at: entry.at, feed }),
      () => request === entry && (request = undefined),
    )
  }
  return request.promise
}

/** The latest LiveLaw headlines, from /api/livelaw (api/livelaw.ts). */
export function useLiveLaw(): LiveLawState {
  const [state, setState] = useState<LiveLawState>(() =>
    last && Date.now() - last.at < MAX_AGE ? { status: 'ready', ...last.feed } : { status: 'loading' },
  )

  useEffect(() => {
    let live = true
    load().then(
      (feed) => live && setState({ status: 'ready', ...feed }),
      () => live && setState((s) => (s.status === 'ready' ? s : { status: 'error' })),
    )
    return () => {
      live = false
    }
  }, [])

  return state
}
