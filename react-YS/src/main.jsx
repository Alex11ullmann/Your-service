import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuienesSomos from './QuienesSomos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuienesSomos />
  </StrictMode>,
)
