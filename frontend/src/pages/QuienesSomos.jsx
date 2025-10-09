import "../components/QuienesSomos/styleQuienesSomos.css"
import CardCapacitate from "../components/CardCapacitate/CardCapacitate.jsx"
import conexiones from "../Images/conexiones.jfif"
import quienesSomos from "../Images/quienesSomos.jfif"
import Objetivos from "../Images/Objetivo.png"
import calificacion from "../Images/calificacion.jfif"
import Header from '../components/FooterYHeader/Header.jsx'
import Footer from '../components/FooterYHeader/Footer.jsx'

export default function QuienesSomos() {
    return (
        <>
            <Header />
            <div className="cuerpoQS">
                <CardCapacitate
                    titulo="¿Qué es?"
                    texto="Your Service es una web diseñada para conectar a profesionales de diversos oficios con clientes que requieren sus servicios de manera rápida y eficiente. "
                    texto2="Nuestra misión es simplificar la búsqueda de talento especializado, brindando un espacio donde trabajadores y clientes puedan interactuar de forma segura, transparente y confiable.
                                    A través de nuestra Web, los usuarios pueden acceder a perfiles detallados, verificar referencias, comparar opciones y contratar el servicio que mejor se adapte a sus necesidades, optimizando así el proceso de contratación."
                    imagen={conexiones}
                    alt="conexiones"
                    invertido={true}
                />
                <CardCapacitate
                    titulo="¿Quiénes Somos?"
                    texto="Somos un equipo de desarrolladores y programadores web comprometidos con la creación de soluciones tecnológicas innovadoras que faciliten la conexión entre personas."
                    texto2="Nos destacamos por nuestra seriedad, profesionalismo y visión a futuro, ofreciendo herramientas accesibles y eficientes para mejorar la experiencia de nuestros usuarios y potenciar nuevas oportunidades en el mercado digital."
                    imagen={quienesSomos}
                    alt="imagen quienesSomos"
                    invertido={false}
                />
                <CardCapacitate
                    titulo="Objetivo de la Plataforma"
                    texto="El principal objetivo de <strong>Your Service</strong> es proporcionar una solución eficiente que facilite el encuentro entre trabajadores y clientes de manera rápida y directa. "
                    texto2="A través de nuestra plataforma, buscamos generar nuevas oportunidades laborales y mejorar el acceso a servicios especializados, creando un entorno confiable y accesible para todos."
                    imagen={Objetivos}
                    alt="Objetivos"
                    invertido={true}
                />
                <CardCapacitate
                    titulo="Sistema de Calificaciones"
                    texto="Nuestro sistema de calificaciones permite a los clientes evaluar a los trabajadores en diversos aspectos clave, como cumplimiento del tiempo acordado, orden y limpieza, tarifa adecuada, calidad del trabajo, cordialidad y respeto."
                    texto2="Del mismo modo, los trabajadores pueden puntuar a los clientes en relación con el plazo de pago, cumplimiento del horario de trabajo acordado, cordialidad y respeto.
                                    Este sistema garantiza una experiencia más transparente y confiable para ambas partes, fomentando un ambiente de respeto y profesionalismo dentro de la plataforma."
                    imagen={calificacion}
                    alt="calificaciones"
                    invertido={false}
                />
            </div>
            <Footer />
        </>
    )
}
