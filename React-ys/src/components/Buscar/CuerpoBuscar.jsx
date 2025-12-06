/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import "../Buscar/styleBuscar.css";
import CardsBuscar from "./CardBuscar.jsx";

export default function CuerpoBuscar() {
    const [perfiles, setPerfiles] = useState([]);
    const [perfilesFiltrados, setPerfilesFiltrados] = useState([]);

    const [filtroCiudad, setFiltroCiudad] = useState("");
    const [filtroOficio, setFiltroOficio] = useState("");

    const [ciudades, setCiudades] = useState([]);
    const [oficiosCatalogo, setOficiosCatalogo] = useState([]);

    useEffect(() => {
        async function fetchPerfiles() {
            try {
                const res = await fetch("https://your-service-3v1h.onrender.com/perfiles");
                const data = await res.json();

                // Transformar oficios
                const transformados = data.map((p) => {
                    return {
                        ...p,
                        oficios: Array.isArray(p.oficios)
                            ? p.oficios
                                  .map((o) => o.oficio?.nombre_oficio)
                                  .sort((a, b) => a.localeCompare(b))
                            : [],
                    };
                });

                const filtrados = transformados.filter(
                    (p) => p.oficios.length > 0
                );

                setPerfiles(filtrados);
                setPerfilesFiltrados(filtrados);

                // Crear lista de ciudades sin repetir
                const ciudadesUnicas = [...new Set(filtrados.map((p) => p.localidad))];
                setCiudades(ciudadesUnicas);

                // Crear lista de oficios sin repetir
                const todosOficios = filtrados.flatMap((p) => p.oficios);
                const oficiosUnicos = [...new Set(todosOficios)];

                setOficiosCatalogo(
                    oficiosUnicos.map((o, i) => ({
                        id_oficios: i + 1,
                        nombre_oficio: o
                    }))
                );

            } catch (err) {
                console.error("❌ Error cargando perfiles:", err);
            }
        }

        fetchPerfiles();
    }, []);

    useEffect(() => {
        let resultado = [...perfiles];

        // Filtrar por ciudad
        if (filtroCiudad) {
            resultado = resultado.filter((p) => p.localidad === filtroCiudad);
        }

        // Filtrar por oficio
        if (filtroOficio) {
            resultado = resultado.filter((p) =>
                p.oficios.includes(filtroOficio)
            );
        }
        setPerfilesFiltrados(resultado);
    }, [filtroCiudad, filtroOficio, perfiles]);

    return (
        <div className="cuerpoCatalogo">
            <div className="filtros-container">
                <select
                    className="filtro-select"
                    value={filtroCiudad}
                    onChange={(e) => setFiltroCiudad(e.target.value)}
                >
                    <option value="">Todas las ciudades</option>
                    {ciudades.map((c, i) => (
                        <option key={i} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                <select
                    className="filtro-select"
                    value={filtroOficio}
                    onChange={(e) => setFiltroOficio(e.target.value)}
                >
                    <option value="">Todos los oficios</option>
                    {oficiosCatalogo.map((o) => (
                        <option key={o.id_oficios} value={o.nombre_oficio}>
                            {o.nombre_oficio}
                        </option>
                    ))}
                </select>
            </div>

            <CardsBuscar
                titulo="Trabajadores disponibles"
                data={perfilesFiltrados}
                mode="cards"
            />
        </div>
    );
}
