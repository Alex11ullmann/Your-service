import React, { useState, useEffect } from "react";
import "./stylesPerfiles.css";
import { InfoPerfiles } from "./InfoPerfiles";
import { useNavigate } from "react-router-dom";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";
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

    const API_URL = "https://your-service-3v1h.onrender.com";

    const [idPerfil, setIdPerfil] = useState(null);
    const [catalogoOficios, setCatalogoOficios] = useState([]);

    // 1. TRAER DATOS DEL BACKEND
    useEffect(() => {
        const fetchData = async () => {
            const usuarioActivo = localStorage.getItem("usuarioOn") === "true";
            if (!usuarioActivo) {
                setFormData({});
                return;
            }

            const idUsuario = localStorage.getItem("id_usuario");
            if (!idUsuario) {
                console.warn("⚠️ No hay id_usuario en localStorage.");
                return;
            }

            try {
                const userRes = await axios.get(`${API_URL}/usuarios/${idUsuario}`);
                const usuario = userRes.data;

                const idPerfilLocal = localStorage.getItem("id_perfiles");

                if (!idPerfilLocal) {
                    console.warn("⚠️ No hay id_perfiles en localStorage.");
                    return;
                }

                const perfilRes = await axios.get(`${API_URL}/perfiles/${idPerfilLocal}`);
                const perfil = perfilRes.data;

                setIdPerfil(perfil.id_perfiles);

                const datosPerfil = {
                    usuario: usuario.usuario,
                    password: usuario.password,
                    nombresYApellidos: perfil.nombresYApellidos,
                    localidad: perfil.localidad,
                    direccion: perfil.direccion,
                    telefono: perfil.telefono,
                    dni: perfil.dni,
                    email: perfil.email,
                    oficios: perfil.oficios?.map((o) => o.id_oficios) || [],
                    perfilProfesional: perfil.descripcion || "",
                };

                setFormData(datosPerfil);

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

    // CONTROLADORES DE INPUTS
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejo de oficios
    const agregarOficio = (e) => {
        const value = e.target.value;

        // Evitamos valores inválidos
        if (!value || value === "" || value === "undefined" || value === "null") return;

        const oficio = Number(value);

        if (!isNaN(oficio) && oficio > 0 && !formData.oficios.includes(oficio)) {
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

    // 2. GUARDAR CAMBIOS (PATCH)
    const handleGuardarCambios = async () => {
        if (!idPerfil) {
            console.error("❌ idPerfil es NULL o undefined. No se puede guardar.");
            alert("El perfil no está cargado. Cerrá sesión y volvé a entrar.");
            return;
        }
        try {
            // Registrar datos del trabajador
            await axios.patch(`${API_URL}/perfiles/${idPerfil}`, {
                nombresYApellidos: formData.nombresYApellidos,
                localidad: formData.localidad,
                direccion: formData.direccion,
                telefono: formData.telefono,
                dni: formData.dni,
                email: formData.email,
                descripcion: formData.perfilProfesional,
            });

            // Registrar oficios del trabajador
            const oficiosLimpios = formData.oficios.filter(o => o && !isNaN(o));

            for (let oficio of oficiosLimpios) {
                await axios.post(`${API_URL}/trabajador-oficio/${idPerfil}/${oficio}`);
            }

            alert("✅ Cambios guardados correctamente");
            window.location.reload();
        } catch (error) {
            console.error("❌ Error en PATCH:", error);
            alert("No se pudieron guardar los cambios");
        }
    };

    // 3. ELIMINAR CUENTA
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

        const confirmar = window.confirm("⚠️ ¿Seguro que querés eliminar tu cuenta?");
        if (!confirmar) return;

        try {
            const idUsuario = localStorage.getItem("id_usuario");

            await axios.delete(`${API_URL}/usuarios/${idUsuario}`);
            await axios.delete(`${API_URL}/perfiles/${idPerfil}`);

            localStorage.clear();
            alert("Cuenta eliminada");
            navigate("/");

        } catch (error) {
            console.error("❌ Error al eliminar cuenta:", error);
            alert("No se pudo eliminar la cuenta");
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

                        // SELECT DE OFICIOS
                        if (data.name === "oficios" && esTrabajadorReal) {
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
                                        {formData.oficios?.map((id) => {
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

                        // INPUTS NORMALES
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
