import Header from './header.jsx';

const Header = ({ user }) => {
  return (
    <header>
      <div className="flotante">
        <img id="logo" src="/Img/Logo.jpg" alt="logo" />
        <a href="/Home.html" className="enlace">Home</a>
        <a href="/Principal.html" className="enlace">Buscar</a>
        <a href="/presentacion.html" className="enlace">¿Quiénes somos?</a>
        <a href="/capacitacion.html" className="enlace">Capacitate</a>

        {user?.isLoggedIn ? (
          <div className="user-menu" id="userMenu">
            <img src="/Img/sinperfil.png" alt="perfil" className="avatar" />
            <div className="dropdown">
              <span>{user.name}</span>
              <a href="/perfil.html">Perfil</a>
              <button onClick={user.logout}>Salir</button>
            </div>
          </div>
        ) : (
          <a href="/LogIn.html" className="enlace" id="loginLink">Log In</a>
        )}
      </div>
      <div className="encabezado"></div>
      <div><div className="fondo"></div></div>
    </header>
  );
};

export default Header;
