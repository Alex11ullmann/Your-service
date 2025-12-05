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
                console.warn("⚠ No hay id_usuario en localStorage.");
                return;
            }

            try {
                const userRes = await axios.get(`${API_URL}/usuarios/${idUsuario}`);
                const usuario = userRes.data;

                const perfilRes = await axios.get(`${API_URL}/perfiles/usuario/${idUsuario}`);
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

    const agregarOficio = (e) => {
        const nuevoId = Number(e.target.value);
        if (!nuevoId) return;
        if (formData.oficios.includes(nuevoId)) return;

        setFormData((prev) => ({
            ...prev,
            oficios: [...prev.oficios, nuevoId],
        }));
    };

    const eliminarOficio = (id) => {
        setFormData((prev) => ({
            ...prev,
            oficios: prev.oficios.filter((o) => o !== id),
        }));
    };

    // 2. GUARDAR CAMBIOS (PATCH)
    const handleGuardarCambios = async () => {
        try {
            const idUsuario = localStorage.getItem("id_usuario");

            // PATCH usuario
            await axios.patch(`${API_URL}/usuarios/${idUsuario}`, {
                usuario: formData.usuario,
                password: formData.password,
            });

            // PATCH perfil
            await axios.patch(`${API_URL}/perfiles/${idPerfil}`, {
                nombresYApellidos: formData.nombresYApellidos,
                localidad: formData.localidad,
                direccion: formData.direccion,
                telefono: formData.telefono,
                dni: formData.dni,
                email: formData.email,
                descripcion: formData.perfilProfesional,
                oficios: formData.oficios, // ✔ array de IDs correcto
            });

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

            await axios.delete(`${API_URL}/perfiles/${idPerfil}`);
            await axios.delete(`${API_URL}/usuarios/${idUsuario}`);

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
                                            const oficio = catalogoOficios.find((o) => o.id_oficios === id);
                                            return (
                                                <span
                                                    key={id}
                                                    className="tag-oficio"
                                                    onClick={() => eliminarOficio(id)}
                                                >
                                                    {oficio?.nombre_oficio} ✕
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
