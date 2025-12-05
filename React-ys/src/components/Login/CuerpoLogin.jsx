// CuerpoLogin.jsx
import React, { useState } from "react";
import "./styleLogin.css";
import { Link, useNavigate } from "react-router-dom";
import InputValidado from "../Validaciones/ValidarCaracteres";
import axios from "axios";

export default function CuerpoLogin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API_URL = "https://your-service-3v1h.onrender.com";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/usuarios/login`, {
        usuario,
        password,
      });
      const data = res.data;
      console.log("🔍 DATA LOGIN:", data);
      console.log("🔍 PERFIL EN LOGIN:", data.perfiles);

      // DETERMINAR TIPO DE USUARIO SEGÚN LA BD REAL
      let tipo = "comun";
      if (data.perfiles && data.perfiles.length > 0) {
        if (data.perfiles[0].estrabajador === true) {
          tipo = "trabajador";
        }
      }

      // GUARDAR SESIÓN
      localStorage.setItem("usuarioOn", "true");
      localStorage.setItem("id_usuario", data.id_usuario);
      localStorage.setItem("tipoUsuario", tipo);

      if (data.perfiles && data.perfiles.length > 0) {
        localStorage.setItem("id_perfiles", data.perfiles[0].id_perfiles);
      } else {
        localStorage.removeItem("id_perfiles");
      }

      navigate("/perfil", {
        state: {
          esTrabajador: tipo === "trabajador",
          perfil: data.perfiles?.[0] ?? null,
        },
      });

    } catch (err) {
      console.error("❌ Error de login:", err);
      setError("❌ Usuario o contraseña incorrectos.");
    }
  };


  return (
    <div className="cuerpoLogIn">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>

        <form id="formInicio" onSubmit={handleSubmit}>
          <div className="input-grouplogin">
            <label htmlFor="usuario">Usuario</label>

            <InputValidado
              type="text"
              myStyle="recuadro"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <label htmlFor="password">Contraseña</label>
            <InputValidado
              type="password"
              myStyle="recuadro"
              id="password"
              name="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="mensaje-error-login">{error}</p>}
          </div>

          <button id="login-btn" type="submit" className="login-btn">
            Ingresar
          </button>

          <hr style={{ marginTop: "1.5vw", borderRight: "12vw inset black", margin: "2px 0" }} />

          <Link to="/registro-usuario" className="register-btn">
            Registro usuario común
          </Link>

          <hr style={{ borderRight: "12vw inset black", margin: "2px 0" }} />

          <Link to="/registro-trabajador" className="register-btn">
            Registro usuario trabajador
          </Link>
        </form>
      </div>
    </div>
  );
}
