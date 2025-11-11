import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styleRegistroTrabajador.css";
import SinFoto from "../../Images/Photograph.jpg";
import { infoParaRegistro } from "../RegistroUsuario/InfoParaRegistro";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";

export default function CuerpoRegistroTrabajador() {
  const [imagenes, setImagenes] = useState([]);
  // const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [imagenPerfil, setImagenPerfil] = useState(SinFoto);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();


  // Cargar datos previos (si existen)
  useEffect(() => {
    const datosGuardados = localStorage.getItem("datosRegistroTrabajador");
    if (datosGuardados) {
      const data = JSON.parse(datosGuardados);
      setFormData(data.formData || {});
      setImagenes(data.imagenes || []);
      setImagenPerfil(data.imagenPerfil || SinFoto);
    }
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  {/*
  // Maneja la carga de imágenes del carrusel
  const handleImagenChange = (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length === 0) return;
    const nuevasImagenes = archivos.map((archivo) => {
      const url = URL.createObjectURL(archivo);
      return { id: url, url, file: archivo }; // Guardamos el archivo real
    });
    setImagenes((prev) => [...prev, ...nuevasImagenes]);
  };

  // Seleccionar imagen para mostrar como perfil
  const handleSeleccionarImagen = (id) => {
    setImagenSeleccionada(id);
    const seleccionada = imagenes.find((img) => img.id === id);
    if (seleccionada) {
      setImagenPerfil(seleccionada.url);
      setFormData((prev) => ({
        ...prev,
        imagenFile: seleccionada.file, // Guardamos el File real para convertirlo después
      }));
    }
  };

  // Eliminar imagen seleccionada
  const handleEliminarImagen = () => {
    if (!imagenSeleccionada) return;
    const nuevasImagenes = imagenes.filter((img) => img.id !== imagenSeleccionada);
    setImagenes(nuevasImagenes);
    // Reset si se borra la imagen principal
    if (imagenSeleccionada === imagenPerfil) {
      setImagenPerfil(SinFoto);
    }
    setImagenSeleccionada(null);
  };
  */}
  // Guardamos los datos que vamos a utilizar luego
  const handleGuardar = async () => {
    try {
      // Limpia sesión anterior
      localStorage.removeItem("imagenPerfilActual");
      let imagenConvertida = SinFoto;

      // Si hay un archivo seleccionado (imagen real)
      if (formData.imagenFile instanceof File) {
        imagenConvertida = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // Base64 listo
          reader.onerror = reject;
          reader.readAsDataURL(formData.imagenFile);
        });
      }
      // Si ya es base64 (imagen seleccionada previamente)
      else if (imagenPerfil && imagenPerfil.startsWith("data:image")) {
        imagenConvertida = imagenPerfil;
      }

      // ✅ Convertir TODAS las imágenes del carrusel a Base64
      const imagenesConvertidas = await Promise.all(
        imagenes.map((img) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve({ id: img.id, base64: reader.result });
            reader.readAsDataURL(img.file);
          });
        })
      );

      // ✅ Guardar datos del trabajador
      const datosAGuardar = {
        formData,
        imagenPerfil: imagenConvertida,
        imagenes: imagenesConvertidas,
      };

      localStorage.setItem(
        "datosRegistroTrabajador",
        JSON.stringify(datosAGuardar)
      );

      // ✅ Guardar o actualizar en la lista pública
      const perfilesExistentes =
        JSON.parse(localStorage.getItem("perfilesTrabajadores")) || [];

      const nuevoPerfil = {
        Usuario: formData.Usuario || "Sin nombre",
        Oficios: formData.Oficios || "No especificado",
        Localidad: formData.Localidad || "No indicada",
        Telefono: formData.Telefono || "No informado",
        imagenPerfil: imagenConvertida,
      };

      const actualizado = perfilesExistentes.filter(
        (p) => p.Usuario !== nuevoPerfil.Usuario
      );
      actualizado.push(nuevoPerfil);

      localStorage.setItem(
        "perfilesTrabajadores",
        JSON.stringify(actualizado)
      );

      // ✅ Guardar sesión del trabajador
      localStorage.setItem("usuarioOn", "true");
      localStorage.setItem("tipoUsuario", "trabajador");
      localStorage.setItem("imagenPerfilActual", imagenConvertida);
      window.dispatchEvent(new Event("storage"));

      navigate("/perfil", { state: { esTrabajador: true } });
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    }
  };
  
  const camposConValidacion = ["Usuario", "Password", "PepPassword", "Direccion"];
  const camposValidadosConEspacios = ["Nombres y Apellidos"];
  const camposSoloLetras = ["Localidad", "Oficios"];
  const camposSoloNumeros = ["Telefono", "Dni"];

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
        {/*<hr
          style={{
            borderTop: "0.2vw solid black",
            marginBottom: "2vw",
            borderRight: "60vw inset black",
            margin: "4px 0",
          }}
        />*/}
      </div>
      {/*<div className="tituloSeccionImg">
        <h4>Seleccione imágenes de sus trabajos y/o de sí mismo</h4>
      </div>
      <div className="primeraparte">
        <div className="divcarrusel">
          <div className="carrusel" id="contenedorCarrusel">
            {imagenes.length > 0 ? (
              imagenes.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt="Vista previa"
                  className={`imagen-carrusel ${imagenSeleccionada === img.id ? "seleccionada" : ""
                    }`}
                  onClick={() => handleSeleccionarImagen(img.id)}
                />
              ))
            ) : (
              <p className="placeHolderCarrucel">No hay imágenes cargadas</p>
            )}
          </div>
          <div id="divbtnagregarimg">
            <input
              type="file"
              id="btnagregarimg"
              accept="image/*"
              multiple
              hidden
              onChange={handleImagenChange}
            />
            <label htmlFor="btnagregarimg" className="btnagregareliminarimg">
              Subir Imagen
            </label>
            <button
              id="btneliminarimg"
              className="btnagregareliminarimg"
              onClick={handleEliminarImagen}
              type="button"
            >
              Eliminar Imagen
            </button>
          </div>
        </div>
        <div className="trabajador">
          <img
            id="imagenTrabajador"
            className="imagentrab"
            src={imagenPerfil}
            alt="fondo sin imagen"
          />
        </div>
      </div> */}
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
