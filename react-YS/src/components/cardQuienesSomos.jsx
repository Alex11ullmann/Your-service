import "../Css/styleQuienesSomos.css";
import conexiones from "../Images/conexiones.jfif"
import quienesSomos from "../Images/quienesSomos.jfif"
import Objetivos from "../Images/Objetivo.png"
import calificacion from "../Images/calificacion.jfif"


export default function QuienesSomos () {
    return (
        <div>
            <div className="subCont">
                <div className="contTexto">
                    <img className="contTexto" src={conexiones} alt="conexiones" />
                </div>
                <div className="contTexto">
                    <h4>¿Qué es?</h4>
                    <p>
                        Your Service es una web diseñada para conectar a profesionales de diversos oficios con clientes que requieren sus servicios de manera rápida y eficiente. 
                    </p>
                    <p>
                        Nuestra misión es simplificar la búsqueda de talento especializado, brindando un espacio donde trabajadores y clientes puedan interactuar de forma segura, transparente y confiable. 
                    </p>
                    <p>
                        A través de nuestra Web, los usuarios pueden acceder a perfiles detallados, verificar referencias, comparar opciones y contratar el servicio que mejor se adapte a sus necesidades, optimizando así el proceso de contratación.  
                    </p>
                </div>
            </div>
            <div className="subCont">
                <div className="contTexto quienesSomos">
                    <h4>¿Quiénes Somos?</h4>
                    <p>
                        Somos un equipo de desarrolladores y programadores web comprometidos con la creación de soluciones tecnológicas innovadoras que faciliten la conexión entre personas.
                    </p>
                    <p>
                        Nos destacamos por nuestra seriedad, profesionalismo y visión a futuro, ofreciendo herramientas accesibles y eficientes para mejorar la experiencia de nuestros usuarios y potenciar nuevas oportunidades en el mercado digital.
                    </p>  
                </div>
                <div className="contTexto quienesSomos">
                    <img className="contTexto quienesSomos" src={quienesSomos} alt="quienesSomos" />
                </div>                                  
            </div>

            <div className="subCont">
                <div className="contTexto objetivos">
                    <img className="contTexto objetivos" src={Objetivos} alt="objetivos" />
                </div>
                <div className="contTexto">
                    <h4>Objetivo de la Plataforma</h4>
                    <p>
                        El principal objetivo de <strong>Your Service</strong> es proporcionar una solución eficiente que facilite el encuentro entre trabajadores y clientes de manera rápida y directa. 
                    </p>
                    <p>
                        A través de nuestra plataforma, buscamos generar nuevas oportunidades laborales y mejorar el acceso a servicios especializados, creando un entorno confiable y accesible para todos. 
                    </p>
                </div>
            </div>

            <div className="subCont">
                <div className="contTexto">
                    <h4>Sistema de Calificaciones</h4>
                    <p>
                        Nuestro sistema de calificaciones permite a los clientes evaluar a los trabajadores en diversos aspectos clave, como cumplimiento del tiempo acordado, orden y limpieza, tarifa adecuada, calidad del trabajo, cordialidad y respeto. 
                    </p>
                    <p>
                        Del mismo modo, los trabajadores pueden puntuar a los clientes en relación con el plazo de pago, cumplimiento del horario de trabajo acordado, cordialidad y respeto.  
                    </p>
                    <p>
                        Este sistema garantiza una experiencia más transparente y confiable para ambas partes, fomentando un ambiente de respeto y profesionalismo dentro de la plataforma.
                    </p>
                </div>
                <div className="contTexto calificacion">
                    <img className="contTexto calificacion" src={calificacion} alt="calificacion" />
                </div>                     
            </div>
        </div>
    )
}