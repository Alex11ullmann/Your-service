import "./StyleFlotanteFooter.css";
import Logo from "../../Images/Logo.jpg";
import SinPerfil from "../../Images/sinperfil.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [usuarioOn, setUsuarioOn] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [imagenPerfil, setImagenPerfil] = useState(SinPerfil);

  const cargarDatosUsuario = () => {
    const sesion = localStorage.getItem("usuarioOn") === "true";
    const tipo = localStorage.getItem("tipoUsuario");

    setUsuarioOn(sesion);

    if (!sesion) {
      setUsuario({});
      setImagenPerfil(SinPerfil);
      return;
    }

    let datos = {};

    if (tipo === "trabajador") {
      datos = JSON.parse(localStorage.getItem("datosRegistroTrabajador")) || {};
    } else {
      datos = JSON.parse(localStorage.getItem("datosRegistro")) || {};
    }

    const info = datos.formData || datos;

    const img =
      localStorage.getItem("imagenPerfilActual") ||
      datos.imagenPerfil ||
      SinPerfil;

    setUsuario(info);
    setImagenPerfil(img);
  };

  useEffect(() => {
    cargarDatosUsuario();

    const handler = () => cargarDatosUsuario();
    window.addEventListener("app-session-changed", handler);

    return () => window.removeEventListener("app-session-changed", handler);
  }, []);

  // 🔥 ACTUALIZAR HEADER SIEMPRE QUE CAMBIA LA RUTA
  useEffect(() => {
    cargarDatosUsuario();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();

    setUsuarioOn(false);
    setUsuario({});
    setImagenPerfil(SinPerfil);

    window.dispatchEvent(new CustomEvent("app-session-changed"));
    navigate("/");
  };

  return (
    <header>
      <div className="flotante">
        <img id="logo" src={Logo} alt="Logo de la empresa" />
        <Link to="/" className="enlace">Home</Link>
        <Link to="/buscar" className="enlace">Buscar</Link>
        <Link to="/quienes-somos" className="enlace">¿Quiénes somos?</Link>
        <Link to="/capacitate" className="enlace">Capacitate</Link>

        {usuarioOn ? (
          <div className="user-menu">
            <img src={imagenPerfil} alt="perfil" className="avatar" />
            <div className="dropdown">
              <h3>{usuario.Usuario || usuario.nombreUsuario || "Usuario"}</h3>
              <Link to="/perfil">Perfil</Link>
              <button onClick={handleLogout}>Salir</button>
            </div>
          </div>
        ) : (
          <Link to="/LogIn" className="enlace" id="loginLink">
            Log In
          </Link>
        )}

      </div>
      <div className="encabezado"></div>
    </header>
  );
};

export default Header;
