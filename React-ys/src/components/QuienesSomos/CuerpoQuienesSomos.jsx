import "./styleQuienesSomos.css"
import CardCapacitate from "../Capacitate/CardCapacitate.jsx"
import { InfoParaQuienesSomos } from "../QuienesSomos/InfoParaQuienesSomos.jsx"

export default function CuerpoQuienesSomos() {
    return (
        <>
            <div className="cuerpoQS">
                {InfoParaQuienesSomos.map ((data, index) => (
                    <CardCapacitate 
                        key= {data.id ?? data.nombre ?? index}
                        titulo= {data.titulo}
                        texto= {data.texto}
                        texto2= {data.texto2}
                        imagen= {data.imagen}
                        alt= {data.alt}
                        invertido= {data.invertido}
                    />
                ))}
            </div>
        </>
    )
}
