import React, { useState } from "react";
import "./styleRegistroTrabajador.css";
import SinFoto from "../../Images/Photograph.jpg";

export default function CuerpoRegistroTrabajador() {
  const [imagenes, setImagenes] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [imagenPerfil, setImagenPerfil] = useState(SinFoto);

  // Maneja la carga de imágenes
  const handleImagenChange = (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length === 0) return;
    const nuevasImagenes = archivos.map((archivo) => ({
      id: URL.createObjectURL(archivo),
      url: URL.createObjectURL(archivo),
    }));
    setImagenes((prev) => [...prev, ...nuevasImagenes]);
  };

  // Seleccionar imagen al hacer click
  const handleSeleccionarImagen = (id) => {
    setImagenSeleccionada(id);
    const seleccionada = imagenes.find((img) => img.id === id);
    if (seleccionada) setImagenPerfil(seleccionada.url);
  };

  // Eliminar la imagen seleccionada
  const handleEliminarImagen = () => {
    if (!imagenSeleccionada) return;
    const index = imagenes.findIndex((img) => img.id === imagenSeleccionada);
    if (index === -1) return;
    const nuevasImagenes = imagenes.filter((img) => img.id !== imagenSeleccionada);

    // Liberar memoria
    try {
      const eliminada = imagenes[index];
      if (eliminada) URL.revokeObjectURL(eliminada.url);
    } catch (error) {
      console.warn("No se pudo revocar la URL:", error);
    }

    // Seleccionar la imagen anterior si existe o la siguiente, o volver a SinFoto
    let nuevaSeleccion = null;
    if (index > 0) {
      nuevaSeleccion = nuevasImagenes[index - 1];
    } else if (nuevasImagenes.length > 0) {
      nuevaSeleccion = nuevasImagenes[0];
    }

    setImagenes(nuevasImagenes);
    setImagenSeleccionada(nuevaSeleccion ? nuevaSeleccion.id : null);
    setImagenPerfil(nuevaSeleccion ? nuevaSeleccion.url : SinFoto);
  };

  return (
    <div className="tarjeta">
      <div className="linea">
        <h1>
          Bienvenido a la sección donde podrá crear su perfil de trabajador, por
          favor complete las siguientes secciones...
        </h1>
        <div id="imagen"></div>
        <div>
          <h4>Seleccione imágenes de sus trabajos y/o de sí mismo</h4>
        </div>
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
                  className={`imagen-carrusel ${
                    imagenSeleccionada === img.id ? "seleccionada" : ""
                  }`}
                  onClick={() => handleSeleccionarImagen(img.id)}
                />
              ))
            ) : (
              <p className="placeholder">No hay imágenes cargadas</p>
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
      </div>
      <div className="descripcion">
        <h3>Perfil Profesional</h3>
        <a>
          Escriba aquí lo que quiera hacer saber a los demás sobre usted mismo.
          Experiencias, antigüedad, etc.
        </a>
        <textarea
          name="texto"
          id="textareaqs"
          placeholder="Min 20 caracts - Max 600 caracts"
          minLength="20"
          maxLength="600"
        ></textarea>
      </div>
      <div className="botonguardardatos">
        <input type="button" value="Guardar" id="botonguardar" />
      </div>
    </div>
  );
}
