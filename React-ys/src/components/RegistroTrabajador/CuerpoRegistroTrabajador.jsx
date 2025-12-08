/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styleRegistroTrabajador.css";
import { infoParaRegistro } from "../RegistroUsuario/InfoParaRegistro";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";
import InputEmail from "../Validaciones/ValidarEmail.jsx";
import BotonPago from "../BotonPago/BotonPago.jsx";
import axios from "axios";
import InputPassword from "../Validaciones/InputPassword";

export default function CuerpoRegistroTrabajador() {
  const navigate = useNavigate();
  const [pagoRealizado, setPagoRealizado] = useState(false);
  const [errorUnico, setErrorUnico] = useState({
    usuario: "",
    dni: "",
    email: ""
  });

  // Crear estructura base
  const camposIniciales = {
    ...infoParaRegistro.reduce((acc, item) => {
      acc[item.name] = "";
      return acc;
    }, {}),
    oficios: [],
    perfilProfesional: "",
  };

  const API_URL = "https://your-service-3v1h.onrender.com";

  const [formData, setFormData] = useState(camposIniciales);

  const camposEsperados = infoParaRegistro.map((item) => item.name);

  const [catalogoOficios, setCatalogoOficios] = useState([]);

  // Verificacion de campos con informacion ya existente
  const verificarCampoUnico = async (campo, valor) => {
    if (!valor) {
      setErrorUnico(prev => ({ ...prev, [campo]: "" }));
      return;
    }

    try {
      const ruta = {
        usuario: `/perfiles/existe-usuario/${valor}`,
        dni: `/perfiles/existe-dni/${valor}`,
        email: `/perfiles/existe-email/${valor}`,
      };

      const response = await axios.get(
        `${API_URL}${ruta[campo]}`
      );

      setErrorUnico(prev => ({
        ...prev,
        [campo]: response.data.existe ? `⚠️ Este ${campo} ya existe.` : ""
      }));

    } catch (error) {
      console.error("Error verificando campo único:", error);
    }
  };

  // Resetear datos al cargar
  useEffect(() => {
    localStorage.setItem("pagoRegistro", "");
    localStorage.setItem("pagoOrigen", "");

    const cargarOficios = async () => {
      const res = await axios.get(`${API_URL}/oficios`);
      setCatalogoOficios(res.data);
    };
    cargarOficios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (["usuario", "dni", "email"].includes(name)) {
      verificarCampoUnico(name, value);
    }
  };


  // Manejo de oficios
  const agregarOficio = (e) => {
    const oficio = Number(e.target.value);
    if (oficio && !formData.oficios.includes(oficio)) {
      setFormData((prev) => ({
        ...prev,
        oficios: [...prev.oficios, oficio],
      }));
    }
  };

  const eliminarOficio = (oficio) => {
    setFormData((prev) => ({
      ...prev,
      oficios: prev.oficios.filter((o) => o !== oficio),
    }));
  };

  // GUARDAR DATOS
  const handleGuardar = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Validación pago
    if (!pagoRealizado) {
      alert("⚠️ Debes realizar el pago antes de registrarte.");
      return;
    }

    // VALIDACIÓN GENERAL DE CAMPOS VACÍOS
    for (let key of camposEsperados) {
      const valor = formData[key];

      // Texto vacío o con espacios
      if (typeof valor === "string" && valor.trim() === "") {
        alert("⚠️ Todos los campos deben estar completos. No pueden estar vacíos.");
        return;
      }

      // Campos numéricos vacíos
      if ((key === "dni" || key === "telefono") && !valor) {
        alert("⚠️ Todos los campos deben estar completos. No pueden estar vacíos.");
        return;
      }
    }

    // VALIDAR OFICIOS
    if (!formData.oficios || formData.oficios.length === 0) {
      alert("⚠️ Debes seleccionar al menos un oficio.");
      return;
    }

    // VALIDAR PERFIL PROFESIONAL
    if (
      !formData.perfilProfesional ||
      formData.perfilProfesional.trim().length < 20
    ) {
      alert("⚠️ El Perfil Profesional debe tener al menos 20 caracteres.");
      return;
    }

    // VALIDAR CONTRASEÑAS
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
        descripcion: formData.perfilProfesional,
        estrabajador: true,
        id_usuario: idUsuario,
      };

      const resPerfil = await axios.post(`${API_URL}/perfiles`, datosPerfil);
      const idPerfil = resPerfil.data.id_perfiles;

      // Registrar oficios
      const oficiosLimpios = formData.oficios.filter(o => Number(o) > 0);
      for (let oficio of oficiosLimpios) {
        await axios.post(`${API_URL}/trabajador-oficio/${idPerfil}/${oficio}`);
      }

      // Guardar en localStorage
      localStorage.setItem("id_usuario", idUsuario);
      localStorage.setItem("id_perfiles", idPerfil);
      localStorage.setItem("tipoUsuario", "trabajador");
      localStorage.setItem("usuarioOn", "true");

      navigate("/perfil", { state: { esTrabajador: true } });

    } catch (error) {
      alert("Ocurrió un error al registrar el usuario, perfil u oficios.");
      console.error(error);
    }
  };


  const camposConValidacion = ["usuario", "password", "repPassword", "direccion"];
  const camposValidadosConEspacios = ["nombresYApellidos"];
  const camposSoloLetras = ["localidad"];
  const camposSoloNumeros = ["telefono", "dni"];
  const campoEmail = ["email"];

  return (
    <div className="tarjeta">
      <div className="linea">
        <h1>Bienvenido a la sección donde podrá crear su perfil de trabajador,</h1>
        <h1>por favor complete las siguientes secciones...</h1>

        <div className="logRegistro-container">
          <h2>Registrarse</h2>

          <form onSubmit={handleSubmit}>
            {infoParaRegistro
              .filter((data) => data.name !== "oficios")
              .map((data) => (
                <div className="input-group" key={data.id}>
                  <label htmlFor={data.id}>{data.label}</label>

                  {data.helperText && (
                    <p className="contenidoInputs">{data.helperText}</p>
                  )}

                  {["usuario", "dni", "email"].includes(data.name) && errorUnico[data.name] && (
                    <p className="errorTexto">{errorUnico[data.name]}</p>
                  )}

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
                        data.name === "repPassword"
                          ? formData["password"]
                          : null
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

            {/* SECCION DE OFICIOS */}

            <div className="input-group">
              <label>Oficios</label>

              <select className="datos" onChange={agregarOficio}>
                <option value="">Seleccionar oficio...</option>
                {catalogoOficios.map((oficio) => (
                  <option key={oficio.id_oficios} value={oficio.id_oficios}>
                    {oficio.nombre_oficio}
                  </option>
                ))}
              </select>

              <div className="contenedor-etiquetas">
                {formData.oficios.map((id) => {
                  const oficio = catalogoOficios.find((o) => o.id_oficios === id);
                  return (
                    <span
                      key={id}
                      className="tag-oficio"
                      onClick={() => eliminarOficio(id)}
                    >
                      {oficio?.nombre_oficio} ✕
                    </span>
                  );
                })}
              </div>

              <p className="contenidoInputs">Puede seleccionar varios oficios.</p>
            </div>
          </form>
        </div>
      </div>

      <div className="descripcion">
        <hr
          style={{
            borderTop: "0.2vw solid black",
            marginBottom: "2vw",
            borderRight: "60vw inset black",
            margin: "4px 0",
          }}
        />
        <h3>Perfil Profesional</h3>

        <p>Escriba aquí lo que quiera hacer saber a los demás sobre usted mismo.</p>
        <p>Experiencias, antigüedad, etc.</p>

        <textarea
          name="perfilProfesional"
          id="textareaqs"
          placeholder="Min 20 caracts - Max 600 caracts"
          minLength="20"
          maxLength="600"
          value={formData.perfilProfesional}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="contenedor-pago">
        <BotonPago
          origen="trabajador"
          onPagoRealizado={(estado) => setPagoRealizado(estado)}
        />
      </div>

      <div className="botonguardardatos">
        <input
          type="button"
          value="Registrarme"
          id="botonguardar"
          onClick={handleGuardar}
        />
      </div>
    </div>
  );
}
