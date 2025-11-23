import CardCapacitate from "./CardCapacitate.jsx"
import CardTrabajadores from "./CardTrabajadores.jsx"

import "./styleCapacitate.css"
import "../QuienesSomos/styleQuienesSomos.css"
import { InfoParaCardCapacitate } from "./InfoParaCardCapacitate.jsx"
import { InfoParaCardTrabajadores } from "./InfoParaCardTrabajadores.jsx"

export default function CuerpoCapacitate () {
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
