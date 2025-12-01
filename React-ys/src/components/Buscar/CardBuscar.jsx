import React from "react";
import { Link } from "react-router-dom";
import SinFoto from "../../Images/Photograph.jpg"; // Placeholder por defecto
import "./styleBuscar.css";

/*
  * Props:
  * - titulo: string
  * - data: array (puede ser lista de strings/objetos o perfiles)
  * - dataKey: string (clave para mostrar en el caso dropdown o cards, ej "ciudad" o "Usuario")
  * - dataAttr: string (atributo data-* para links en dropdown)
  * - mode: "dropdown" | "cards"  (por defecto "dropdown")
*/
export default function CardsBuscar({ titulo, data = [], dataKey, mode = "dropdown" }) {
  if (mode === "cards") {
    return (
      <div className="cards-buscar-wrapper">
        <h3 className="cards-buscar-titulo">{titulo}</h3>
        <div className="cards-grid">
          {data.length === 0 ? (
            <p className="sin-perfiles">Aun no hay trabajadores postulados.</p>
          ) : (
            data.map((item, index) => {
              const nombre =
                item[dataKey] ??
                item.Usuario ??
                item.nombre ??
                `Perfil ${index + 1}`;
              const nombreCompleto =
                item.nombreCompleto ||
                item["Nombres y Apellidos"] ||
                item.Usuario ||
                item.nombre ||
                "Sin nombre";
              const oficios =
                item.oficios ?? item.Oficios ?? item.oficiosTrab ?? "";
              const localidad =
                item.Localidad ?? item.localidad ?? item.Localidad ?? "";
              const telefono = item.Telefono ?? item.telefono ?? "";
              // Lógica mejorada para manejar imágenes (base64, url o placeholder)
              let imagen = SinFoto;
{/*              try {
                if (item.imagenPerfil) {
                  const img = item.imagenPerfil;
                  if (typeof img === "string") {
                    // Imagen Base64
                    if (img.startsWith("data:image")) {
                      imagen = img;
                    }
                    // Imagen de placeholder (ruta local)
                    else if (
                      img.includes("Photograph") ||
                      img.includes("SinFoto") ||
                      img.includes("/src/")
                    ) {
                      imagen = SinFoto;
                    }
                    // URL válida o blob
                    else {
                      imagen = img;
                    }
                  }
                }
              } catch {
                imagen = SinFoto;
              }
        */}
              return (
                <article
                  className="card-item"
                  key={item.id ?? `${nombre}-${index}`}
                >
                  <img
                    src={imagen}
                    alt={nombre}
                    className="card-item-img"
                    loading="lazy"
                  />
                  <div className="card-item-body">
                    <h4 className="card-item-nombre">{nombreCompleto}</h4>
                    {oficios && (
                      <p className="card-item-oficio">🛠️ {Array.isArray(oficios) ? oficios.join(", ") : oficios}</p>
                    )}
                    {localidad && (
                      <p className="card-item-localidad">🌇 {localidad}</p>
                    )}
                    {telefono && (
                      <p className="card-item-telefono">📞 {telefono}</p>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    );
  }

{/* Modo desplegable 
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
*/}
}
