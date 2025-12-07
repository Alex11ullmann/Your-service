import React, { useState, useEffect } from "react";
import "./stylesPerfiles.css";
import { InfoPerfiles } from "./InfoPerfiles";
import { useNavigate } from "react-router-dom";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";
import InputEmail from "../Validaciones/ValidarEmail";
import axios from "axios";

export default function CuerpoPerfiles() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const esTrabajadorReal = tipoUsuario === "trabajador";

  // VALIDACIONES IGUALES A REGISTRO
  const camposConValidacion = ["direccion", "password", "repPassword"];
  const camposSoloLetras = ["localidad"];
  const camposSoloNumeros = ["telefono", "dni"];
  const camposValidadosConEspacios = ["nombresYApellidos"];
  const campoEmail = ["email"];

  const API_URL = "https://your-service-3v1h.onrender.com";

  const [idPerfil, setIdPerfil] = useState(null);
  const [catalogoOficios, setCatalogoOficios] = useState([]);

  // TRAER DATOS
  useEffect(() => {
    const fetchData = async () => {
      const usuarioActivo = localStorage.getItem("usuarioOn") === "true";
      if (!usuarioActivo) {
        setFormData({});
        return;
      }

      const idUsuario = localStorage.getItem("id_usuario");
      if (!idUsuario) return;

      try {
        const userRes = await axios.get(`${API_URL}/usuarios/${idUsuario}`);
        const usuario = userRes.data;

        const idPerfilLocal = localStorage.getItem("id_perfiles");
        if (!idPerfilLocal) {
          setFormData({
            usuario: usuario.usuario,
            password: usuario.password,
            nombresYApellidos: "",
            localidad: "",
            direccion: "",
            telefono: "",
            dni: "",
            email: "",
            oficios: [],
            perfilProfesional: "",
          });
          return;
        }

        const perfilRes = await axios.get(`${API_URL}/perfiles/${idPerfilLocal}`);
        const perfil = perfilRes.data;

        setIdPerfil(perfil.id_perfiles);

        setFormData({
          usuario: usuario.usuario,
          password: usuario.password,
          nombresYApellidos: perfil.nombresYApellidos,
          localidad: perfil.localidad,
          direccion: perfil.direccion,
          telefono: perfil.telefono,
          dni: perfil.dni,
          email: perfil.email,
          oficios: perfil.oficios?.map((o) => o.oficio.id_oficios) || [],
          perfilProfesional: perfil.descripcion || "",
        });
      } catch (error) {
        console.error("❌ Error al cargar datos del perfil:", error);
      }
    };

    const cargarOficios = async () => {
      try {
        const res = await axios.get(`${API_URL}/oficios`);
        setCatalogoOficios(res.data);
      } catch (error) {
        console.error("❌ Error al cargar catálogo de oficios:", error);
      }
    };

    cargarOficios();
    fetchData();
  }, []);

  // CONTROLADOR
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // AGREGAR OFICIO
  const agregarOficio = (e) => {
    const value = e.target.value;
    if (!value || isNaN(Number(value))) return;

    const oficio = Number(value);
    if (!formData.oficios.includes(oficio)) {
      setFormData((prev) => ({ ...prev, oficios: [...prev.oficios, oficio] }));
    }
  };

  const eliminarOficio = async (oficio) => {
    try {
      setFormData((prev) => ({
        ...prev,
        oficios: prev.oficios.filter((o) => o !== oficio),
      }));

      await axios.delete(`${API_URL}/trabajador-oficio/${idPerfil}/${oficio}`);
    } catch (error) {
      console.error("❌ Error al eliminar oficio:", error);
    }
  };

  // GUARDAR CAMBIOS
  const handleGuardarCambios = async () => {
    if (!idPerfil) {
      alert("El perfil no está cargado correctamente.");
      return;
    }

    try {
      await axios.patch(`${API_URL}/perfiles/${idPerfil}`, {
        nombresYApellidos: formData.nombresYApellidos,
        localidad: formData.localidad,
        direccion: formData.direccion,
        telefono: formData.telefono,
        dni: formData.dni,
        email: formData.email,
        descripcion: formData.perfilProfesional,
      });

      const oficiosLimpios = formData.oficios.filter((o) => Number(o) > 0);
      for (let oficio of oficiosLimpios) {
        await axios.post(`${API_URL}/trabajador-oficio/${idPerfil}/${oficio}`);
      }

      alert("Cambios guardados correctamente.");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error en PATCH:", error);
      alert("No se pudieron guardar los cambios");
    }
  };

  // ELIMINAR CUENTA
  const handleEliminarCuenta = async () => {
    const inputPass = document.getElementById("inputEliminarPass").value.trim();

    if (inputPass !== formData.password) {
      alert("❌ Contraseña incorrecta");
      return;
    }

    const confirmar = window.confirm("¿Eliminar cuenta?");
    if (!confirmar) return;

    try {
      const idUsuario = localStorage.getItem("id_usuario");
      const idPerfilLocal = localStorage.getItem("id_perfiles");

      for (let oficio of formData.oficios) {
        await axios.delete(`${API_URL}/trabajador-oficio/${idPerfilLocal}/${oficio}`);
      }

      await axios.delete(`${API_URL}/perfiles/${idPerfilLocal}`);
      await axios.delete(`${API_URL}/usuarios/${idUsuario}`);

      localStorage.clear();
      alert("Cuenta eliminada");
      navigate("/");
    } catch (error) {
      console.error("❌ Error al eliminar cuenta:", error);
    }
  };

  return (
    <div className="cuerpo">
      <div className="contenido">
        <div className="formularios">
          <h2>Nombre de Perfil:</h2>
          <h3>{formData.usuario}</h3>

          {InfoPerfiles.map((data) => {
            if (data.name === "usuario") return null;
            if (data.name === "oficios" && !esTrabajadorReal) return null;

            if (data.name === "oficios") {
              return (
                <div className="modificar" key={data.name}>
                  <h4>{data.datos}:</h4>

                  <select className="datos" onChange={agregarOficio} defaultValue="">
                    <option value="">Seleccionar oficio...</option>
                    {catalogoOficios.map((of) => (
                      <option key={of.id_oficios} value={of.id_oficios}>
                        {of.nombre_oficio}
                      </option>
                    ))}
                  </select>

                  <div className="contenedor-etiquetas">
                    {formData.oficios?.filter((o) => Number(o) > 0).map((id) => {
                      const oficio = catalogoOficios.find(
                        (o) => o.id_oficios === id || o.id_oficio === id
                      );

                      return (
                        <span key={id} className="tag-oficio" onClick={() => eliminarOficio(id)}>
                          {oficio ? oficio.nombre_oficio : "Oficio no encontrado"} ✕
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            }

            let InputComponent = "input";

            if (camposConValidacion.includes(data.name)) InputComponent = InputValidado;
            else if (camposSoloNumeros.includes(data.name)) InputComponent = InputSoloNumeros;
            else if (camposSoloLetras.includes(data.name)) InputComponent = InputSoloLetras;
            else if (camposValidadosConEspacios.includes(data.name)) InputComponent = InputSoloLetrasYEspacio;
            else if (campoEmail.includes(data.name)) InputComponent = InputEmail;

            return (
              <div className="modificar" key={data.name}>
                <h4>{data.datos}:</h4>

                <InputComponent
                  type={data.type}
                  className="datos"
                  id={data.id}
                  name={data.name}
                  placeholder={data.placeholder}
                  maxLength={data.maxLength}
                  minLength={data.minLength}
                  required={data.required}
                  value={formData[data.name] || ""}
                  onChange={handleChange}
                />
              </div>
            );
          })}

          {/* Perfil profesional */}
          <div className="modificar">
            <h4>Perfil Profesional:</h4>
            <textarea
              name="perfilProfesional"
              id="area-perfil"
              className="datos"
              placeholder="Min 20 caracts - Max 600"
              minLength="20"
              maxLength="600"
              value={formData.perfilProfesional || ""}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* BOTÓN GUARDAR */}
          <div className="boton-guardar">
            <button onClick={handleGuardarCambios}>Guardar cambios</button>
          </div>

          {/* ELIMINAR CUENTA */}
          <div className="eliminar-cuenta">
            <h4>Eliminar cuenta</h4>
            <input
              type="password"
              id="inputEliminarPass"
              placeholder="Ingrese su contraseña"
              className="datos"
            />
            <button onClick={handleEliminarCuenta} className="btn-eliminar">
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}