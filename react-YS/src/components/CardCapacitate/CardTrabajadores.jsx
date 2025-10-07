import "../CardCapacitate/styleCapacitate.css"

export default function CardTrabajadores ( {nombre, imagen} ) {
    return (
        <div className="cardOfi">
            <div className="minicard" >
                <img className="contTexto" src={imagen} alt={nombre} />
                <a className="textito">{nombre}</a>
            </div>
        </div>
    )
}