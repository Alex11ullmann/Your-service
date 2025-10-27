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
    // record puede tener Password directo o dentro de formData u otras variantes
    if (!record) return false;
    const candidates = [];

    // propiedades directas comunes
    if (record.Password) candidates.push(record.Password);
    if (record.password) candidates.push(record.password);

    // formData (tu estructura suele guardar ahí)
    if (record.formData) {
      if (record.formData.Password) candidates.push(record.formData.Password);
      if (record.formData.password) candidates.push(record.formData.password);
    }

    // en algunos casos el objeto perfil dentro de array tiene la pass en otras claves
    if (record.Pass) candidates.push(record.Pass);
    if (record.pass) candidates.push(record.pass);

    // normalizar y comparar exacto (contraseñas son case-sensitive habitualmente)
    return candidates.some((c) => typeof c !== "undefined" && String(c) === String(passwordToCheck));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const userLower = normalize(usuario);
    // Cargar todo lo posible desde localStorage
    const perfilesArray = JSON.parse(localStorage.getItem("perfilesTrabajadores")) || [];
    const datosTrabajadorRaw = JSON.parse(localStorage.getItem("datosRegistroTrabajador")) || null;
    const datosUsuarioRaw = JSON.parse(localStorage.getItem("datosRegistro")) || null;

    // Buscar en array perfilesTrabajadores (si existe)
    let encontradoTrabajador = null;
    if (Array.isArray(perfilesArray) && perfilesArray.length > 0) {
      encontradoTrabajador = perfilesArray.find((t) => {
        const nombre = normalize(t.Usuario ?? t.Usuario?.toString?.() ?? "");
        const matchUser = nombre === userLower;
        const passOk = tryPasswordMatches(t, password);
        console.log(`Comparando array perfil '${t.Usuario}' -> userMatch: ${matchUser}, passMatch: ${passOk}`);
        return matchUser && passOk;
      });
    }
    // Si no encontró, intentar con datosRegistroTrabajador (una sola cuenta)
    let matchDatosTrab = null;
    if (!encontradoTrabajador && datosTrabajadorRaw) {
      const form = datosTrabajadorRaw.formData || datosTrabajadorRaw;
      const nombre = normalize(form?.Usuario || form?.usuario || form?.nombre || "");
      const userMatch = nombre === userLower;
      const passMatch = tryPasswordMatches(datosTrabajadorRaw, password) || tryPasswordMatches(form, password);
      console.log("Comparando datosRegistroTrabajador ->", { nombre, userMatch, passMatch });
      if (userMatch && passMatch) {
        matchDatosTrab = {
          ...form,
          imagenPerfil: datosTrabajadorRaw.imagenPerfil ?? datosTrabajadorRaw?.imagenPerfil ?? form.imagenPerfil,
          imagenes: datosTrabajadorRaw.imagenes ?? form.imagenes ?? [],
        };
      }
    }
    // Intentar con datosRegistro (usuario común)
    let matchDatosUsuario = null;
    if (!encontradoTrabajador && !matchDatosTrab && datosUsuarioRaw) {
      const form = datosUsuarioRaw.formData || datosUsuarioRaw;
      const nombre = normalize(form?.Usuario || form?.usuario || form?.nombre || "");
      const userMatch = nombre === userLower;
      const passMatch = tryPasswordMatches(datosUsuarioRaw, password) || tryPasswordMatches(form, password);
      console.log("Comparando datosRegistro ->", { nombre, userMatch, passMatch });
      if (userMatch && passMatch) {
        matchDatosUsuario = {
          ...form,
          imagenPerfil: datosUsuarioRaw.imagenPerfil ?? form.imagenPerfil,
          imagenes: datosUsuarioRaw.imagenes ?? form.imagenes ?? [],
        };
      }
    }
    if (encontradoTrabajador) {
      console.log("LOGIN: Encontrado en perfilesTrabajadores (array):", encontradoTrabajador);
      navigate("/perfil", {
        state: {
          esTrabajador: true,
          perfil: {
            ...encontradoTrabajador,
            imagenPerfil: encontradoTrabajador.imagenPerfil ?? encontradoTrabajador?.formData?.imagenPerfil ?? encontradoTrabajador.url ?? "",
            imagenes: encontradoTrabajador.imagenes ?? encontradoTrabajador?.formData?.imagenes ?? [],
          },
        },
      });
      return;
    }
    if (matchDatosTrab) {
      console.log("LOGIN: Encontrado en datosRegistroTrabajador:", matchDatosTrab);
      navigate("/perfil", {
        state: {
          esTrabajador: true,
          perfil: matchDatosTrab,
        },
      });
      return;
    }
    if (matchDatosUsuario) {
      console.log("LOGIN: Encontrado en datosRegistro (usuario común):", matchDatosUsuario);
      navigate("/perfil", {
        state: {
          esTrabajador: false,
          perfil: matchDatosUsuario,
        },
      });
      return;
    }
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
