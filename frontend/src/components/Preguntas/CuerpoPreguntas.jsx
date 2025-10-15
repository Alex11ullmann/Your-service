import './stylePreguntas.css';
import { CardPreguntas } from './CardPreguntas';
import { InfoPreguntas } from "./InfoPreguntas"

export default function CuerpoPreguntas () {
  return (
    <>
      <div className="containerPreguntas">
        <h1>Preguntas Frecuentes</h1>
        <div className="containerDivs">
          {InfoPreguntas.map ((data)=>(
            <div className="containerPreg">
                <CardPreguntas
                textoH={data.textoH}
                textoP={data.textoP}
                />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};