import '../Css/contacto.css';

const Contacto = () => {
  return (
    <main>
      <section className="contactanos">
        <h2>Contáctanos</h2>
        <p>¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte!</p>

        <div className="contactanos1">
          <div className="contacto-formulario">
            <h3>Envíanos un Mensaje</h3>
            <form className="contacto-formulario1">
              <div>
                <label htmlFor="nombre">Nombre Completo:</label>
                <input type="text" id="nombre" name="nombre" />
                <span id="error-nombre" className="error-texto" hidden></span>
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <span id="error-email" className="error-texto" hidden></span>
              </div>

              <div>
                <label htmlFor="telefono">Teléfono (opcional):</label>
                <input type="tel" id="telefono" name="telefono" />
                <span id="error-telefono" className="error-texto" hidden></span>
              </div>

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
    </main>
  );
};

export default Contacto;
