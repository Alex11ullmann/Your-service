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
    const [dniExistente, setDniExistente] = useState(false);
    const [emailExistente, setEmailExistente] = useState(false);

    const navigate = useNavigate();
    const tipoUsuario = localStorage.getItem("tipoUsuario");
    const esTrabajadorReal = tipoUsuario === "trabajador";
    const API_URL = "https://your-service-3v1h.onrender.com";

    const [idPerfil, setIdPerfil] = useState(null);
    const [catalogoOficios, setCatalogoOficios] = useState([]);

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
                console.error("Error verificando campo único:", error);
            }
        };

        const cargarOficios = async () => {
            try {
                const res = await axios.get(`${API_URL}/oficios`);
                setCatalogoOficios(res.data);
            } catch (error) {
                console.error("Error verificando campo único:", error);
            }
        };

        cargarOficios();
        fetchData();
    }, []);

    const validarUnicos = async (name, value) => {
        if (!value) return;

        try {
            if (name === "dni") {
                const res = await axios.get(`${API_URL}/perfiles/dni/${value}`);
                const existe = res.data.existe && res.data.id_perfiles !== Number(idPerfil);
                setDniExistente(existe);
            }

            if (name === "email") {
                const res = await axios.get(`${API_URL}/perfiles/email/${value}`);
                const existe = res.data.existe && res.data.id_perfiles !== Number(idPerfil);
                setEmailExistente(existe);
            }
        } catch (err) {
            console.error("Error verificando campo único:", err);
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "dni" || name === "email") {
            validarUnicos(name, value);
        }
    };

    const agregarOficio = (e) => {
        const oficio = Number(e.target.value);
        if (!oficio || isNaN(oficio)) return;

        if (!formData.oficios.includes(oficio)) {
            setFormData((prev) => ({
                ...prev,
                oficios: [...prev.oficios, oficio],
            }));
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
            console.error("Error verificando campo único:", error);
        }
    };

    const handleGuardarCambios = async () => {
        //VALIDACIÓN CAMPOS VACÍOS
        for (let key in formData) {
            if (
                formData[key] === null ||
                formData[key] === undefined ||
                String(formData[key]).trim() === ""
            ) {
                alert("⚠️ Por favor completá todos los campos antes de guardar.");
                return;
            }
        }
        if (!idPerfil) {
            alert("El perfil no está cargado. Cerrá sesión y volvé a entrar.");
            return;
        }
        if (dniExistente) {
            alert("⚠️ El DNI ingresado ya está en uso.");
            return;
        }
        if (emailExistente) {
            alert("⚠️ El email ingresado ya está en uso.");
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

            const oficiosLimpios = formData.oficios.filter((o) => o && !isNaN(o));

            for (let oficio of oficiosLimpios) {
                await axios.post(`${API_URL}/trabajador-oficio/${idPerfil}/${oficio}`);
            }

            alert("Cambios guardados correctamente");
            window.location.reload();
        } catch (error) {
            alert("No se pudieron guardar los cambios", error);
        }
    };

    const handleEliminarCuenta = async () => {
        const inputPass = document.getElementById("inputEliminarPass").value.trim();

        if (!inputPass) {
            alert("Ingrese su contraseña para continuar");
            return;
        }

        const usuarioNombre = formData.usuario;

        try {
            await axios.post(`${API_URL}/usuarios/login`, {
                usuario: usuarioNombre,
                password: inputPass,
            });
        } catch (e) {
            alert("Contraseña incorrecta", e);
            return;
        }

        const confirmar = window.confirm("¿Seguro que querés eliminar tu cuenta?");
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
            alert("No se pudo eliminar la cuenta", error);
        }
    };

    const camposConValidacion = ["usuario"];
    const camposValidadosConEspacios = ["nombresYApellidos"];
    const camposSoloLetras = ["localidad"];
    const camposSoloNumeros = ["telefono", "dni"];
    const campoEmail = ["email"];

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

                        let InputComponent = null;

                        if (camposConValidacion.includes(data.name)) {
                            InputComponent = InputValidado;
                        } else if (camposSoloNumeros.includes(data.name)) {
                            InputComponent = InputSoloNumeros;
                        } else if (camposSoloLetras.includes(data.name)) {
                            InputComponent = InputSoloLetras;
                        } else if (camposValidadosConEspacios.includes(data.name)) {
                            InputComponent = InputSoloLetrasYEspacio;
                        } else if (campoEmail.includes(data.name)) {
                            InputComponent = InputEmail;
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

                                {data.name === "dni" && dniExistente && (
                                    <p className="error-input">⚠️ Este DNI ya está registrado.</p>
                                )}

                                {data.name === "email" && emailExistente && (
                                    <p className="error-input">⚠️ Este email ya está registrado.</p>
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