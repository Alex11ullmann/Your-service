import CardCapacitate from "../components/CardCapacitate/CardCapacitate.jsx"
import CardTrabajadores from "../components/CardCapacitate/CardTrabajadores.jsx"

import "../components/CardCapacitate/styleCapacitate.css"
import "../components/QuienesSomos/styleQuienesSomos.css"
import { InfoParaCardCapacitate } from "../components/CardCapacitate/InfoParaCardCapacitate.jsx"
import { InfoParaCardTrabajadores } from "../components/CardCapacitate/InfoParaCardTrabajadores.jsx"

export default function Capacitate () {
    return (
        <div>
            <div className="cuerpoQS">
                {InfoParaCardCapacitate.map ((data, index) => (
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
            <div className="containerCardOfi">
                {InfoParaCardTrabajadores.map ((data, index) => (
                    <CardTrabajadores 
                        key= {data.id ?? data.nombre ?? index}
                        nombre= {data.nombre}
                        imagen= {data.imagen}
                    />
                ))}
            </div>
        </div>
    )
}
