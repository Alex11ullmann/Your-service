import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styleRegistroTrabajador.css";
import { infoParaRegistro } from "../RegistroUsuario/InfoParaRegistro";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";

export default function CuerpoRegistroTrabajador() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const datosGuardados = localStorage.getItem("datosRegistroTrabajador");
    if (datosGuardados) {
      const data = JSON.parse(datosGuardados);
      setFormData({ ...data });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = async () => {
    if (formData.password !== formData.repPassword) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const datosAGuardar = { ...formData };

      localStorage.setItem(
        "datosRegistroTrabajador",
        JSON.stringify(datosAGuardar)
      );

      const perfilesExistentes =
        JSON.parse(localStorage.getItem("perfilesTrabajadores")) || [];

      const nuevoPerfil = {
        usuario: formData.usuario || "Sin nombre",
        oficios: formData.oficios || "No especificado",
        localidad: formData.localidad || "No indicada",
        telefono: formData.telefono || "No informado",
      };

      const actualizado = perfilesExistentes.filter(
        (p) => p.usuario !== nuevoPerfil.usuario
      );
      actualizado.push(nuevoPerfil);

      localStorage.setItem(
        "perfilesTrabajadores",
        JSON.stringify(actualizado)
      );

      localStorage.setItem("usuarioOn", "true");
      localStorage.setItem("tipoUsuario", "trabajador");
      window.dispatchEvent(new Event("storage"));

      navigate("/perfil", { state: { esTrabajador: true } });
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    }
  };

  const camposConValidacion = [
    "usuario",
    "password",
    "repPassword",
    "direccion"
  ];

  const camposValidadosConEspacios = ["nombresYApellidos"];
  const camposSoloLetras = ["localidad", "oficios"];
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
                    value={formData[data.name] || ""}
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
                    value={formData[data.name] || ""}
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
                    value={formData[data.name] || ""}
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
                    value={formData[data.name] || ""}
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
                    value={formData[data.name] || ""}
                    onChange={handleChange}
                  />
                )}

                {data.helperText && (
                  <p className="contenidoInputs">{data.helperText}</p>
                )}
              </div>
            ))}
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
          value={formData.perfilProfesional || ""}
          onChange={handleChange}
        ></textarea>
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
