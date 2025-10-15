import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Capacitate from './pages/Capacitate.jsx'
import Contactanos from './pages/Contactanos.jsx'
import Preguntas from './pages/Preguntas.jsx'
import Privacidad from './pages/Privacidad.jsx'
import Servicios from './pages/Servicios.jsx'
import Terminos from './pages/Terminos.jsx'
import Buscar from './pages/Buscar.jsx'
import Login from './pages/Login.jsx'
import RegistroUsuario from './pages/RegistroUsuario.jsx'
import RegistroTrabajador from './pages/RegistroTrabajador.jsx'
import Perfiles from './pages/Perfiles.jsx'
import Administrador from './pages/Administrador.jsx'

function App() {
  return (
    <>
      <Perfiles />
      <RegistroTrabajador />
      <Home />
      <Buscar />
      <Preguntas />
      <QuienesSomos />
      <Capacitate />
      <Login />
      <RegistroUsuario />
      <Contactanos />
      <Terminos />
      <Privacidad />
      <Servicios />
      <Administrador />
    </>
  )
}

export default App
