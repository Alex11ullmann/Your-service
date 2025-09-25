import "../Css/styleCapacitate.css"
import Plomero from "../Images/Plomero.jfif"
import Gasista from "../Images/Gasista.jfif"
import Herrero from "../Images/Herrero.jfif"
import Pintor from "../Images/Pintor.jfif"
import Cerrajero from "../Images/Cerrajero.jfif"
import Carpintera from "../Images/Carpintera.jfif"
import Albanil from "../Images/Albanil.jfif"
import Aire from "../Images/Aire.jfif"

export default function CardTrabajadores () {
    return (
        <div className="cardOfi">
            <div className="minicard" >
                <img className="contTexto" src={Plomero} alt="Plomero" />
                <a className="textito">Plomeria</a>
            </div>
            <div className="minicard gasista">
                <img className="contTexto" src={Gasista} alt="Gasista" />
                <a className="textito">Gasista</a>
            </div>
            <div className="minicard herrero">
                <img className="contTexto" src={Herrero} alt="Herrero" />
                <a className="textito">Herreria</a>
            </div>
            <div className="minicard pintor">
                <img className="contTexto" src={Pintor} alt="Pintor" />
                <a className="textito">Pintura</a>
            </div>
            <div className="minicard cerrajero">
                <img className="contTexto" src={Cerrajero} alt="Cerrajero" />
                <a className="textito"> Cerrrajeria</a>
            </div>
            <div className="minicard carpintero">
                <img className="contTexto" src={Carpintera} alt="Carpintera" />
                <a className="textito">Carpinteria</a>
            </div>
            <div className="minicard albanil">
                <img className="contTexto" src={Albanil} alt="Albanil" />
                <a className="textito">Albañileria</a>
            </div>
            <div className="minicard aireacond">
                <img className="contTexto" src={Aire} alt="Aire" />
                <a className="textito">Aire Acondicionado</a>   
            </div> 
        </div>
    )
}