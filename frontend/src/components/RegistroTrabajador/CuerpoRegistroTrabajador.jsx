import "./styleRegistroTrabajador.css"

import SinFoto from "../../Images/Photograph.jpg"

export default function CuerpoRegistroTrabajador() {
    return (
        <>
            <div className="tarjeta">
                <div className="linea">
                    <h1>Bienvenido a la seccion donde podra crear su perfil de trabajador, por favor complete las siguientes secciones...</h1>
                    <div id="imagen"></div>
                    <div>
                        <h4>Seleccione imagenes de sus trabajos y/o de si mismo</h4>
                    </div>
                </div>
                <div className="primeraparte">
                    <div className="divcarrusel">
                        <div className="carrusel" id="contenedorCarrusel">
                            <img id="imgcarrusel" src="" alt="Vista previa" />
                        </div>
                        <div id="divbtnagregarimg">
                            <input type="file" id="btnagregarimg" accept="image/*" multiple hidden />
                            <label for="btnagregarimg" className="btnagregareliminarimg" required>Subir Imagen</label>
                            <button id="btneliminarimg" className="btnagregareliminarimg">Eliminar Imagen</button>
                        </div>
                    </div>
                    <div className="trabajador">
                        <img id="imagenTrabajador" className="imagentrab" src={SinFoto} alt="fondo sin imagen" />
                    </div>
                </div>
                <div className="descripcion">
                    <h3>Perfil Profesional</h3>
                    <a>Escriba aqui lo que quiera hacer saber a los demas sobre usted mismo. Experiencias, antiguedad, etc.</a>
                    <textarea name="texto" id="textareaqs" placeholder="Min 20 caracts - Max 600 caracts" minlength="20" maxlength="600"></textarea>
                </div>
                <div className="botonguardardatos">
                    <input type="button" value="Guardar" id="botonguardar" />
                </div>
            </div>
        </>
    )
}