export default function CardsBuscar ({ titulo, data, dataKey, dataAttr }) {
    return (
        <div className="desplegable">
            <button className="boton-desplegable">{titulo}</button>
            <div className="contenido-desplegable">
                {data.map((item, index) => (
                    <a
                        key={item.id ?? item[dataKey] ?? index}
                        href="#"
                        {...{ [dataAttr]: item[dataKey] }}
                    >
                        {item[dataKey]}
                    </a>
                ))}
            </div>
        </div>
    );
}