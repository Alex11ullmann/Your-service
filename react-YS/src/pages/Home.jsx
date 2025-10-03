import '../Css/styleHome.css';
import Fondo from '../Images/fondoalba.png'

export default function Home () {
    return (
        <div>
            <div>
                <img className="fondo" src={Fondo} alt="fondo trabajador" />
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
                    <div className="iconos">
                        <div className="seguridad"></div>
                            <div className="text1">
                                <h2>Seguridad</h2>
                                <p>El mejor respaldo es la propia comunidad.</p>
                            </div>
                            <div className="facilidad"></div>
                            <div className="text1">
                                <h2>Facilidad</h2>
                                <p>El contacto sólo toma 1 Click.</p>
                            </div>
                            <div className="comodidad"></div>
                            <div className="text1">
                                <h2>Comodidad</h2>
                                <p>La web te localiza y facilita el contacto.</p>
                            </div>
                            <div className="inmediatez"></div>
                            <div className="text1">
                                <h2>Inmediatez</h2>
                                <p>Pídelo y recíbelo ahora que lo necesitas.</p>
                            </div>
                            <div className="experiencias"></div>
                            <div className="text1">
                                <h2>Experiencias</h2>
                                <p>Desde tu hogar, ahorra tiempo valioso.</p>
                            </div>
                            <div className="costos"></div>
                            <div className="text1">
                                <h2>Costos</h2>
                                <p>Informes del costo al contactar, se cotiza sin visitar.</p>
                            </div>
                    </div>
                </div> 
                <div className="contenedorIntro">
                    <img className="imgFondo" src="./Imgages/fondo web.png" alt="Imagen Fondo"/>
                    <div className="introduccion">
                        <h1  className="h1intro"> Tu experto a un click </h1>
                        <div className="btn1" > 
                            <a href="Principal.html">Busca tu Profesional </a> 
                        </div>
                        <div  className="explicacion">
                            <div className="pasos">
                                <div className="fase filtro" >
                                    <p className="textito" > Filtas por Necesidad </p>
                                </div>
                                <div className="fase siguiente" >
                                </div>
                                <div className="fase seleccion">
                                    <p className="textito" > Seleccionas el Especialista </p>
                                </div>
                                <div className="fase siguiente" >
                                </div>
                                <div className="fase contactar">
                                    <p className="textito" > Te Contactas al trabajador </p>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="containerOficios">
                    <h2 className="encabezado"> Oficios Ofrecidos, contacta tu experto</h2>
                    <div className="cardOfi">
                        <div className="minicard plomero" >
                            <a className="textito">Plomeria</a>
                        </div>
                        <div className="minicard gasista">
                            <a className="textito">Gasista</a>
                        </div>
                        <div className="minicard herrero">
                            <a className="textito">Herreria</a>
                        </div>
                        <div className="minicard fletero" >
                            <a className="textito">Fletes</a>
                        </div>
                        <div className="minicard  domestic">
                            <a className="textito"> Servicio Domestico </a>
                        </div>
                        <div className="minicard cuidadoadultos">
                            <a className="textito"> Cuidado Adultos</a>
                        </div>
                        <div className="minicard pintor">
                            <a className="textito">Pintura</a>
                        </div>
                        <div className="minicard alarmas">
                            <a className="textito"> Alarmas </a>
                        </div>
                        <div className="minicard cerrajero">
                            <a className="textito"> Cerrrajeria</a>
                        </div>
                        <div className="minicard carpintero">
                            <a className="textito">Carpinteria</a>
                        </div>
                        <div className="minicard jardinero">
                            <a className="textito">Jardineria</a>
                        </div>
                        <div className="minicard albanil">
                            <a className="textito">Albañileria</a>
                        </div>
                        <div className="minicard aireacond">
                            <a className="textito">Aire Acondicionado</a>
                        </div> 
                        <div className="minicard limpalfombras">
                            <a className="textito">Limpieza Alfombras</a>
                        </div>
                        <div className="minicard techista">
                            <a className="textito"> Techista </a>
                        </div>
                        <div className="minicard viajante">
                            <a className="textito"> Transportista </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}