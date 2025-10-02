import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' ESTO SE PODRIA BORRAR PORQUE BORRAMOS TODO EL CONTENIDO DE APP DE EJEMPLO QUE VINO 
import QuienesSomos from './QuienesSomos.jsx' ESTE DEBERIA ESTAR EN PRESENTACION.JSX
import './Css/flotanteyFooter.css'
import App from './app.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuienesSomos /> //SE PUEDE PERO NO SE PUEDE RENDERIZAR AMBOS POR ESO SOLAMENTE EN APP SE DEBE IMPORTAR TODO.
    <App />
  </StrictMode>,
)
