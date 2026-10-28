import { DesignSystemPage } from './showcase/DesignSystemPage'
import { Home } from './site/Home'

// Two pages, so a path check is all the routing needed. Vite's dev server and
// `vite preview` fall back to index.html for /design-system.
export function App() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path === '/design-system' ? <DesignSystemPage /> : <Home />
}
