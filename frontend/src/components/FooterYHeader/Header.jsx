import "./StyleFlotanteFooter.css";
import Logo from "../../Images/Logo.jpg";
import SinPerfil from "../../Images/sinperfil.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [usuarioOn, setUsuarioOn] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [imagenPerfil, setImagenPerfil] = useState(SinPerfil);

  const cargarDatosUsuario = () => {
    const sesion = localStorage.getItem("usuarioOn") === "true";
    const tipo = localStorage.getItem("tipoUsuario");
    setUsuarioOn(sesion);

    if (sesion) {
      let datos = {};
      if (tipo === "trabajador") {
        datos =
          JSON.parse(localStorage.getItem("datosRegistroTrabajador")) || {};
      } else {
        datos = JSON.parse(localStorage.getItem("datosRegistro")) || {};
      }

      const info = datos.formData || datos;

      // SIEMPRE usar la imagen global actual
      const img = localStorage.getItem("imagenPerfilActual") || datos.imagenPerfil || SinPerfil;

      setUsuario(info);
      setImagenPerfil(img);


      // Guardar imagen actual para persistencia de sesión
      localStorage.setItem("imagenPerfilActual", img);
    } else {
      setUsuario({});
      setImagenPerfil(SinPerfil);
    }
  };

  useEffect(() => {
    // Ejecuta la carga al montar
    cargarDatosUsuario();

    // Escucha cambios en localStorage desde cualquier componente
    window.addEventListener("storage", () => {
      cargarDatosUsuario();
    });

    return () => window.removeEventListener("storage", cargarDatosUsuario);
  }, []);

  const handleLogout = () => {
    // Cerrar sesión
    localStorage.setItem("usuarioOn", "false");

    // Eliminar datos temporales y de la sesión actual
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("imagenPerfilActual"); // elimina la imagen activa
    localStorage.removeItem("perfilActivo"); // opcional si después querés usar esto

    localStorage.removeItem("usuarioAdmin");
    localStorage.removeItem("passAdmin");

    // Forzar actualización inmediata del header
    window.dispatchEvent(new Event("storage"));

    // Redirigir
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
          <div className="user-menu" id="userMenu">
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
