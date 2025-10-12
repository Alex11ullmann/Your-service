import CardCapacitate from "../components/CardCapacitate/CardCapacitate.jsx"
import CardTrabajadores from "../components/CardCapacitate/CardTrabajadores.jsx"
import Escuela from "../Images/Escuela.jfif"
import Herrero from "../Images/Herrero.jfif"
import Carpintera from "../Images/Carpintera.jfif"
import Albanil from "../Images/Albanil.jfif"
import Plomero from "../Images/Plomero.jfif"
import Gasista from "../Images/Gasista.jfif"
import Pintor from "../Images/Pintor.jfif"
import Cerrajero from "../Images/Cerrajero.jfif"
import Aire from "../Images/Aire.jfif"
import "../components/CardCapacitate/styleCapacitate.css"
import "../components/QuienesSomos/styleQuienesSomos.css"
import Header from '../components/FooterYHeader/Header.jsx'
import Footer from '../components/FooterYHeader/Footer.jsx'

export default function Capacitate () {
    return (
        <div>
            <Header />
            <div className="cuerpoQS">
                <CardCapacitate 
                    titulo="Programa Aprender Oficio"
                    texto="El programa <strong>Aprender Oficio</strong> tiene como objetivo principal brindar oportunidades de formación y 
                                perfeccionamiento en distintos oficios a profesionales y trabajadores de diferentes rubros. Esta propuesta busca 
                                que cada participante pueda fortalecer sus competencias, adquirir nuevas habilidades técnicas y acceder a trayectos 
                                de formación profesional certificados."
                    texto2="La iniciativa no solo apunta a mejorar la calidad de los servicios que ofrecen los trabajadores, sino también a 
                                ampliar la variedad de propuestas disponibles en el mercado laboral. Al promover la capacitación continua, 
                                se fomenta el crecimiento personal y profesional, favoreciendo la inserción laboral, la mejora de los emprendimientos 
                                independientes y la generación de empleo calificado en las comunidades."
                    imagen={Escuela}
                    alt="Escuela"
                    invertido={false}
                />
                <CardCapacitate 
                    titulo="Aprendiendo con otros"
                    texto="La estructura general del programa propone dos métodos de formación complementarios. El primero es de carácter institucional, 
                                y consiste en acercar las ofertas educativas disponibles en la zona de la ciudad donde se encuentre cada participante, 
                                facilitando así el acceso a espacios formales de aprendizaje."
                    texto2="El segundo método es de tipo no institucional, orientado a jóvenes que no tienen la posibilidad de asistir a instituciones educativas. 
                                En este caso, se promueve el contacto con profesionales del oficio, para que puedan realizar trabajos de ayudantía remunerada, 
                                aprendiendo a través de la experiencia laboral colaborativa. Este enfoque busca fortalecer el aprendizaje práctico, la inclusión y 
                                la construcción de redes de apoyo entre trabajadores y aprendices."
                    imagen={Herrero}
                    alt="Herrero"
                    invertido={true}
                />
                <CardCapacitate 
                    titulo="Que Proponemos?"
                    texto="El formato del programa contempla tanto instancias teóricas como prácticas, permitiendo que los participantes no solo 
                                incorporen conocimientos técnicos y conceptuales, sino que también los apliquen en contextos reales o simulados. 
                                Esta metodología integral facilita una comprensión profunda del oficio, fortalece la experiencia práctica y mejora la 
                                preparación para situaciones del mundo laboral."
                    texto2=" "
                    imagen={Carpintera}
                    alt="Carpintera"
                    invertido={false}
                />
                <CardCapacitate 
                    titulo="Formacion Reglada"
                    texto="El programa se articula con instituciones educativas, 
                                centros de formación profesional, organizaciones sociales y referentes del sector productivo, lo que permite adaptar los contenidos 
                                a las demandas actuales del mercado y garantizar una capacitación actualizada, pertinente y alineada con las necesidades del entorno laboral. 
                                Esta vinculación estratégica también favorece la empleabilidad y abre nuevas oportunidades de inserción o mejora laboral para quienes completan 
                                el trayecto formativo."
                    texto2=" "
                    imagen={Albanil}
                    alt="Albanil"
                    invertido={true}
                />
            </div>
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
                    imagen= {Herrero}
                />
                <CardTrabajadores 
                    nombre= "Pintura"
                    imagen= {Pintor}
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
                    nombre= "Albanileria"
                    imagen= {Albanil}
                />
                <CardTrabajadores 
                    nombre= "Aire Acondicionado"
                    imagen= {Aire}
                />
            </div>
            <Footer />
        </div>
    )
}
