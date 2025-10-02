import Footer from './footer.jsx';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/preguntas">Preguntas Frecuentes</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacidad">Politica de Privacidad</a></li>
            <li><a href="/terminos">Terminos y Condiciones</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contacto</h3>
          <p>📞 2284-0303456</p>
          <p>📧 Your-service@gmail.com</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">🌐 Facebook</a>
            <a href="#" aria-label="Instagram">📸 Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2025 Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};


export default Footer;