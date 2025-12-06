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
                // Transformar cada perfil
                const transformados = data.map((p) => {
                    return {
                        ...p,
                        oficios: Array.isArray(p.oficios)
                            ? p.oficios.map((o) => o.oficio?.nombre)
                            : [],
                    };
                });

                const filtrados = transformados.filter(
                    (p) => p.oficios.length > 0
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
