import "../Buscar/styleBuscar.css"

import { ciudades, oficios, estrellas, dias, horarios } from "../Buscar/CardsInfoBuscar.jsx"

export default function CuerpoBuscar() {
    return (
        <>
            <div className="contenedor-desplegables">
                <div className="desplegable">
                    <button className="boton-desplegable">Localidad</button>
                    <div id="filtroLocalidad" className="contenido-desplegable">
                        {ciudades.map((card) => (
                            <a href="#" data-localidad={card.ciudad}>{card.ciudad}</a>
                        ))}
                    </div>
                </div>
                <div className="desplegable">
                    <button className="boton-desplegable">Lista de Oficios</button>
                    <div id="filtroOficio" className="contenido-desplegable">
                        {oficios.map((card) => (
                            <a href="#" data-oficio={card.oficio}>{card.oficio}</a>
                        ))}
                    </div>
                </div>
                <div className="desplegable">
                    <button className="boton-desplegable">Calificación minima</button>
                    <div id="filtroCalificacion" className="contenido-desplegable">
                        {estrellas.map((card) => (
                            <a href="#" data-oficio={card.estrella}>{card.estrella}</a>
                        ))}
                    </div>
                </div>

                <div className="desplegable">
                    <button className="boton-desplegable">Días Disponibles</button>
                    <div id="filtroDias" className="contenido-desplegable">
                        {dias.map((card) => (
                            <a href="#" data-oficio={card.dia}>{card.dia}</a>
                        ))}
                    </div>
                </div>

                <div className="desplegable">
                    <button className="boton-desplegable">Horarios Disponibles</button>
                    <div className="contenido-desplegable">
                        {horarios.map((card) => (
                            <a href="#" data-oficio={card.hora}>{card.hora}</a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="cuerpoCatalogo">
                <ul id="lista" className="lista" ></ul>
                <ul id="lista"></ul>
            </div>
        </>
    )
}