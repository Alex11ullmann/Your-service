import React, { useEffect, useState } from "react";
import "../Buscar/styleBuscar.css";
import CardsBuscar from "./CardBuscar.jsx";

export default function CuerpoBuscar() {
    const [perfiles, setPerfiles] = useState([]);

    useEffect(() => {
        async function fetchPerfiles() {
            try {
                const res = await fetch("https://your-service-3v1h.onrender.com/perfiles");
                const data = await res.json();

                // Filtrar solo trabajadores con oficios
                const filtrados = data.filter(
                    (p) =>
                        p.tipo === "trabajador" &&
                        p.perfil && 
                        Array.isArray(p.perfil.oficios) &&
                        p.perfil.oficios.length > 0
                );

                setPerfiles(filtrados);
            } catch (err) {
                console.error("❌ Error cargando perfiles:", err);
            }
        }

        fetchPerfiles();
    }, []);

    return (
        <div className="cuerpoCatalogo">
            <CardsBuscar
                titulo="Trabajadores disponibles"
                data={perfiles}
                mode="cards"
            />
        </div>
    );
}
