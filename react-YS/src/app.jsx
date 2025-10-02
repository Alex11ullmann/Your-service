import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Principal from './Principal';
import Presentacion from './Presentacion';
import Capacitacion from './Capacitacion';
import LogIn from './LogIn';
import Perfil from './Perfil';
import Servicios from './Servicios';
import Contacto from './Contacto';
import Preguntas from './Preguntas';
import Privacidad from './Privacidad';
import Terminos from './Terminos';



function App() {
  const user = {
    isLoggedIn: true,
    name: 'Tito',
    logout: () => console.log('Logout'),
  };

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<Principal />} />
        <Route path="/presentacion" element={<Presentacion />} />
        <Route path="/capacitacion" element={<Capacitacion />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;