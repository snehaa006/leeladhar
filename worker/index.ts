// Cloudflare Worker: answers GET /api/livelaw (as api/livelaw.ts does on Vercel) and serves the built site,
// which scripts/deploy-cloudflare.mjs uploads from dist/ to the R2 bucket bound as SITE.
// Paths without a file extension that match no file get index.html, so deep links work.

import { getLiveLawFeed } from '../api/livelaw.ts'

type Env = { SITE: R2Bucket }

const JSON_TYPE = 'application/json; charset=utf-8'

const TYPES: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  json: 'application/json; charset=utf-8',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  avif: 'image/avif',
  gif: 'image/gif',
  ico: 'image/x-icon',
  woff2: 'font/woff2',
  txt: 'text/plain; charset=utf-8',
  xml: 'application/xml',
}

const json = (body: unknown, status: number, cache: string) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': JSON_TYPE, 'Cache-Control': cache } })

async function liveLaw(request: Request, ctx: ExecutionContext): Promise<Response> {
  // Cloudflare's edge cache stands in for Vercel's CDN: one copy per data centre for 15 minutes.
  const cache = caches.default
  const key = new Request(new URL('/api/livelaw', request.url).toString(), { method: 'GET' })
  const hit = await cache.match(key)
  if (hit) return hit

  try {
    const response = json(await getLiveLawFeed(), 200, 'public, max-age=300, s-maxage=900')
    ctx.waitUntil(cache.put(key, response.clone()))
    return response
  } catch (error) {
    console.error('LiveLaw feed unavailable:', error)
    return json({ error: 'The LiveLaw feed is unavailable right now.' }, 502, 'no-store')
  }
}

async function asset(request: Request, env: Env, pathname: string): Promise<Response> {
  let key = decodeURIComponent(pathname).replace(/^\/+/, '')
  if (key === '' || key.endsWith('/')) key += 'index.html'
  const extension = (key.match(/\.([a-z0-9]+)$/i)?.[1] ?? '').toLowerCase()

  let object = await env.SITE.get(key, { onlyIf: request.headers })
  // Routes like /about or /practice-areas/family-law are the single-page app's; anything with an extension is a file.
  if (!object && !extension) {
    key = 'index.html'
    object = await env.SITE.get(key, { onlyIf: request.headers })
  }
  if (!object) return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('ETag', object.httpEtag)
  const type = TYPES[(key.match(/\.([a-z0-9]+)$/i)?.[1] ?? '').toLowerCase()]
  if (type) headers.set('Content-Type', type)
  // Vite fingerprints everything under /assets, so those never change; the page itself is always revalidated.
  headers.set(
    'Cache-Control',
    key.startsWith('assets/') ? 'public, max-age=31536000, immutable' : key.endsWith('.html') ? 'no-cache' : 'public, max-age=86400',
  )

  if (!('body' in object)) return new Response(null, { status: 304, headers })
  return new Response(request.method === 'HEAD' ? null : object.body, { headers })
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url)
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } })
    }
    if (pathname === '/api/livelaw') return liveLaw(request, ctx)
    if (pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404, 'no-store')
    return asset(request, env, pathname)
  },
}
