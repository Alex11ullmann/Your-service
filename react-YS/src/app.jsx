import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Capacitate from './pages/Capacitate.jsx'
import Contacto from './pages/Contacto.jsx'
import Preguntas from './pages/Preguntas.jsx'
import Privacidad from './pages/Privacidad.jsx'
import Servicios from './pages/Servicios.jsx'
import Terminos from './pages/Terminos.jsx'

function App() {

  return (
    <>
      <div>
        <Home />
        {/* Buscar */}
        <QuienesSomos />
        <Capacitate />
        {/* Login + Registros */}
        {/* Perfil */}
        <Servicios />
        <Contacto />
        <Preguntas />
        <Privacidad />
        <Terminos />
      </div>
    </>
  )
}

export default App
