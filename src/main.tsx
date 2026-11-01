import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './design-system/styles.css'
import { App } from './App'

// Scroll-reveal starts elements hidden; only opt in when the visitor hasn't asked for reduced motion.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.dataset.motion = ''
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
