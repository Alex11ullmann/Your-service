import React, { useState, useEffect } from "react";
import "./stylesPerfiles.css";
import { InfoPerfiles } from "./InfoPerfiles";
import SinPerfil from "../../Images/sinperfil.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function CuerpoPerfiles() {
    const [imagenes, setImagenes] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [imagenPerfil, setImagenPerfil] = useState(SinPerfil);
    const [formData, setFormData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const esTrabajador = location.state?.esTrabajador;

    // Traer datos del registro (usuario o trabajador)
    useEffect(() => {
        const clave = esTrabajador ? "datosRegistroTrabajador" : "datosRegistro";
        const datosGuardados = localStorage.getItem(clave);
        if (datosGuardados) {
            const data = JSON.parse(datosGuardados);
            setFormData(data.formData || data || {});
            setImagenes(data.imagenes || []);
            setImagenPerfil(data.imagenPerfil || SinPerfil);
        }
    }, [esTrabajador]);

    // Manejar cambios en inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Convertir imagen seleccionada a Base64
    const handleImagenPerfilChange = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagenPerfil(reader.result); // Guarda Base64 directamente
        };
        reader.readAsDataURL(archivo);
    };

    // Cargar imágenes de trabajos
    const handleImagenChange = (e) => {
        const archivos = Array.from(e.target.files);
        if (archivos.length === 0) return;
        const nuevasImagenes = archivos.map((archivo) => ({
            id: URL.createObjectURL(archivo),
            url: URL.createObjectURL(archivo),
        }));
        setImagenes((prev) => [...prev, ...nuevasImagenes]);
    };

    // Seleccionar imagen del carrusel
    const handleSeleccionarImagen = (id) => {
        setImagenSeleccionada(id);
    };

    // Eliminar imagen seleccionada del carrusel
    const handleEliminarImagen = () => {
        if (!imagenSeleccionada) return;
        const nuevasImagenes = imagenes.filter((img) => img.id !== imagenSeleccionada);
        try {
            const eliminada = imagenes.find((img) => img.id === imagenSeleccionada);
            if (eliminada) URL.revokeObjectURL(eliminada.url);
        } catch (error) {
            console.warn("No se pudo revocar la URL:", error);
        }
        setImagenes(nuevasImagenes);
        setImagenSeleccionada(null);
    };

    // Guardar cambios y actualizar perfiles globales
    const handleGuardarCambios = () => {
        const clave = esTrabajador ? "datosRegistroTrabajador" : "datosRegistro";
        const datosAGuardar = {
            formData,
            imagenes,
            imagenPerfil,
        };
        localStorage.setItem(clave, JSON.stringify(datosAGuardar));
        // Si es trabajador, también actualizamos la lista global (Buscar)
        if (esTrabajador) {
            const perfilesExistentes =
                JSON.parse(localStorage.getItem("perfilesTrabajadores")) || [];
            const nuevoPerfil = {
                Usuario:
                    formData.Usuario ||
                    formData.nombreUsuario ||
                    "Sin nombre",
                oficio: formData.oficio || "No especificado",
                Localidad: formData.Localidad || "No indicada",
                Telefono: formData.Telefono || "No informado",
                imagenPerfil: imagenPerfil || "",
            };
            // Reemplazamos si ya existe ese usuario
            const actualizados = perfilesExistentes.filter(
                (p) => p.Usuario !== nuevoPerfil.Usuario
            );
            actualizados.push(nuevoPerfil);
            localStorage.setItem("perfilesTrabajadores", JSON.stringify(actualizados));
        }
        alert("Cambios guardados correctamente ✅");
    };

    // Eliminar cuenta, también elimina la tarjeta del listado Buscar
    const handleEliminarCuenta = () => {
        const clave = esTrabajador ? "datosRegistroTrabajador" : "datosRegistro";
        const inputPass = document.getElementById("inputEliminarPass").value.trim();
        const datosGuardados = localStorage.getItem(clave);
        if (!datosGuardados) {
            alert("No se encontró ninguna cuenta registrada.");
            return;
        }
        const data = JSON.parse(datosGuardados);
        const contraseñaGuardada = data.formData?.Password || "";
        if (!inputPass) {
            alert("Por favor, ingrese su contraseña para continuar.");
            return;
        }
        if (inputPass !== contraseñaGuardada) {
            alert("❌ La contraseña no coincide. Intente nuevamente.");
            return;
        }
        const confirmar = window.confirm(
            "⚠️ ¿Estás segura/o de que querés eliminar tu cuenta? Esta acción no se puede deshacer."
        );
        if (confirmar) {
            // Eliminamos los datos del perfil actual
            localStorage.removeItem(clave);
            // Si era trabajador, borramos también su tarjeta de la lista global
            if (esTrabajador) {
                const perfilesExistentes =
                    JSON.parse(localStorage.getItem("perfilesTrabajadores")) || [];
                const actualizados = perfilesExistentes.filter(
                    (p) =>
                        p.Usuario?.toLowerCase() !==
                        (formData.Usuario || "").toLowerCase()
                );
                localStorage.setItem(
                    "perfilesTrabajadores",
                    JSON.stringify(actualizados)
                );
            }
            alert("Su cuenta ha sido eliminada correctamente.");
            navigate("/");
        }
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
                        <label
                            htmlFor="btnagregarimgpfil"
                            className="btnFotoPerfil"
                            required
                        >
                            Seleccionar Imagen de Perfil
                        </label>
                    </div>
                </div>
                <div className="formularios">
                    <h2>Nombre de Perfil:</h2>
                    <h3>
                        {formData.Usuario ||
                            formData.nombreUsuario ||
                            formData.usuario ||
                            formData.nombre ||
                            formData.nombreCompleto ||
                            " "}
                    </h3>
                    {InfoPerfiles.map((data) => (
                        <div className="modificar" key={data.datos}>
                            <h4>{data.datos}:</h4>
                            <input
                                type="text"
                                name={data.name}
                                value={formData[data.name] || ""}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    {esTrabajador && (
                        <div className="perfil-profesional">
                            <h4>Perfil Profesional:</h4>
                            <textarea
                                id="textareaDescripcion"
                                placeholder="Min 20 caracts - Max 600 caracts"
                                minLength="20"
                                maxLength="600"
                                name="perfilProfesional"
                                value={formData.perfilProfesional || ""}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    )}
                    <div className="opciones">
                        <button
                            id="guardarCambios"
                            style={{ background: "#62a9f5ff" }}
                            onClick={handleGuardarCambios}
                        >
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
                            onClick={handleEliminarCuenta}
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
                                    className={`imagen-carrusel ${imagenSeleccionada === img.id
                                            ? "seleccionada"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        handleSeleccionarImagen(img.id)
                                    }
                                />
                            ))
                        ) : (
                            <p className="placeholder">
                                No hay imágenes cargadas
                            </p>
                        )}
                    </div>
                    <h2>
                        Luego de subir o eliminar una imagen, no olvide guardar sus cambios!
                    </h2>
                    <div id="divBtnAgregarImg">
                        <input
                            type="file"
                            id="btnagregarimg"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={handleImagenChange}
                        />
                        <label
                            htmlFor="btnagregarimg"
                            className="btnagregareliminarimg"
                        >
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
