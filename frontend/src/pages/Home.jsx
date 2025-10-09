import CardparaHome from '../components/CardHome/CardparaHome.jsx';
import '../components/CardHome/styleHome.css'
import Fondo from '../Images/fondoalba.png'
import Seguridad from '../Images/seguridad.png'
import Facilidad from '../Images/facilidad.png'
import Comodidad from '../Images/comodidad.png'
import Inmediatez from '../Images/inmediatez.png'
import Experiencia from '../Images/experiencias.png'
import Costos from '../Images/costos.png'
import FondoWeb from '../Images/fondoweb.png'
import Filtro from '../Images/filtro.jfif'
import Siguiente from '../Images/siguiente.png'
import Seleccion from '../Images/seleccion.jfif'
import Contactar from '../Images/contactar.jpg'
import CardTrabajadores from '../components/CardCapacitate/CardTrabajadores.jsx'
import Plomero from '../Images/Plomero.jfif'
import Gasista from '../Images/Gasista.jfif'
import Herreria from '../Images/Herrero.jfif'
import Fletero from '../Images/Fletero.jfif'
import Domestico from '../Images/Domestico.jfif'
import CuidadoAdultos from '../Images/CuidadoAdultos.jfif'
import Pintor from '../Images/Pintor.jfif'
import Alarmas from '../Images/Alarmas.jfif'
import Cerrajero from '../Images/Cerrajero.jfif'
import Carpintera from '../Images/Carpintera.jfif'
import Jardineria from '../Images/Jardinero.jfif'
import Albanil from '../Images/Albanil.jfif'
import Aire from '../Images/Aire.jfif'
import Alfombras from '../Images/Alfombras.jfif'
import Techista from '../Images/Techista.jfif'
import Transportista from '../Images/Transportista.jfif'
import Header from '../components/FooterYHeader/Header.jsx'
import Footer from '../components/FooterYHeader/Footer.jsx'

export default function Home () {
    return (
        <div>
            <Header />
            <div className="encabezado"></div>
            <div>
                <img className="fondo" src={Fondo} alt="fondo de un trabajador" />
            </div>
            <div className="cuerpo">
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
                    <div >
                        <div className="iconos">
                            <CardparaHome 
                                textoNuevo= "El mejor respaldo es la propia comunidad."
                                nombre= "Seguridad"
                                imagen= {Seguridad}
                            />
                            <CardparaHome 
                                textoNuevo= "El contacto sólo toma 1 Click."
                                nombre= "Facilidad"
                                imagen= {Facilidad}
                            />
                            </div>
                        <div className="iconos">
                            <CardparaHome 
                                textoNuevo= "La web te localiza y facilita el contacto."
                                nombre= "Comodidad"
                                imagen= {Comodidad}
                            />
                            <CardparaHome 
                                textoNuevo= "Pídelo y recíbelo ahora que lo necesitas."
                                nombre= "Inmediatez"
                                imagen= {Inmediatez}
                            />
                            </div>
                        <div className="iconos">
                            <CardparaHome 
                                textoNuevo= "Desde tu hogar, ahorra tiempo valioso."
                                nombre= "Experiencia"
                                imagen= {Experiencia}
                            />
                            <CardparaHome 
                                textoNuevo= "Informes del costo al contactar, se cotiza sin visitar."
                                nombre= "Costos"
                                imagen= {Costos}
                            />
                            </div>
                    </div>
                </div> 
                <div className="contenedorIntro">
                    <img className="imgFondo" src={FondoWeb} alt="Imagen Fondo"/>
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
                        <CardTrabajadores 
                            nombre= "Plomeria"
                            imagen= {Plomero}
                        />
                        <CardTrabajadores 
                            nombre= "Gasista"
                            imagen= {Gasista}
                        />
                        <CardTrabajadores 
                            nombre= "Herreria"
                            imagen= {Herreria}
                        />
                        <CardTrabajadores 
                            nombre= "Fletes"
                            imagen= {Fletero}
                        />
                        <CardTrabajadores 
                            nombre= "Servicio Domestico"
                            imagen= {Domestico}
                        />
                        <CardTrabajadores 
                            nombre= "Cuidado Adultos"
                            imagen= {CuidadoAdultos}
                        />
                        <CardTrabajadores 
                            nombre= "Pintura"
                            imagen= {Pintor}
                        />
                        <CardTrabajadores 
                            nombre= "Alarmas"
                            imagen= {Alarmas}
                        />
                        <CardTrabajadores 
                            nombre= "Cerrajeria"
                            imagen= {Cerrajero}
                        />
                        <CardTrabajadores 
                            nombre= "Carpinteria"
                            imagen= {Carpintera}
                        />
                        <CardTrabajadores 
                            nombre= "Jardinero"
                            imagen= {Jardineria}
                        />
                        <CardTrabajadores 
                            nombre= "Albañileria"
                            imagen= {Albanil}
                        />
                        <CardTrabajadores 
                            nombre= "Aire Acondicionado"
                            imagen= {Aire}
                        />
                        <CardTrabajadores 
                            nombre= "Limpieza Alfombras"
                            imagen= {Alfombras}
                        />
                        <CardTrabajadores 
                            nombre= "Techista"
                            imagen= {Techista}
                        />
                        <CardTrabajadores 
                            nombre= "Transportista"
                            imagen= {Transportista}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}