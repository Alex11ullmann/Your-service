import "../Css/styleCapacitate.css"
import Escuela from "../Images/Escuela.jfif"
import Herrero from "../Images/Herrero.jfif"
import Carpintera from "../Images/Carpintera.jfif"
import Albanil from "../Images/Albanil.jfif"


export default function CardCapacitate () {
    return (
        <div className="cuerpo">
            <div className="subCont1">
                <div className="contTexto">
                    <img className="contTexto" src={Escuela} alt="Escuela oficios" />
                </div>
                <div className="contTexto">
                    <h4>
                        Programa Aprender Oficio
                    </h4>
                    <p>
                        El programa <strong>Aprender Oficio</strong> tiene como objetivo principal brindar oportunidades de formación y 
                        perfeccionamiento en distintos oficios a profesionales y trabajadores de diferentes rubros. Esta propuesta busca 
                        que cada participante pueda fortalecer sus competencias, adquirir nuevas habilidades técnicas y acceder a trayectos 
                        de formación profesional certificados.
                    </p>
                    <p>
                        La iniciativa no solo apunta a mejorar la calidad de los servicios que ofrecen los trabajadores, sino también a 
                        ampliar la variedad de propuestas disponibles en el mercado laboral. Al promover la capacitación continua, 
                        se fomenta el crecimiento personal y profesional, favoreciendo la inserción laboral, la mejora de los emprendimientos 
                        independientes y la generación de empleo calificado en las comunidades.
                    </p>
                </div>
            </div>
            <div className="subCont1">
                <div className="contTexto">
                    <h4>
                        Aprendiendo con otros
                    </h4>
                    <p>
                        La estructura general del programa propone dos métodos de formación complementarios. El primero es de carácter institucional, 
                        y consiste en acercar las ofertas educativas disponibles en la zona de la ciudad donde se encuentre cada participante, 
                        facilitando así el acceso a espacios formales de aprendizaje.
                    </p>
                    <p>
                        El segundo método es de tipo no institucional, orientado a jóvenes que no tienen la posibilidad de asistir a instituciones educativas. 
                        En este caso, se promueve el contacto con profesionales del oficio, para que puedan realizar trabajos de ayudantía remunerada, 
                        aprendiendo a través de la experiencia laboral colaborativa. Este enfoque busca fortalecer el aprendizaje práctico, la inclusión y 
                        la construcción de redes de apoyo entre trabajadores y aprendices.
                    </p>
                </div>
                <div className="contTexto">
                    <img className="contTexto" src={Herrero} alt="Herrero" />
                </div>       
            </div>
            <div className="subCont1">
                <div className="contTexto">
                    <img className="contTexto" src={Carpintera} alt="Carpintera" />
                </div> 
                <div className="contTexto">
                    <h4>
                        Que Proponemos
                    </h4>
                    <p>
                        El formato del programa contempla tanto instancias teóricas como prácticas, permitiendo que los participantes no solo 
                        incorporen conocimientos técnicos y conceptuales, sino que también los apliquen en contextos reales o simulados. 
                        Esta metodología integral facilita una comprensión profunda del oficio, fortalece la experiencia práctica y mejora la 
                        preparación para situaciones del mundo laboral.
                    </p>
                </div>                                  
            </div>
            <div className="subCont1">
                <div className="contTexto">
                    <h4>
                        Formacion Reglada 
                    </h4>
                    <p>
                        El programa se articula con instituciones educativas, 
                        centros de formación profesional, organizaciones sociales y referentes del sector productivo, lo que permite adaptar los contenidos 
                        a las demandas actuales del mercado y garantizar una capacitación actualizada, pertinente y alineada con las necesidades del entorno laboral. 
                        Esta vinculación estratégica también favorece la empleabilidad y abre nuevas oportunidades de inserción o mejora laboral para quienes completan 
                        el trayecto formativo.
                    </p>
                </div>
                <div className="contTexto">
                    <img className="contTexto" src={Albanil} alt="Albanil" />
                </div>       
            </div>
        </div>
    )
}