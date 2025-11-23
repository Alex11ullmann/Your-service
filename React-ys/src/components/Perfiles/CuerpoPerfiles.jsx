import React, { useState, useEffect } from "react";
import "./stylesPerfiles.css";
import { InfoPerfiles } from "./InfoPerfiles";
import { useNavigate } from "react-router-dom";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";

export default function CuerpoPerfiles() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const tipoUsuario = localStorage.getItem("tipoUsuario");
    const esTrabajadorReal = tipoUsuario === "trabajador";

    const camposConValidacion = ["direccion"];
    const camposSoloLetras = ["localidad", "oficios"];
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
        setFormData(data);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardarCambios = () => {

        for (const campo of InfoPerfiles) {
            const valor = formData[campo.name] || "";
            const min = campo.minLength;
            const max = campo.maxLength;

            if (campo.name === "usuario") continue;
            if (campo.name === "oficios" && !esTrabajadorReal) continue;

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

            if (["localidad", "oficios"].includes(campo.name)) {
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
            };

            const actualizados = perfiles.filter(
                (p) => p.Usuario?.toLowerCase() !== nuevoPerfil.Usuario.toLowerCase()
            );

            actualizados.push(nuevoPerfil);

            localStorage.setItem(
                "perfilesTrabajadores",
                JSON.stringify(actualizados)
            );
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

            // BORRAR TODOS LOS DATOS COMO EN LOGOUT
            localStorage.clear();

            // AVISAR A TODA LA APP QUE LA SESIÓN SE CERRÓ
            window.dispatchEvent(new CustomEvent("app-session-changed", { detail: "logout" }));

            alert("✅ Cuenta eliminada.");

            // REDIRIGIR
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
