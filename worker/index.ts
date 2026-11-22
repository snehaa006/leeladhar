// Cloudflare Worker: serves the built site from dist/ and answers GET /api/livelaw, as api/livelaw.ts does on Vercel.
// wrangler.jsonc routes /api/* here first; every other path is a static asset, and unknown paths get index.html
// so deep links work.

import { getLiveLawFeed } from '../api/livelaw.ts'

type Env = { ASSETS: { fetch: (request: Request) => Promise<Response> } }

const JSON_TYPE = 'application/json; charset=utf-8'

async function liveLaw(request: Request, ctx: ExecutionContext): Promise<Response> {
  // Cloudflare's edge cache stands in for Vercel's CDN: one copy per data centre for 15 minutes.
  const cache = caches.default
  const key = new Request(new URL('/api/livelaw', request.url).toString(), { method: 'GET' })
  const hit = await cache.match(key)
  if (hit) return hit

  try {
    const feed = await getLiveLawFeed()
    const response = new Response(JSON.stringify(feed), {
      headers: { 'Content-Type': JSON_TYPE, 'Cache-Control': 'public, max-age=300, s-maxage=900' },
    })
    ctx.waitUntil(cache.put(key, response.clone()))
    return response
  } catch (error) {
    console.error('LiveLaw feed unavailable:', error)
    return new Response(JSON.stringify({ error: 'The LiveLaw feed is unavailable right now.' }), {
      status: 502,
      headers: { 'Content-Type': JSON_TYPE, 'Cache-Control': 'no-store' },
    })
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/livelaw') {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } })
      }
      return liveLaw(request, ctx)
    }
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': JSON_TYPE } })
    }
    return env.ASSETS.fetch(request)
  },
}
