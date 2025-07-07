import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.tsx'

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start({
  serviceWorker: {
    url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
  },
});

}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
