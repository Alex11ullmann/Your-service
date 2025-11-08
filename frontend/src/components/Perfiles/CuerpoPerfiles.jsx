import React, { useState, useEffect } from "react";
import "./stylesPerfiles.css";
import { InfoPerfiles } from "./InfoPerfiles";
import { useNavigate } from "react-router-dom";

export default function CuerpoPerfiles() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    // ✅ Detectar siempre desde localStorage
    const tipoUsuario = localStorage.getItem("tipoUsuario");
    const esTrabajadorReal = tipoUsuario === "trabajador";

    // ✅ Cargar datos del registro
    useEffect(() => {
        const usuarioActivo = localStorage.getItem("usuarioOn") === "true";
        if (!usuarioActivo) {
            setFormData({});
            return;
        }

        const clave = esTrabajadorReal
            ? "datosRegistroTrabajador"
            : "datosRegistro";

        const datosGuardados = localStorage.getItem(clave);

        if (datosGuardados) {
            const data = JSON.parse(datosGuardados);
            setFormData(data.formData || data || {});
        } else {
            setFormData({});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


    // ✅ Manejar cambios
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ Guardar cambios
    const handleGuardarCambios = () => {
        const clave = esTrabajadorReal
            ? "datosRegistroTrabajador"
            : "datosRegistro";

        const datosPrevios = JSON.parse(localStorage.getItem(clave)) || {};

        const datosAGuardar = {
            ...datosPrevios,
            formData: { ...formData },
        };

        localStorage.setItem(clave, JSON.stringify(datosAGuardar));

        // ✅ Si es trabajador, actualizar listado para "Buscar"
        if (esTrabajadorReal) {
            const perfilesExistentes =
                JSON.parse(localStorage.getItem("perfilesTrabajadores")) || [];

            const nuevoPerfil = {
                Usuario:
                    formData.Usuario ||
                    formData.nombreUsuario ||
                    "Sin nombre",

                nombreCompleto:
                    formData["Nombres y Apellidos"] ||
                    formData.nombreCompleto ||
                    "Sin nombre",

                Localidad: formData.Localidad || "No indicada",
                Telefono: formData.Telefono || "No informado",

                oficios: formData.Oficios || "No especificado",
            };

            const actualizados = perfilesExistentes.filter(
                (p) =>
                    p.Usuario?.toLowerCase() !==
                    (nuevoPerfil.Usuario || "").toLowerCase()
            );

            actualizados.push(nuevoPerfil);

            localStorage.setItem(
                "perfilesTrabajadores",
                JSON.stringify(actualizados)
            );
        }

        alert("Cambios guardados correctamente ✅");
        window.location.reload();
    };

    // ✅ Eliminar cuenta
    const handleEliminarCuenta = () => {
        const clave = esTrabajadorReal ? "datosRegistroTrabajador" : "datosRegistro";
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
            alert("❌ La contraseña no coincide.");
            return;
        }

        const confirmar = window.confirm(
            "⚠️ ¿Seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer."
        );

        if (confirmar) {
            // ✅ Eliminar datos del perfil
            localStorage.removeItem(clave);

            // ✅ Eliminar datos de sesión
            localStorage.setItem("usuarioOn", "false");
            localStorage.removeItem("imagenPerfilActual");
            localStorage.removeItem("tipoUsuario");

            // ✅ Si era trabajador, eliminar también su tarjeta
            if (esTrabajadorReal) {
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

            // ✅ Forzar actualización del Header
            window.dispatchEvent(new Event("storage"));

            navigate("/");
        }
    };


    return (
        <div className="cuerpo">
            <div className="contenido">
                <div className="formularios">

                    <h2>Nombre de Perfil:</h2>
                    <h3>
                        {formData.Usuario ||
                            formData.nombreUsuario ||
                            formData.nombre ||
                            formData.nombreCompleto ||
                            ""}
                    </h3>

                    {/* ✅ Mostrar campos, excepto OFICIOS si no es trabajador */}
                    {InfoPerfiles.map((data) => {
                        if (data.name === "Oficios" && !esTrabajadorReal) {
                            return null;
                        }

                        return (
                            <div className="modificar" key={data.datos}>
                                <h4>{data.datos}:</h4>
                                <input
                                    type="text"
                                    name={data.name}
                                    value={formData[data.name] || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        );
                    })}

                    {/* ✅ Solo trabajador: Perfil Profesional */}
                    {esTrabajadorReal && (
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
        </div>
    );
}
