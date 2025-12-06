import React from "react";
import SinFoto from "../../Images/Photograph.jpg";
import "./styleBuscar.css";

export default function CardsBuscar({ titulo, data = [], mode = "dropdown" }) {

  if (mode === "cards") {
    return (
      <div className="cards-buscar-wrapper">
        <h3 className="cards-buscar-titulo">{titulo}</h3>

        <div className="cards-grid">
          {data.length === 0 ? (
            <p className="sin-perfiles">Aún no hay trabajadores postulados.</p>
          ) : (
            data.map((item, index) => {
              const perfil = item.perfil ?? item;
              const nombre =
                perfil.nombresYApellidos ||
                perfil.nombre ||
                item.usuario ||
                "Sin nombre";

              const oficios = perfil.oficios ?? [];
              const localidad = perfil.localidad ?? "";
              const telefono = perfil.telefono ?? "";

              const descripcion =
                perfil.descripcion ||
                perfil.sobreMi ||
                perfil.sobre_mi ||
                perfil.SobreMi ||
                "";

              const imagen = SinFoto;

              return (
                <article
                  className="card-item"
                  key={perfil.id_perfil ?? item.id_usuario ?? index}
                >
                  <img
                    src={imagen}
                    alt={nombre}
                    className="card-item-img"
                    loading="lazy"
                  />

                  <div className="card-item-body">
                    <h4 className="card-item-nombre">{nombre}</h4>

                    {Array.isArray(oficios) && oficios.length > 0 && (
                      <p className="card-item-oficio">🛠️ {oficios.join(", ")}</p>
                    )}

                    {localidad && <p className="card-item-localidad">🌇 {localidad}</p>}
                    {telefono && <p className="card-item-telefono">📞 {telefono}</p>}
                    {descripcion && (
                      <p className="card-item-descripcion">📝 {descripcion}</p>
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

  return null;
}
