import {cardsIconosHome} from "../CardsHome/InfoParaCardHome.jsx"
import CardparaHome from './CardParaHome.jsx';
import { cardsTrabHome } from "../CardsHome/InfoParaCardTrabajadores.jsx"
import CardTrabajadores from '../CardCapacitate/CardTrabajadores.jsx'

import '../CardsHome/styleHome.css'

import Fondo from '../../Images/fondoalba.png'
import FondoWeb from "../../Images/fondoweb.png"
import Filtro from '../../Images/filtro.jfif'
import Siguiente from '../../Images/siguiente.png'
import Seleccion from '../../Images/seleccion.jfif'
import Contactar from '../../Images/contactar.jpg'



export const CuerpoParaHome = ()=> {
    return (
        <>
            <div>
                <img className="fondo" src={Fondo} alt="fondo de un trabajador" />
            </div>
            <div className="contador">
                <div className="contador1">
                    <div className="contadorexpertos">
                        <p>00</p>
                        <h2>Expertos</h2>
                    </div>
                    <div className="contadorexpertos">
                        <p>00</p>
                        <h2>Clientes</h2>
                    </div>
                    <div className="contadorusuarios">
                        <p>00</p>
                        <h2>Solicitudes</h2>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="elporque">
                    <h1>¿Por qué Your Service?</h1>
                    <p>Hay que impulsar el trabajo local,</p>
                    <p>hay que dar oportunidades a nuevas caras,</p>
                    <p>hay que hacer las cosas diferentes,</p>
                    <p>hay que hacer ese proyecto pendiente.</p>
                </div>
                <div>
                    {cardsIconosHome.map((card) => (
                        <div className="iconos">
                            <CardparaHome
                                textoNuevo={card.textoNuevo}
                                nombre={card.nombre}
                                imagen={card.imagen}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="contenedorIntro">
                <img className="imgFondo" src={FondoWeb} alt="Imagen Fondo" />
                <div className="introduccion">
                    <h1 className="h1intro"> Tu experto a un click </h1>
                    <div className="buscarProf" >
                        <a>Busca tu Profesional </a>
                    </div>
                    <div className="explicacion">
                        <div className="pasos">
                            <div className="filtro">
                                <img className="filtro" src={Filtro} alt="imagen de filtro" />
                                <p className="textito"> Filtras por Necesidad </p>
                            </div>
                            <img className="siguiente" src={Siguiente} alt="imagen de flecha" />
                            <div className="filtro">
                                <img className="filtro" src={Seleccion} alt="imagen de seleccion" />
                                <p className="textito"> Seleccionas el Especialista </p>
                            </div>
                            <img className="siguiente" src={Siguiente} alt="imagen de flecha" />
                            <div className="filtro">
                                <img className="filtro" src={Contactar} alt="imagen de contacto" />
                                <p className="textito"> Te Contactas al trabajador </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="containerOficios">
                <h2 className="encabezado"> Oficios Ofrecidos, contacta tu experto</h2>
                <div className="containerCardOfi">
                    {cardsTrabHome.map((card) => (
                        <CardTrabajadores
                            nombre= {card.nombre}
                            imagen= {card.imagen}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}