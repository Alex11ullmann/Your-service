import "../Buscar/styleBuscar.css"

import { ciudades, oficios, estrellas, dias, horarios} from "../Buscar/CardsInfoBuscar.jsx"
import CardsBuscar from "./CardBuscar.jsx"

export default function CuerpoBuscar() {
    return (
        <div>
            <div className="contenedor-desplegables">

                <CardsBuscar 
                    titulo="Localidad" 
                    data={ciudades} 
                    dataKey="ciudad" 
                    dataAttr="data-localidad" 
                />
                <CardsBuscar 
                    titulo="Lista de Oficios" 
                    data={oficios} 
                    dataKey="oficio" 
                    dataAttr="data-oficio" 
                />
                <CardsBuscar 
                    titulo="Calificación mínima" 
                    data={estrellas} 
                    dataKey="estrella" 
                    dataAttr="data-estrella" 
                />
                <CardsBuscar 
                    titulo="Días disponibles" 
                    data={dias} 
                    dataKey="dia" 
                    dataAttr="data-dia" 
                />
                <CardsBuscar 
                    titulo="Horarios disponibles" 
                    data={horarios} 
                    dataKey="hora" 
                    dataAttr="data-hora" 
                />
            </div>
            <div className="cuerpoCatalogo">
                <ul id="lista" className="lista" ></ul>
                <ul id="lista"></ul>
            </div>
        </div>
    )
}