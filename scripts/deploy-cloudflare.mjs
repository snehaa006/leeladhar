// Uploads the built site (dist/) to the R2 bucket the Worker serves it from, then deploys the Worker.
// Run through `npm run deploy` (which builds first); `--local` fills the local bucket that `wrangler dev` uses instead.
// Needs CLOUDFLARE_API_TOKEN (Workers Scripts and R2 edit) and CLOUDFLARE_ACCOUNT_ID for a remote deploy.

import { execFileSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const BUCKET = 'leeladhar-law-chambers-site'
const DIST = 'dist'
const local = process.argv.includes('--local')

const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]))

const wrangler = (...args) => execFileSync('npx', ['wrangler', ...args], { stdio: ['ignore', 'ignore', 'inherit'] })

// index.html goes last, so it never points at script or style files that aren't uploaded yet.
const index = join(DIST, 'index.html')
const all = [...files(DIST).filter((f) => f !== index), index]
for (const file of all) {
  const key = relative(DIST, file).split(sep).join('/')
  wrangler('r2', 'object', 'put', `${BUCKET}/${key}`, '--file', file, local ? '--local' : '--remote')
  console.log(`  uploaded ${key}`)
}
console.log(`${all.length} files in ${BUCKET}`)

if (!local) execFileSync('npx', ['wrangler', 'deploy'], { stdio: 'inherit' })
