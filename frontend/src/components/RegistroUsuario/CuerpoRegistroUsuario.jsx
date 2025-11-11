import "./styleRegistroUsuario.css";
import { infoParaRegistro } from "./InfoParaRegistro.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InputValidado from "../Validaciones/ValidarCaracteres";
import InputSoloNumeros from "../Validaciones/ValidarSoloNumeros";
import InputSoloLetras from "../Validaciones/ValidarSoloLetras";
import InputSoloLetrasYEspacio from "../Validaciones/ValidarSoloLetrasYEspacios";

export default function CuerpoRegistroUsuario() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    // Cargar datos previos del localStorage al montar el componente
    useEffect(() => {
        const datosGuardados = localStorage.getItem("datosRegistro");
        if (datosGuardados) {
            setFormData(JSON.parse(datosGuardados));
        }
    }, []);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Guardar los datos en localStorage y redirigir al perfil
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(
            "datosRegistro",
            JSON.stringify({ formData: formData })
        );
        localStorage.setItem("tipoUsuario", "usuario");
        localStorage.setItem("usuarioOn", "true"); // Guardar sesión activa
        window.dispatchEvent(new Event("storage")); // Fuerza actualización del Header
        navigate("/perfil", { state: { esTrabajador: false } });
    };

    const camposConValidacion = ["Usuario", "Password", "PepPassword", "Direccion"];
    const camposValidadosConEspacios = ["Nombres y Apellidos"];
    const camposSoloLetras = ["Localidad"];
    const camposSoloNumeros = ["Telefono", "Dni"];

    return (
        <div className="cuerpoRegistro">
            <div className="logRegistro-container">
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    {infoParaRegistro
                        .filter((data) => data.name !== "Oficios")
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
                                        maxLength={data.maxLength}
                                        minLength={data.minLength}
                                        required={data.required}
                                        value={formData[data.name] || ""}
                                        onChange={handleChange}
                                    />
                                ) : camposSoloNumeros.includes(data.name) ? (
                                    <InputSoloNumeros
                                        type={data.type}
                                        myStyle="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        maxLength={data.maxLength}
                                        minLength={data.minLength}
                                        required={data.required}
                                        value={formData[data.name] || ""}
                                        onChange={handleChange}
                                    />
                                ) : camposSoloLetras.includes(data.name) ? (
                                    <InputSoloLetras
                                        type={data.type}
                                        myStyle="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        maxLength={data.maxLength}
                                        minLength={data.minLength}
                                        required={data.required}
                                        value={formData[data.name] || ""}
                                        onChange={handleChange}
                                    />
                                ) : camposValidadosConEspacios.includes(data.name) ? (
                                    <InputSoloLetrasYEspacio
                                        type={data.type}
                                        myStyle="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        maxLength={data.maxLength}
                                        minLength={data.minLength}
                                        required={data.required}
                                        value={formData[data.name] || ""}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        type={data.type}
                                        className="datos"
                                        id={data.id}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        maxLength={data.maxLength}
                                        minLength={data.minLength}
                                        required={data.required}
                                        value={formData[data.name] || ""}
                                        onChange={handleChange}
                                    />
                                )}
                                {data.helperText && (
                                    <p className="contenidoInputs">{data.helperText}</p>
                                )}
                            </div>
                        ))}
                    <button type="submit" id="guardar-btn" className="guardar-btn">
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
}
