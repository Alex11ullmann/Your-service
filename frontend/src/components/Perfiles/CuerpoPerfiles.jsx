import React, { useState } from "react";
import "./stylesPerfiles.css";
import Aire from "../../Images/Aire.jfif";
import { InfoPerfiles } from "./InfoPerfiles";
import SinPerfil from "../../Images/sinperfil.png";

export default function CuerpoPerfiles({ esTrabajador }) {
    const [imagenes, setImagenes] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [imagenPerfil, setImagenPerfil] = useState(SinPerfil);

    // Maneja la selección de la imagen del perfil
    const handleImagenPerfilChange = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;
        const nuevaImagen = URL.createObjectURL(archivo);
        setImagenPerfil(nuevaImagen);
    };

    // Maneja la carga de imágenes en el contenedor
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
        setImagenPerfil(nuevaSeleccion ? nuevaSeleccion.url : SinPerfil);
    };

    return (
        <div className="cuerpo">
            <div className="contenido">
                <div className="info-imgPerfil">
                    <div className="foto-perfil">
                        <img
                            id="imagenPerfil"
                            className="foto-perfil"
                            src={imagenPerfil}
                            alt="silueta oscura de persona"
                        />
                    </div>
                    <div id="divbtnagregarimg">
                        <input
                            type="file"
                            id="btnagregarimgpfil"
                            accept="image/*"
                            hidden
                            onChange={handleImagenPerfilChange}
                        />
                        <label htmlFor="btnagregarimgpfil" className="btnFotoPerfil" required>
                            Seleccionar Imagen de Perfil
                        </label>
                    </div>
                </div>
                <div className="formularios">
                    <h3>Nombre de Perfil:</h3>
                    <h3></h3>
                    {InfoPerfiles.map((data) => (
                        <div className="modificar" key={data.datos}>
                            <h4>{data.datos}:</h4>
                            <input type="text" />
                        </div>
                    ))}
                    <div className="perfil-profesional">
                        <h4>Perfil Profesional:</h4>
                        <textarea
                            id="textareaDescripcion"
                            placeholder="Min 20 caracts - Max 600 caracts"
                            minLength="20"
                            maxLength="600"
                        ></textarea>
                    </div>
                    <div className="opciones">
                        <button id="guardarCambios" style={{ background: "#62a9f5ff" }}>
                            Guardar Cambios
                        </button>
                        <h3>Eliminar mi cuenta</h3>
                        <input
                            id="inputEliminarPass"
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                        <button
                            id="btnEliminarCuenta"
                            style={{ background: "rgba(240, 91, 91, 1)" }}
                        >
                            Eliminar cuenta
                        </button>
                    </div>
                </div>
            </div>

            {esTrabajador && (
                <>
                    <div className="contenedorImagenes">
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
                    <div id="divBtnAgregarImg">
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
                </> 
            )}
        </div>
    );
}
