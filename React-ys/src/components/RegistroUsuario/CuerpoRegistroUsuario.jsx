/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "./styleRegistroUsuario.css";
import { infoParaRegistro } from "./InfoParaRegistro.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";
import InputEmail from "../Validaciones/ValidarEmail.jsx";
import BotonPago from "../BotonPago/BotonPago.jsx";
import axios from "axios";

export default function CuerpoRegistroUsuario() {
  const navigate = useNavigate();
  const [pagoRealizado, setPagoRealizado] = useState(false);
  const API_URL = "https://your-service-3v1h.onrender.com";

  // Crear estructura inicial del formulario
  const camposIniciales = infoParaRegistro.reduce((acc, item) => {
    if (item.name !== "oficios") acc[item.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(camposIniciales);
  const [errores, setErrores] = useState({
    usuario: "",
    dni: "",
    email: ""
  });

  const camposEsperados = infoParaRegistro
    .filter((item) => item.name !== "oficios")
    .map((item) => item.name);

  // Limpiar datos de pago
  useEffect(() => {
    localStorage.setItem("pagoRegistro", "");
    localStorage.setItem("pagoOrigen", "");
  }, []);

  // Recuperar datos si el usuario vuelve
  useEffect(() => {
    const datosGuardados = localStorage.getItem("datosRegistroUsuario");
    if (datosGuardados) {
      setFormData(JSON.parse(datosGuardados));
    }
  }, []);

  // Verificar campos únicos (usuario, dni, email)
  const verificarExistencia = async (campo, valor) => {
    if (!valor || valor.trim() === "") return;

    try {
      if (campo === "usuario") {
        const r = await axios.get(`${API_URL}/perfiles/existe-usuario/${valor}`);
        setErrores((p) => ({ ...p, usuario: r.data.existe ? "Usuario ya existe" : "" }));
      }
      if (campo === "dni") {
        const r = await axios.get(`${API_URL}/perfiles/existe-dni/${valor}`);
        setErrores((p) => ({ ...p, dni: r.data.existe ? "DNI ya existe" : "" }));
      }
      if (campo === "email") {
        const r = await axios.get(`${API_URL}/perfiles/existe-email/${valor}`);
        setErrores((p) => ({ ...p, email: r.data.existe ? "Email ya existe" : "" }));
      }
    } catch (error) {
      console.error("Error verificando campo único:", error);
    }
  };

  // Manejar cambios en inputs
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (["usuario", "dni", "email"].includes(name)) {
      verificarExistencia(name, value);
    }
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación pago
    if (!pagoRealizado) {
      alert("⚠️ Debes realizar el pago antes de registrarte.");
      return;
    }
    // Validación campos únicos
    if (errores.usuario || errores.dni || errores.email) {
      alert("⚠️ Corrige los errores antes de continuar.");
      return;
    }
    // Validación campos vacíos
    for (let key of camposEsperados) {
      const valor = formData[key];

      if (typeof valor === "string" && valor.trim() === "") {
        alert("⚠️ Completa todos los campos correctamente.");
        return;
      }

      if ((key === "dni" || key === "telefono") && !valor) {
        alert("⚠️ Completa todos los campos correctamente.");
        return;
      }
    }
    // Validación contraseñas
    if (formData.password !== formData.repPassword) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      // Crear usuario
      const datosUsuario = {
        usuario: formData.usuario,
        password: formData.password,
      };

      const resUsuario = await axios.post(`${API_URL}/usuarios`, datosUsuario);
      const idUsuario = resUsuario.data.id_usuario;

      // Crear perfil
      const datosPerfil = {
        nombresYApellidos: formData.nombresYApellidos,
        localidad: formData.localidad,
        direccion: formData.direccion,
        telefono: formData.telefono,
        dni: formData.dni,
        email: formData.email,
        estrabajador: false,
        id_usuario: idUsuario,
        descripcion:
          "La carga o modificacion de descripcion es solo para usuarios trabajadores",
      };

      const resPerfil = await axios.post(`${API_URL}/perfiles`, datosPerfil);
      const idPerfil = resPerfil.data.id_perfiles;

      // Guardar sesión
      localStorage.setItem("id_usuario", idUsuario);
      localStorage.setItem("id_perfiles", idPerfil);
      localStorage.setItem("tipoUsuario", "usuario");
      localStorage.setItem("usuarioOn", "true");

      navigate("/perfil", { state: { esTrabajador: false } });

    } catch (error) {
      console.error("❌ Error al registrar usuario/perfil:", error);
      alert("Ocurrió un error durante el registro.");
    }
  };

  // Inputs según validación
  const camposConValidacion = ["usuario", "password", "repPassword", "direccion"];
  const camposValidadosConEspacios = ["nombresYApellidos"];
  const camposSoloLetras = ["localidad"];
  const camposSoloNumeros = ["telefono", "dni"];
  const campoEmail = ["email"];

  return (
    <div className="cuerpoRegistro">
      <div className="logRegistro-container">
        <h2>Registrarse</h2>

        <form onSubmit={handleSubmit}>
          {infoParaRegistro
            .filter((data) => data.name !== "oficios")
            .map((data) => (
              <div className="input-group" key={data.id}>
                <label htmlFor={data.id}>{data.label}</label>

                {camposConValidacion.includes(data.name) ? (
                  <InputValidado
                    type={data.type}
                    myStyle="datos"
                    id={data.id}
                    name={data.name}
                    placeholder={data.placeholder}
                    maxLength={data.maxLength}
                    minLength={data.minLength}
                    required={data.required}
                    value={formData[data.name]}
                    onChange={handleChange}
                    passwordValue={
                      data.name === "repPassword" ? formData["password"] : null
                    }
                  />
                ) : camposSoloNumeros.includes(data.name) ? (
                  <InputSoloNumeros
                    type={data.type}
                    myStyle="datos"
                    id={data.id}
                    name={data.name}
                    placeholder={data.placeholder}
                    maxLength={data.maxLength}
                    minLength={data.minLength}
                    required={data.required}
                    value={formData[data.name]}
                    onChange={handleChange}
                  />
                ) : camposSoloLetras.includes(data.name) ? (
                  <InputSoloLetras
                    type={data.type}
                    myStyle="datos"
                    id={data.id}
                    name={data.name}
                    placeholder={data.placeholder}
                    maxLength={data.maxLength}
                    minLength={data.minLength}
                    required={data.required}
                    value={formData[data.name]}
                    onChange={handleChange}
                  />
                ) : camposValidadosConEspacios.includes(data.name) ? (
                  <InputSoloLetrasYEspacio
                    type={data.type}
                    myStyle="datos"
                    id={data.id}
                    name={data.name}
                    placeholder={data.placeholder}
                    maxLength={data.maxLength}
                    minLength={data.minLength}
                    required={data.required}
                    value={formData[data.name]}
                    onChange={handleChange}
                  />
                ) : campoEmail.includes(data.name) ? (
                  <InputEmail
                    type="email"
                    myStyle="datos"
                    id={data.id}
                    name={data.name}
                    placeholder={data.placeholder}
                    required={data.required}
                    value={formData[data.name]}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={data.type}
                    className="datos"
                    id={data.id}
                    name={data.name}
                    placeholder={data.placeholder}
                    maxLength={data.maxLength}
                    minLength={data.minLength}
                    required={data.required}
                    value={formData[data.name]}
                    onChange={handleChange}
                  />
                )}

                {errores[data.name] && (
                  <p className="errorTexto">{errores[data.name]}</p>
                )}

                {data.helperText && (
                  <p className="contenidoInputs">{data.helperText}</p>
                )}
              </div>
            ))}

          <div className="contenedor-pago">
            <BotonPago
              origen="usuario"
              onPagoRealizado={(estado) => setPagoRealizado(estado)}
            />
          </div>

          <button type="submit" id="guardar-btn" className="guardar-btn">
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}
