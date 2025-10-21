import './StyleFlotanteFooter.css';
import Logo from '../../Images/Logo.jpg';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <header>
      <div className="flotante">
        <img id="logo" src={Logo} alt="Logo de la empresa" />
        <Link to="/Home" className="enlace">Home</Link>
        <Link to="/Principal" className="enlace">Buscar</Link>
        <Link to="/presentacion" className="enlace">¿Quiénes somos?</Link>
        <Link to="/capacitacion" className="enlace">Capacitate</Link>

        {user?.isLoggedIn ? (
          <div className="user-menu" id="userMenu">
            <img src="/Img/sinperfil.png" alt="perfil" className="avatar" />
            <div className="dropdown">
              <span>{user.name}</span>
              <Link to="/perfil">Perfil</Link>
              <button onClick={user.logout}>Salir</button>
            </div>
          </div>
        ) : (
          <Link to="/LogIn" className="enlace" id="loginLink">Log In</Link>
        )}
      </div>
      <div className="encabezado"></div>
    </header>
  );
};

export default Header;
