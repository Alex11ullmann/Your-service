import React, { useState, useEffect } from "react";
import "./stylesPerfiles.css";
import { InfoPerfiles } from "./InfoPerfiles";
import { useNavigate } from "react-router-dom";

import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";

import ListaDeOficios from "../RegistroTrabajador/ListaDeOficios.jsx";

export default function CuerpoPerfiles() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const tipoUsuario = localStorage.getItem("tipoUsuario");
    const esTrabajadorReal = tipoUsuario === "trabajador";

    const camposConValidacion = ["direccion"];
    const camposSoloLetras = ["localidad"];
    const camposSoloNumeros = ["telefono", "dni"];
    const camposValidadosConEspacios = ["nombresYApellidos"];

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

        if (!datosGuardados) {
            setFormData({});
            return;
        }

        const data = JSON.parse(datosGuardados);

        if (!Array.isArray(data.oficios)) {
            data.oficios = [];
        }

        setFormData(data);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // -------------------------
    // OFICIOS – AGREGAR / QUITAR
    // -------------------------

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

    const handleGuardarCambios = () => {

        for (const campo of InfoPerfiles) {
            const valor = formData[campo.name] || "";
            const min = campo.minLength;
            const max = campo.maxLength;

            if (campo.name === "usuario") continue;
            if (campo.name === "oficios") {
                if (esTrabajadorReal && formData.oficios.length === 0) {
                    alert("⚠️ Debes tener al menos un oficio.");
                    return;
                }
                continue;
            }

            if (valor.length < min) {
                alert(`⚠️ El campo "${campo.datos}" debe tener al menos ${min} caracteres.`);
                return;
            }

            if (valor.length > max) {
                alert(`⚠️ El campo "${campo.datos}" no puede superar ${max} caracteres.`);
                return;
            }

            if (["telefono", "dni"].includes(campo.name)) {
                if (!/^\d+$/.test(valor)) {
                    alert(`🚫 El campo "${campo.datos}" solo puede contener números.`);
                    return;
                }
            }

            if (["localidad"].includes(campo.name)) {
                if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/.test(valor)) {
                    alert(`🚫 El campo "${campo.datos}" solo puede contener letras.`);
                    return;
                }
            }

            if (campo.name === "nombresYApellidos") {
                if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(valor)) {
                    alert(`🚫 "${campo.datos}" solo puede contener letras y espacios.`);
                    return;
                }
            }
        }

        const clave = esTrabajadorReal
            ? "datosRegistroTrabajador"
            : "datosRegistro";

        localStorage.setItem(clave, JSON.stringify(formData));

        if (esTrabajadorReal) {
            const perfiles = JSON.parse(localStorage.getItem("perfilesTrabajadores")) || [];

            const nuevoPerfil = {
                Usuario: formData.usuario,
                nombreCompleto: formData.nombresYApellidos,
                localidad: formData.localidad,
                telefono: formData.telefono,
                oficios: formData.oficios,
                descripcion: formData.perfilProfesional || "",
            };

            const indice = perfiles.findIndex(
                (p) => p.Usuario?.toLowerCase() === nuevoPerfil.Usuario.toLowerCase()
            );

            if (indice !== -1) {
                perfiles[indice] = { ...perfiles[indice], ...nuevoPerfil };
            } else {
                perfiles.push(nuevoPerfil);
            }

            localStorage.setItem("perfilesTrabajadores", JSON.stringify(perfiles));
        }

        alert("✅ Cambios guardados correctamente");
        window.location.reload();
    };

    const handleEliminarCuenta = () => {
        const clave = esTrabajadorReal ? "datosRegistroTrabajador" : "datosRegistro";
        const inputPass = document.getElementById("inputEliminarPass").value.trim();

        const datosGuardados = localStorage.getItem(clave);

        if (!datosGuardados) {
            alert("❌ No se encontró ninguna cuenta registrada.");
            return;
        }

        const data = JSON.parse(datosGuardados);
        const contraseniaGuardada = data.password || "";

        if (!inputPass) {
            alert("⚠️ Por favor, ingrese su contraseña para continuar.");
            return;
        }

        if (inputPass !== contraseniaGuardada) {
            alert("❌ La contraseña no coincide.");
            return;
        }

        const confirmar = window.confirm(
            "⚠️ ¿Seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer."
        );

        if (confirmar) {
            localStorage.clear();
            window.dispatchEvent(new CustomEvent("app-session-changed", { detail: "logout" }));
            alert("✅ Cuenta eliminada.");
            navigate("/");
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
                                placeholder="📝 Min 20 caracts - Max 600 caracts"
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
                        <input id="inputEliminarPass" type="password" placeholder="🔒 Ingrese su contraseña" />

                        <button
                            id="btnEliminarCuenta"
                            style={{ background: "rgba(240, 91, 91, 1)" }}
                            onClick={handleEliminarCuenta}
                        >
                            Eliminar cuenta ✅
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
