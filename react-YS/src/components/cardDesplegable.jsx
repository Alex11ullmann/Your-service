
export default function CardDesplegable () {
    return (
        <>
            <button className="boton-desplegable">Localidad</button>
            <div id="filtroLocalidad" className="contenido-desplegable">
                <a href="#" data-localidad="Todos">Todos</a>
                        <a href="#" data-localidad="Olavarria">Olavarria</a>
                        <a href="#" data-localidad="Tandil">Tandil</a>
                        <a href="#" data-localidad="Azul">Azul</a>
            </div>
        </>
    )
}