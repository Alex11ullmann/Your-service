import './stylesPerfiles.css'
import Aire from "../../Images/Aire.jfif"
export default function CuerpoPerfiles({esTrabajador}) {
    return (
        <div className="cuerpo">
            <div className="contenido">
                <div className="info-imgPerfil">
                    <div className="foto-perfil"></div>
                    <div id="divbtnagregarimg">
                        <input type="file" id="btnagregarimg" accept="image/*" multiple hidden />
                        <label htmlFor="btnagregarimg" className="btnFotoPerfil" required>Seleccionar Imagen de Perfil</label>
                    </div>
                </div>
                <div className="formularios">
                    <h3>Nombre de Perfil:</h3>
                    <h3></h3>
                    <div className="modificar">
                        <h4>Localidad:</h4>
                        <input type="text" />
                    </div>
                    <div className="modificar">
                        <h4>Direccion:</h4>
                        <input type="text" />
                    </div>
                    <div className="modificar">
                        <h4>Email:</h4>
                        <input type="text" />
                    </div>
                    <div className="modificar">
                        <h4>Telefono:</h4>
                        <input type="text" />
                    </div>
                    <div className="perfil-profesional">
                        <h4>Perfil Profesional:</h4>
                        <textarea
                            id="textareaDescripcion"
                            placeholder="Min 20 caracts - Max 600 caracts"
                            minLength="20"
                            maxLength="600"
                        ></textarea>
                    </div>
                    <div className="opciones">
                        <button id="guardarCambios" style={{ background: "#62a9f5ff" }}>
                            Guardar Cambios
                        </button>
                        <h3>Eliminar mi cuenta</h3>
                        <input
                            id="inputEliminarPass"
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                        <button id="btnEliminarCuenta" style={{ background: "rgba(240, 91, 91, 1)" }}>
                            Eliminar cuenta
                        </button>
                    </div>
                </div>
            </div>
            {esTrabajador && (
                    <div className="contenedorImagenes">
                        <img id="imgcarrusel" src={Aire} alt="Vista previa" />
                    </div>
            )}
        </div>
    );
};