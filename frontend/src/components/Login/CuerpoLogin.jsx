import "./styleLogin.css";
import { Link } from "react-router-dom";

export default function CuerpoLogin() {
  return (
    <div className="cuerpoLogIn">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form id="formInicio">
          <div className="input-grouplogin">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              className="recuadro"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              required
              aria-describedby="mensajeUsuario"
            />
            <div id="mensajeUsuario" className="mensaje-error" hidden>
              <p>⚠️ Solo se permiten letras minusculas, mayusculas y números.</p>
            </div>

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="recuadro"
              id="password"
              name="password"
              placeholder="Contraseña"
              required
              aria-describedby="mensajePassword"
            />
            <div id="mensajePassword" className="mensaje-error" hidden>
              <p>⚠️ Solo se permiten letras minusculas, mayusculas y números.</p>
            </div>
          </div>

          <button id="login-btn" type="submit" className="login-btn">
            Ingresar
          </button>

          <hr style={{ marginTop: "1.5vw", borderRight: "120px inset black", margin: "2px 0" }} />
          <Link to="/RegistroUsuario" className="register-btn">Registro usuario común</Link>
          <hr style={{ borderRight: "120px inset black", margin: "2px 0" }} />
          <Link to="/RegistroTrabajador" className="register-btn">Registro usuario trabajador</Link>
          <hr style={{ marginBottom: "1vw", borderRight: "120px inset black", margin: "2px 0" }} />
          <Link to="/recuperar" className="reestablecer">Olvidé mi usuario/contraseña</Link>
        </form>
      </div>
    </div>
  );
}
