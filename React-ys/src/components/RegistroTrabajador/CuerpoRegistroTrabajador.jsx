import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styleRegistroTrabajador.css";
import { infoParaRegistro } from "../RegistroUsuario/InfoParaRegistro";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";
import BotonPago from "../BotonPago/BotonPago.jsx";
import ListaDeOficios from "../RegistroTrabajador/ListaDeOficios.jsx";
import axios from "axios";

export default function CuerpoRegistroTrabajador() {
  const navigate = useNavigate();
  const [pagoRealizado, setPagoRealizado] = useState(false);

  // Crear estructura base
  const camposIniciales = {
    ...infoParaRegistro.reduce((acc, item) => {
      acc[item.name] = "";
      return acc;
    }, {}),
    oficios: [],
  };

  const [formData, setFormData] = useState(camposIniciales);

  const camposEsperados = infoParaRegistro.map((item) => item.name);

  // Resetear datos al cargar
  useEffect(() => {
    localStorage.setItem("pagoRegistro", "");
    localStorage.setItem("pagoOrigen", "");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo de oficios
  const agregarOficio = (e) => {
    const oficio = e.target.value;
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
  const handleGuardar = async () => {
    if (!pagoRealizado) {
      alert("⚠️ Debes realizar el pago antes de registrarte.");
      return;
    }
    for (let key of camposEsperados) {
      if (!formData[key] || String(formData[key]).trim() === "") {
        alert("⚠️ Por favor completa todos los campos correctamente.");
        return;
      }
    }
    if (formData.password !== formData.repPassword) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }
    if (formData.perfilProfesional.value.trim().length < 20) {
      alert("⚠️ El campo Perfil Profesional debe tener al menos 20 caracteres.");
      return;
    }

    const API_URL = "https://your-service-3v1h.onrender.com";
    try {
      // 1️⃣ Crear usuario
      const datosUsuario = {
        usuario: formData.usuario,
        password: formData.password,
      };

      const resUsuario = await axios.post(`${API_URL}/usuarios`, datosUsuario);
      const idUsuario = resUsuario.data.id_usuario;

      // 2️⃣ Crear perfil para el usuario
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
      const idPerfil = resPerfil.data.id_perfil;

      // 3️⃣ Registrar oficios del trabajador
      for (let oficio of formData.oficios) {
        await axios.post(`${API_URL}/trabajador-oficio`, {
          id_perfil: idPerfil,
          oficio: oficio,
        });
      }

      // 4️⃣ Guardar estado de sesión
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

  return (
    <div className="tarjeta">
      <div className="linea">
        <h1>Bienvenido a la sección donde podrá crear su perfil de trabajador,</h1>
        <h1>por favor complete las siguientes secciones...</h1>

        <div className="logRegistro-container">
          <h2>Registrarse</h2>

          <form>
            {infoParaRegistro.map((data) => (
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
                {ListaDeOficios.map((oficio) => (
                  <option key={oficio} value={oficio}>
                    {oficio}
                  </option>
                ))}
              </select>

              <div className="contenedor-etiquetas">
                {formData.oficios.map((o) => (
                  <span
                    key={o}
                    className="tag-oficio"
                    onClick={() => eliminarOficio(o)}
                  >
                    {o} ✕
                  </span>
                ))}
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
