/* eslint-disable no-undef */
import "./styleRegistroUsuario.css";
import { infoParaRegistro } from "./InfoParaRegistro.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";
import BotonPago from "../BotonPago/BotonPago.jsx";
import axios from "axios";

export default function CuerpoRegistroUsuario() {

    const navigate = useNavigate();
    const [pagoRealizado, setPagoRealizado] = useState(false);

    const API_URL = "https://your-service-3v1h.onrender.com";

    // Campos base
    const camposIniciales = infoParaRegistro.reduce((acc, item) => {
        if (item.name !== "oficios") acc[item.name] = "";
        return acc;
    }, {});

    const [formData, setFormData] = useState(camposIniciales);

    const camposEsperados = infoParaRegistro
        .filter(item => item.name !== "oficios")
        .map(item => item.name);

    useEffect(() => {
        localStorage.setItem("pagoRegistro", "");
        localStorage.setItem("pagoOrigen", "");
    }, []);

    // Cargar datos guardados si existen
    useEffect(() => {
        const datosGuardados = localStorage.getItem("datosRegistroUsuario");
        if (datosGuardados) {
            setFormData(JSON.parse(datosGuardados));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // GUARDAR USUARIO COMUN
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pagoRealizado) {
            alert("⚠️ Debes realizar el pago antes de registrarte.");
            return;
        }

        for (let key of camposEsperados) {
            if (!formData[key] || String(formData[key]).trim() === "") {
                alert("⚠️ Completa todos los campos correctamente.");
                return;
            }
        }

        if (formData.password !== formData.repPassword) {
            alert("❌ Las contraseñas no coinciden.");
            return;
        }

        try {
            const datosUsuario = {
                usuario: formData.usuario,
                password: formData.password,
            };
            const resUsuario = await axios.post(`${API_URL}/usuarios`, datosUsuario);
            const idUsuario = resUsuario.data.id_usuario;
            const datosPerfil = {
                nombresYApellidos: formData.nombresYApellidos,
                localidad: formData.localidad,
                direccion: formData.direccion,
                telefono: formData.telefono,
                dni: formData.dni,
                email: formData.email,
                estrabajador: false, 
                id_usuario: idUsuario,
                descripcion: "",
            };

            const resPerfil = await axios.post(`${API_URL}/perfiles`, datosPerfil);
            const idPerfil = resPerfil.data.id_perfiles;

            // Guardar sesión
            localStorage.setItem("id_usuario", idUsuario);
            localStorage.setItem("id_perfiles", idPerfil);
            localStorage.setItem("tipoUsuario", "usuario");
            localStorage.setItem("usuarioOn", "true");

            navigate("/perfil", { state: { esTrabajador: false } });

        } catch (error) {
            console.error("❌ Error al registrar usuario/perfil:", error);
            alert("Ocurrió un error durante el registro.");
        }
    };

    const camposConValidacion = ["usuario", "password", "repPassword", "direccion"];
    const camposValidadosConEspacios = ["nombresYApellidos"];
    const camposSoloLetras = ["localidad"];
    const camposSoloNumeros = ["telefono", "dni"];

    return (
        <div className="cuerpoRegistro">
            <div className="logRegistro-container">
                <h2>Registrarse</h2>

                <form onSubmit={handleSubmit}>
                    {infoParaRegistro
                        .filter(data => data.name !== "oficios")
                        .map((data) => (
                            <div className="input-group" key={data.id}>
                                <label htmlFor={data.id}>{data.label}</label>

                                {camposConValidacion.includes(data.name) ? (
                                    <InputValidado
                                        type={data.type}
                                        myStyle="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        value={formData[data.name]}
                                        onChange={handleChange}
                                        passwordValue={
                                            data.name === "repPassword"
                                                ? formData["password"]
                                                : null
                                        }
                                    />
                                ) : camposSoloNumeros.includes(data.name) ? (
                                    <InputSoloNumeros
                                        type={data.type}
                                        myStyle="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        value={formData[data.name]}
                                        onChange={handleChange}
                                    />
                                ) : camposSoloLetras.includes(data.name) ? (
                                    <InputSoloLetras
                                        type={data.type}
                                        myStyle="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        value={formData[data.name]}
                                        onChange={handleChange}
                                    />
                                ) : camposValidadosConEspacios.includes(data.name) ? (
                                    <InputSoloLetrasYEspacio
                                        type={data.type}
                                        myStyle="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        value={formData[data.name]}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        type={data.type}
                                        className="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        value={formData[data.name]}
                                        onChange={handleChange}
                                    />
                                )}

                                {data.helperText && (
                                    <p className="contenidoInputs">{data.helperText}</p>
                                )}
                            </div>
                        ))}

                    <div className="contenedor-pago">
                        <BotonPago
                            origen="usuario"
                            onPagoRealizado={(estado) => setPagoRealizado(estado)}
                        />
                    </div>

                    <button type="submit" id="guardar-btn" className="guardar-btn">
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
}
