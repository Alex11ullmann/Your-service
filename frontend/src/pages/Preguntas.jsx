import '../components/Preguntas/preguntas.css';

const Preguntas = () => {
  return (
    <>
      <div className="containerPreguntas">
        <h1>Preguntas Frecuentes</h1>
        <div className="containerDivs">
          <div className="container">
              <h3>¿Cuáles son los métodos de pago?</h3>
              <p>Se aceptan tarjetas de débito/crédito y billetera virtual.</p>
          </div>
          <div className="container">
              <h3>¿Tengo alguna defensa como consumidor final?</h3>
              <p>Sí, en Defensa del Consumidor.</p>
          </div>
          <div className="container">
              <h3>¿Qué debo hacer en caso de algún problema?</h3>
              <p>Depende el tipo de problema. Nosotros podemos bloquear a las personas que no actúen correctamente y ayudar a conciliar, pero si tu problema son temas legales, de seguridad o más graves, nosotros siempre colaboraremos con la autoridad para ayudar a resolver el incidente. Si no se logra mediar, y aunque afortunadamente no hemos tenido estas situaciones, siempre recomendamos en estos casos levantar una denuncia de hechos con el Ministerio Público.</p>
          </div>
          <div className="container">
              <h3>¿Me facturan por el trabajo?</h3>
              <p>Esto es algo que debes preguntar directamente a tu experto. Nosotros no facturamos ya que no fuimos los contratistas del trabajo. Algunos expertos tendrán la capacidad de facturarte, otros no. Puedes preguntarle por chat y cancelarlo si no cumple con tus requerimientos.</p>
          </div>
          <div className="container">
              <h3>¿Qué herramientas se tienen disponibles?</h3>
              <p>Somos una plataforma joven, iremos agregando herramientas conforme se requieran. Nuestra promesa de valor es una experiencia simple y segura, por lo que nos enfocaremos en mecanismos de pago y certificación de expertos. De momento, nuestra principal capacidad es la conexión de ubicación entre usuarios.</p>
          </div>
          <div className="container">
              <h3>¿Qué tan experto es el experto?</h3>
              <p>Los expertos registrados en la plataforma se autoregistran o también los puede registrar un agregador de servicios. La mejor forma de conocer su capacidad es revisando los comentarios y evaluaciones que reciben por su trabajo.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preguntas;
