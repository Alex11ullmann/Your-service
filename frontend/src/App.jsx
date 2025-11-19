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
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import ScrollToTop from './components/Herramientas/ScrollToTop.jsx';
import LayoutHeaderFooter from "./components/FooterYHeader/LayoutHeaderFooter.jsx"
import RutaPrivada from "./pages/RutaPrivada.jsx"
import RutaPrivadaAdm from "./pages/RutaPrivadaAdm.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />  {/* esto hace que cada cambio de ruta comience arriba del todo*/}
        <Routes>
          <Route element={<LayoutHeaderFooter />}>
            <Route path="/" element={<Home />} />
            <Route path="/registro-trabajador" element={<RegistroTrabajador />} />
            <Route path="/preguntas" element={<Preguntas />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/capacitate" element={<Capacitate />} />
            <Route path="/registro-usuario" element={<RegistroUsuario />} />
            <Route path="/contacto" element={<Contactanos />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/perfil"
              element={
                <RutaPrivada>
                  <Perfiles />
                </RutaPrivada>
              } />
              <Route
              path="/buscar"
              element={
                <RutaPrivada>
                  <Buscar />
                </RutaPrivada>
              } />
          </Route>
          <Route
            path="/administrador"
            element={
              <RutaPrivadaAdm>
                <Administrador />
              </RutaPrivadaAdm>
            }
          />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
