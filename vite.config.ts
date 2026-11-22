import { defineConfig, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import liveLaw from './api/livelaw.ts'

// Serves /api/livelaw on the dev and preview servers, as the Vercel function in api/ does in production.
const liveLawApi = (): Plugin => {
  const handle: Connect.NextHandleFunction = (req, res) => void liveLaw(req, res)
  return {
    name: 'livelaw-api',
    configureServer: (server) => void server.middlewares.use('/api/livelaw', handle),
    configurePreviewServer: (server) => void server.middlewares.use('/api/livelaw', handle),
  }
}

export default defineConfig({
  plugins: [react(), liveLawApi()],
})
