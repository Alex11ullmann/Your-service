import "../components/QuienesSomos/styleQuienesSomos.css"
import CardCapacitate from "../components/CardCapacitate/CardCapacitate.jsx"
import { InfoParaQuienesSomos } from "../components/QuienesSomos/InfoParaQuienesSomos.jsx"

export default function QuienesSomos() {
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
