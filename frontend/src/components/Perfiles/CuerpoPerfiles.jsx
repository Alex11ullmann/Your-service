import '../Perfiles/stylesPerfiles.css'

export default function CuerpoPerfiles(esTrabajador) {
    return (
        <div className="perfil-container">
            <div className="perfil-header">
                <div className="info-imgPerfil">
                    <div id="fotoPerfil" className="foto-perfil"></div>
                    <span className="lapiz"></span>
                </div>
                <div className="info-perfil">
                    <h3></h3>
                    <h3></h3>
                    <div className="modificar">
                        <h4>Localidad:</h4>
                        <div className="inputt">
                            <span className="lapiz1"></span>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="modificar">
                        <h4>Direccion:</h4>
                        <div className="inputt">
                            <span className="lapiz1"></span>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="modificar">
                        <h4>Email:</h4>
                        <div className="inputt">
                            <span className="lapiz1"></span>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="modificar">
                        <h4>Telefono:</h4>
                        <div className="inputt">
                            <span className="lapiz1"></span>
                            <input type="text" />
                        </div>
                    </div>
                    <button className="botonModyElim" id="guardarCambios">
                        Guardar Cambios
                    </button>
                    <div className="modificar">
                        <h3>Eliminar mi cuenta</h3>
                        <div className="inputtElim">
                            <input
                                type="password"
                                id="inputEliminarPass"
                                placeholder="Ingrese su contraseña"
                            />
                            <button className="botonModyElim" id="btnEliminarCuenta">
                                🗑️ Eliminar cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {esTrabajador && (
                <>
                    <div className="perfil-container1">
                        <div className="subDiv">
                            <div className="imagenes" id="contenedor"></div>
                        </div>
                    </div>
                    <div className="perfil-container1">
                        <div className="subDiv">
                            <div className="reproductor">
                                <h3>Video</h3>
                                <div className="video" id="contenedorVideo"></div>
                                <input className="inputt" placeholder="Ingrese nueva URL" />
                                <button className="botonModyElim" id="nuevaUrl">
                                    Guardar URL
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="perfil-container1">
                        <div className="descripcion">
                            <h3>Perfil Profesional</h3>
                            <textarea
                                id="textareaDescripcion"
                                placeholder="Min 20 caracts - Max 600 caracts"
                                minLength="20"
                                maxLength="600"
                            ></textarea>
                            <h4>Referencias</h4>
                            <input
                                type="text"
                                id="inputReferencia"
                                placeholder="Referencias de trabajos anteriores"
                            />
                            <button className="botonModyElim" id="btnGuardarDescripcion">
                                Guardar Descripción
                            </button>
                        </div>
                    </div>
                    <div className="perfil-container1">
                        <div className="info">
                            <div className="columna">
                                <div>
                                    <a>Certificado de trabajo en altura: </a>
                                    <input type="checkbox" id="checkbox1" />
                                    <label htmlFor="checkbox1">No / Sí</label>
                                </div>
                                <div>
                                    <a>Trabaja solo: </a>
                                    <input type="checkbox" id="checkbox2" />
                                    <label htmlFor="checkbox2">No / Sí</label>
                                </div>
                                <div>
                                    <a>Servicio 24hs: </a>
                                    <input type="checkbox" id="checkbox4" />
                                    <label htmlFor="checkbox4">No / Sí</label>
                                </div>
                            </div>

                            <div className="columna">
                                <div>
                                    <a>Trabaja fines de semana: </a>
                                    <input type="checkbox" id="checkbox5" />
                                    <label htmlFor="checkbox5">No / Sí</label>
                                </div>
                                <div>
                                    <a>Trabaja feriados: </a>
                                    <input type="checkbox" id="checkbox6" />
                                    <label htmlFor="checkbox6">No / Sí</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};