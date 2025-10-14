import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Capacitate from './pages/Capacitate.jsx'
import Contacto from './pages/Contacto.jsx'
import Preguntas from './pages/Preguntas.jsx'
import Privacidad from './pages/Privacidad.jsx'
import Servicios from './pages/Servicios.jsx'
import Terminos from './pages/Terminos.jsx'
import Buscar from './pages/Buscar.jsx'
import Login from './pages/Login.jsx'
import RegistroUsuario from './pages/RegistroUsuario.jsx'
import RegistroTrabajador from './pages/RegistroTrabajador.jsx'
import Perfiles from './pages/Perfiles.jsx'

function App() {

  return (
    <>
        <Home />
        <Buscar />
        <QuienesSomos />
        <Capacitate />
        <Login />
        <RegistroUsuario />
        <RegistroTrabajador />
        <Servicios />
        <Contacto />
        <Preguntas />
        <Privacidad />
        <Terminos />
        <Perfiles />
        {/* Administrador */}
    </>
  )
}

export default App
