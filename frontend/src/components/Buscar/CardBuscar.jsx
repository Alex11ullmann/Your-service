import { Link } from "react-router-dom";

export default function CardsBuscar({ titulo, data, dataKey, dataAttr }) {
  return (
    <div className="desplegable">
      <button className="boton-desplegable">{titulo}</button>
      <div className="contenido-desplegable">
        {data.map((item, index) => (
          <Link
            key={item.id ?? item[dataKey] ?? index}
            {...{ [dataAttr]: item[dataKey] }}
          >
            {item[dataKey]}
          </Link>
        ))}
      </div>
    </div>
  );
}
