import QuienesSomos from './QuienesSomos.jsx'
import Capacitate from './Capacitate.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Contacto from './pages/contacto.jsx'
import Preguntas from './pages/preguntas.jsx'
import Privacidad from './pages/privaciodad.jsx'
import Servicios from './pages/servicios.jsx'
import Terminos from './pages/terminos.jsx'

function App() {

  return (
    <>
      <div>
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
