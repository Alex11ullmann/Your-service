import "./styleRegistroUsuario.css"
import { infoParaRegistro } from "./InfoParaLogin.jsx"

export default function CuerpoRegistroUsuario() {
    return (
        <>
            <div className="cuerpoRegistro">
                <div className="logRegistro-container">
                    <h2>Registrarse</h2>
                    <form>
                        {infoParaRegistro.map((data) => (
                            <div className="input-group" key={data.id}>
                                <label htmlFor={data.id}>{data.label}</label>
                                <input
                                    type={data.type}
                                    className="datos"
                                    id={data.id}
                                    name={data.name}
                                    placeholder={data.placeholder}
                                    maxLength={data.maxLength}
                                    minLength={data.minLength}
                                    required={data.required}
                                />
                                {data.helperText && <p className="contenidoInputs">{data.helperText}</p>}
                            </div>
                        ))}
                        <div className="divcheck">
                            <h4>Si desea crear un perfil de trabajador presione en el ✔ y luego en el boton Guardar</h4>
                        </div>
                        <div className="divcheck">
                            <button
                                id="tilde-trabajador"
                                className="tilde-btn"
                                type="button"
                                onClick={(e) => e.currentTarget.classList.toggle('checked')}
                            >✔</button>
                        </div>
                        <button type="submit" id="guardar-btn" className="guardar-btn">Guardar</button>
                    </form>
                </div>
            </div>
        </>
    )
}