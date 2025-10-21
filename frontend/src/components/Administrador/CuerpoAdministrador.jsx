import "./styleAdministrador.css";
import { Link } from "react-router-dom";

export default function CuerpoAdministrador() {
  return (
    <div className="cuerpoAdm">
      <header>
        <h1>Panel de Administración</h1>
      </header>
      <nav>
        <ul>
          <li><Link to="/Home">Inicio</Link></li>
          <li><Link to="/configuracion">Configuración</Link></li>
          <li><Link to="/logout">Cerrar Sesión</Link></li>
        </ul>
      </nav>
      <main>
        <section className="contenidoAdm">
          <h2>Bienvenido Administrador</h2>
          <p>Aquí puedes gestionar la plataforma.</p>
          <div className="botonesAdm">
            <button onClick={() => (window.location.href = "/RegistroUsuario")}>Gestionar Perfil Usuarios</button>
            <button onClick={() => (window.location.href = "/RegistroTrabajador")}>Gestionar Perfil Trabajador</button>
            <button onClick={() => (window.location.href = "/reportes")}>Ver Reportes</button>
          </div>
        </section>
      </main>
    </div>
  );
}
