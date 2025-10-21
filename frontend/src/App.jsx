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
import Header from './components/FooterYHeader/Header.jsx'
import Footer from './components/FooterYHeader/Footer.jsx'
import { Routes, BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter> 
      <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Perfiles />} />
      <Route path="/registro-trabajador" element={<RegistroTrabajador />} />
      <Route path="/buscar" element={<Buscar />} />
      <Route path="/preguntas" element={<Preguntas />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/capacitate" element={<Capacitate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro-usuario" element={<RegistroUsuario />} />
      <Route path="/contacto" element={<Contactanos />} />
      <Route path="/terminos" element={<Terminos />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/administrador" element={<Administrador />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
