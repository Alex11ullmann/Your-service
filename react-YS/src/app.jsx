import QuienesSomos from './pages/QuienesSomos.jsx'
import Capacitate from './pages/Capacitate.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Contacto from './pages/contacto.jsx'
import Preguntas from './pages/preguntas.jsx'
import Privacidad from './pages/privacidad.jsx'
import Servicios from './pages/servicios.jsx'
import Terminos from './pages/terminos.jsx'
import Home from './pages/Home.jsx'

function App() {

  return (
    <>
      <div>
        <Home />
        <QuienesSomos />
        <Capacitate />
        <Header />
        <Footer />
        <Contacto />
        <Preguntas />
        <Privacidad />
        <Servicios />
        <Terminos />
      </div>
    </>
  )
}

export default App
