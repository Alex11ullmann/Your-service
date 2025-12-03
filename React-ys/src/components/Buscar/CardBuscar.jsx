import React from "react";
import { Link } from "react-router-dom";
import SinFoto from "../../Images/Photograph.jpg"; // Placeholder por defecto
import "./styleBuscar.css";

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
              const nombresYApellidos =
                item.nombresYApellidos ||
                item["Nombres y Apellidos"] ||
                item.Usuario ||
                item.nombre ||
                "Sin nombre";
              const oficios =
                item.oficios ?? item.Oficios ?? item.oficiosTrab ?? "";
              const localidad =
                item.Localidad ?? item.localidad ?? item.Localidad ?? "";
              const telefono = item.Telefono ?? item.telefono ?? "";
              let imagen = SinFoto;

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
                    <h4 className="card-item-nombre">{nombresYApellidos}</h4>
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
}
