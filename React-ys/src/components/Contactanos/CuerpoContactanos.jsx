import './StyleContactanos.css';
import { InfoParaCardContactanos } from './InfoParaCardContactanos';

export default function CuerpoContactanos() {
    return (
        <>
            <section className="contactanos">
                <h2>Contáctanos</h2>
                <p>¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte!</p>
                <div className="contactanos1">
                    <div className="contacto-formulario">
                        <h3>Envíanos un Mensaje</h3>
                        <form className="contacto-formulario1">
                            {InfoParaCardContactanos.map((data, index) => (
                                <div key= {data.id ?? data.nombre ?? index}>
                                    <label htmlFor={data.nombre}>{data.nombre}:</label>
                                    <input type={data.type} id={data.nombre} name={data.nombre} />
                                    <span id={data.id} className="error-texto" hidden></span>
                                </div>
                            ))}
                            <div>
                                <label htmlFor="mensaje">Tu Mensaje:</label>
                                <textarea id="mensaje" name="mensaje" rows="6"></textarea>
                                <span id="error-mensaje" className="error-texto" hidden></span>
                            </div>
                            <button type="submit" className="boton">Enviar Mensaje</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
