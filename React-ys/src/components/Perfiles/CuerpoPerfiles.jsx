import React, { useState, useEffect } from "react";
import "./stylesPerfiles.css";
import { InfoPerfiles } from "./InfoPerfiles";
import { useNavigate } from "react-router-dom";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";
import ListaDeOficios from "../RegistroTrabajador/ListaDeOficios.jsx";
import axios from "axios";

export default function CuerpoPerfiles() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const tipoUsuario = localStorage.getItem("tipoUsuario");
    const esTrabajadorReal = tipoUsuario === "trabajador";

    const camposConValidacion = ["direccion"];
    const camposSoloLetras = ["localidad"];
    const camposSoloNumeros = ["telefono", "dni"];
    const camposValidadosConEspacios = ["nombresYApellidos"];

    const [idPerfil, setIdPerfil] = useState(null);

    // =========================================================
    //      1. TRAER DATOS DEL BACK Y CARGAR EL FORMULARIO
    // =========================================================
    useEffect(() => {
        const usuarioActivo = localStorage.getItem("usuarioOn") === "true";
        if (!usuarioActivo) {
            setFormData({});
            return;
        }

        const idUsuario = localStorage.getItem("id_usuario");
        if (!idUsuario) {
            console.warn("No hay ID de usuario en storage.");
            return;
        }

        const fetchData = async () => {
            try {
                const userRes = await axios.get(`http://localhost:3000/usuarios/${idUsuario}`);
                const usuario = userRes.data;

                const perfilRes = await axios.get(`http://localhost:3000/perfiles/usuario/${idUsuario}`);
                const perfil = perfilRes.data;

                setIdPerfil(perfil.id_perfil);

                const datosPerfil = {
                    usuario: usuario.usuario,
                    password: usuario.password,
                    nombresYApellidos: perfil.nombresYApellidos,
                    localidad: perfil.localidad,
                    direccion: perfil.direccion,
                    telefono: perfil.telefono,
                    dni: perfil.dni,
                    email: perfil.email,
                    oficios: perfil.oficios || [],
                    perfilProfesional: perfil.descripcion || "",
                };

                setFormData(datosPerfil);

            } catch (error) {
                console.error("❌ Error al cargar datos del perfil:", error);
            }
        };

        fetchData();
    }, []);


    // =========================================================
    //      ESTADOS Y MANEJO DE INPUTS
    // =========================================================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const agregarOficio = (e) => {
        const nuevo = e.target.value;

        if (!nuevo) return;
        if (formData.oficios.includes(nuevo)) return;

        setFormData((prev) => ({
            ...prev,
            oficios: [...prev.oficios, nuevo],
        }));
    };

    const eliminarOficio = (item) => {
        setFormData((prev) => ({
            ...prev,
            oficios: prev.oficios.filter((o) => o !== item),
        }));
    };


    // =========================================================
    //      2. PATCH → GUARDAR CAMBIOS EN BACKEND
    // =========================================================
    const handleGuardarCambios = async () => {
        try {
            const idUsuario = localStorage.getItem("id_usuario");

            // ----------------- PATCH usuario -----------------
            await axios.patch(`http://localhost:3000/usuarios/${idUsuario}`, {
                usuario: formData.usuario,
                password: formData.password
            });

            // ----------------- PATCH perfil -----------------
            await axios.patch(`http://localhost:3000/perfiles/${idPerfil}`, {
                nombresYApellidos: formData.nombresYApellidos,
                localidad: formData.localidad,
                direccion: formData.direccion,
                telefono: formData.telefono,
                dni: formData.dni,
                email: formData.email,
                descripcion: formData.perfilProfesional,
                oficios: formData.oficios
            });

            alert("✅ Cambios guardados correctamente");
            window.location.reload();

        } catch (error) {
            console.error("❌ Error en PATCH:", error);
            alert("No se pudieron guardar los cambios");
        }
    };


    // =========================================================
    //      3. DELETE → ELIMINAR CUENTA EN BACKEND
    // =========================================================
    const handleEliminarCuenta = async () => {
        const inputPass = document.getElementById("inputEliminarPass").value.trim();

        if (!inputPass) {
            alert("⚠️ Ingrese su contraseña para continuar");
            return;
        }

        if (inputPass !== formData.password) {
            alert("❌ Contraseña incorrecta");
            return;
        }

        const confirmar = window.confirm(
            "⚠️ ¿Seguro que querés eliminar tu cuenta? Esta acción es permanente."
        );

        if (!confirmar) return;

        try {
            const idUsuario = localStorage.getItem("id_usuario");

            await axios.delete(`http://localhost:3000/perfiles/${idPerfil}`);
            await axios.delete(`http://localhost:3000/usuarios/${idUsuario}`);

            localStorage.clear();
            alert("Cuenta eliminada correctamente");
            navigate("/");

        } catch (error) {
            console.error("❌ Error al eliminar cuenta:", error);
            alert("No se pudo eliminar la cuenta");
        }
    };


    // =========================================================
    //      RENDER DEL FORMULARIO COMPLETO
    // =========================================================
    return (
        <div className="cuerpo">
            <div className="contenido">
                <div className="formularios">

                    <h2>Nombre de Perfil:</h2>
                    <h3>{formData.usuario}</h3>

                    {InfoPerfiles.map((data) => {
                        if (data.name === "usuario") return null;
                        if (data.name === "oficios" && !esTrabajadorReal) return null;

                        if (data.name === "oficios" && esTrabajadorReal) {
                            return (
                                <div className="modificar" key={data.name}>
                                    <h4>{data.datos}:</h4>

                                    <select
                                        className="datos"
                                        onChange={agregarOficio}
                                        defaultValue=""
                                    >
                                        <option value="">Seleccionar oficio...</option>
                                        {ListaDeOficios.map((of) => (
                                            <option key={of} value={of}>
                                                {of}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="contenedor-etiquetas">
                                        {formData.oficios?.map((o) => (
                                            <span
                                                key={o}
                                                className="tag-oficio"
                                                onClick={() => eliminarOficio(o)}
                                            >
                                                {o} ✕
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        let InputComponent = null;

                        if (camposConValidacion.includes(data.name)) {
                            InputComponent = InputValidado;
                        } else if (camposSoloNumeros.includes(data.name)) {
                            InputComponent = InputSoloNumeros;
                        } else if (camposSoloLetras.includes(data.name)) {
                            InputComponent = InputSoloLetras;
                        } else if (camposValidadosConEspacios.includes(data.name)) {
                            InputComponent = InputSoloLetrasYEspacio;
                        }

                        return (
                            <div className="modificar" key={data.name}>
                                <h4>{data.datos}:</h4>

                                {InputComponent ? (
                                    <InputComponent
                                        name={data.name}
                                        type="text"
                                        value={formData[data.name] || ""}
                                        onChange={handleChange}
                                        minLength={data.minLength}
                                        maxLength={data.maxLength}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        name={data.name}
                                        value={formData[data.name] || ""}
                                        onChange={handleChange}
                                        minLength={data.minLength}
                                        maxLength={data.maxLength}
                                    />
                                )}
                            </div>
                        );
                    })}

                    {esTrabajadorReal && (
                        <div className="perfil-profesional">
                            <h4>Perfil Profesional:</h4>
                            <textarea
                                id="textareaDescripcion"
                                placeholder="📝 Min 20 - Max 600"
                                minLength="20"
                                maxLength="600"
                                name="perfilProfesional"
                                value={formData.perfilProfesional || ""}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="opciones">
                        <button
                            id="guardarCambios"
                            style={{ background: "#62a9f5ff" }}
                            onClick={handleGuardarCambios}
                        >
                            Guardar Cambios 💾
                        </button>

                        <h3>Eliminar mi cuenta</h3>
                        <input id="inputEliminarPass" type="password" placeholder="🔒 Contraseña" />

                        <button
                            id="btnEliminarCuenta"
                            style={{ background: "rgba(240, 91, 91, 1)" }}
                            onClick={handleEliminarCuenta}
                        >
                            Eliminar cuenta ❌
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
