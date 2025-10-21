import "./StyleFlotanteFooter.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>Enlaces</h3>
          <ul>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/preguntas">Preguntas Frecuentes</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><Link to="/privacidad">Política de Privacidad</Link></li>
            <li><Link to="/terminos">Términos y Condiciones</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contacto</h3>
          <p>📞 2284-0303456</p>
          <p>📧 Your-service@gmail.com</p>
          <div className="social-links">
            
            <a href="" aria-label="Facebook">🌐 Facebook</a>
            <a href="" aria-label="Instagram">📸 Instagram</a>
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
