import '../CardHome/styleHome.css'


export default function CardparaHome ({ textoNuevo, nombre, imagen }) {
    return (
        <>
            <div className="iconosImg">
                <img className="contTexto" src={imagen} alt={nombre} />
            </div>
            <div className="text1">
                <h2> {nombre} </h2>
                <p> {textoNuevo} </p>    
            </div>
        </>
    )
}