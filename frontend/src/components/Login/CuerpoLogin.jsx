// CuerpoLogin.jsx
import React, { useState } from "react";
import "./styleLogin.css";
import { Link, useNavigate } from "react-router-dom";

export default function CuerpoLogin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const normalize = (s) => (typeof s === "string" ? s.trim().toLowerCase() : "");

  const tryPasswordMatches = (record, passwordToCheck) => {
    if (!record) return false;
    const candidates = [];

    if (record.Password) candidates.push(record.Password);
    if (record.password) candidates.push(record.password);

    if (record.formData) {
      if (record.formData.Password) candidates.push(record.formData.Password);
      if (record.formData.password) candidates.push(record.formData.password);
    }

    if (record.Pass) candidates.push(record.Pass);
    if (record.pass) candidates.push(record.pass);

    return candidates.some(
      (c) => typeof c !== "undefined" && String(c) === String(passwordToCheck)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const userLower = normalize(usuario);

    const perfilesArray =
      JSON.parse(localStorage.getItem("perfilesTrabajadores")) || [];

    const datosTrabajadorRaw =
      JSON.parse(localStorage.getItem("datosRegistroTrabajador")) || null;

    const datosUsuarioRaw =
      JSON.parse(localStorage.getItem("datosRegistro")) || null;

    //------------------------------------------------------------
    // 1) Buscar trabajador dentro del array perfilesTrabajadores
    //------------------------------------------------------------
    let encontradoTrabajador = null;

    if (Array.isArray(perfilesArray) && perfilesArray.length > 0) {
      encontradoTrabajador = perfilesArray.find((t) => {
        const nombre = normalize(t.Usuario ?? "");
        const matchUser = nombre === userLower;
        const passOk = tryPasswordMatches(t, password);
        return matchUser && passOk;
      });
    }

    //------------------------------------------------------------
    // 2) Buscar datosRegistroTrabajador (un solo registro)
    //------------------------------------------------------------
    let matchDatosTrab = null;

    if (!encontradoTrabajador && datosTrabajadorRaw) {
      const form = datosTrabajadorRaw.formData || datosTrabajadorRaw;
      const nombre = normalize(
        form?.Usuario || form?.usuario || form?.nombre || ""
      );

      const userMatch = nombre === userLower;
      const passMatch =
        tryPasswordMatches(datosTrabajadorRaw, password) ||
        tryPasswordMatches(form, password);

      if (userMatch && passMatch) {
        matchDatosTrab = {
          ...form,
          imagenPerfil:
            form.imagenPerfil ||
            datosTrabajadorRaw?.formData?.imagenPerfil ||
            datosTrabajadorRaw?.imagenPerfil ||
            "",
          imagenes: datosTrabajadorRaw.imagenes ?? form.imagenes ?? [],
        };
      }
    }

    //------------------------------------------------------------
    // 3) Buscar datosRegistro (usuario común)
    //------------------------------------------------------------
    let matchDatosUsuario = null;

    if (!encontradoTrabajador && !matchDatosTrab && datosUsuarioRaw) {
      const form = datosUsuarioRaw.formData || datosUsuarioRaw;
      const nombre = normalize(
        form?.Usuario || form?.usuario || form?.nombre || ""
      );

      const userMatch = nombre === userLower;
      const passMatch =
        tryPasswordMatches(datosUsuarioRaw, password) ||
        tryPasswordMatches(form, password);

      if (userMatch && passMatch) {
        matchDatosUsuario = {
          ...form,
          imagenPerfil:
            form.imagenPerfil ||
            datosUsuarioRaw?.formData?.imagenPerfil ||
            datosUsuarioRaw?.imagenPerfil ||
            "",
          imagenes: datosUsuarioRaw.imagenes ?? form.imagenes ?? [],
        };
      }
    }

    //------------------------------------------------------------
    // 4) ADMIN
    //------------------------------------------------------------
    if (usuario === "Admin" && password === "asdasd") {
      localStorage.setItem("usuarioAdmin", "Admin");
      localStorage.setItem("passAdmin", "asdasd");
      alert("✅ Bienvenido Administrador");
      navigate("/administrador");
      return;
    }

    //------------------------------------------------------------
    // 5) LOGIN TRABAJADOR (array)
    //------------------------------------------------------------
    if (encontradoTrabajador) {
      localStorage.setItem("usuarioOn", "true");
      localStorage.setItem("tipoUsuario", "trabajador");

      const img =
        encontradoTrabajador?.imagenPerfil ||
        encontradoTrabajador?.formData?.imagenPerfil ||
        "";

      localStorage.setItem("imagenPerfilActual", img);
      window.dispatchEvent(new Event("storage"));

      navigate("/perfil", {
        state: {
          esTrabajador: true,
          perfil: {
            ...encontradoTrabajador,
            imagenPerfil: img,
            imagenes:
              encontradoTrabajador.imagenes ??
              encontradoTrabajador?.formData?.imagenes ??
              [],
          },
        },
      });
      return;
    }

    //------------------------------------------------------------
    // 6) LOGIN datosRegistroTrabajador
    //------------------------------------------------------------
    if (matchDatosTrab) {
      localStorage.setItem("usuarioOn", "true");
      localStorage.setItem("tipoUsuario", "trabajador");

      localStorage.setItem("imagenPerfilActual", matchDatosTrab.imagenPerfil);
      window.dispatchEvent(new Event("storage"));

      navigate("/perfil", {
        state: {
          esTrabajador: true,
          perfil: matchDatosTrab,
        },
      });
      return;
    }

    //------------------------------------------------------------
    // 7) LOGIN datosRegistro usuario común
    //------------------------------------------------------------
    if (matchDatosUsuario) {
      localStorage.setItem("usuarioOn", "true");
      localStorage.setItem("tipoUsuario", "usuario");

      localStorage.setItem(
        "imagenPerfilActual",
        matchDatosUsuario.imagenPerfil
      );

      window.dispatchEvent(new Event("storage"));

      navigate("/perfil", {
        state: {
          esTrabajador: false,
          perfil: matchDatosUsuario,
        },
      });
      return;
    }

    //------------------------------------------------------------
    // 8) ERROR
    //------------------------------------------------------------
    setError("❌ Usuario o contraseña incorrectos.");
  };

  return (
    <div className="cuerpoLogIn">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>

        <form id="formInicio" onSubmit={handleSubmit}>
          <div className="input-grouplogin">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              className="recuadro"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="recuadro"
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

          <hr
            style={{
              marginTop: "1.5vw",
              borderRight: "12vw inset black",
              margin: "2px 0",
            }}
          />

          <Link to="/registro-usuario" className="register-btn">
            Registro usuario común
          </Link>

          <hr
            style={{ borderRight: "12vw inset black", margin: "2px 0" }}
          />

          <Link to="/registro-trabajador" className="register-btn">
            Registro usuario trabajador
          </Link>
        </form>
      </div>
    </div>
  );
}
