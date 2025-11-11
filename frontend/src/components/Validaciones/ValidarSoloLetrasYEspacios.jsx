import React, { useState } from "react";

export default function InputSoloLetrasYEspacio({
    myStyle,
    label,
    name,
    placeholder,
    maxLength,
    minLength
}) {

    const [valor, setValor] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const input = e.target.value;

        const soloPermitidos = /^[a-zA-Z\s]*$/.test(input);
        if (!soloPermitidos) {
            setError("❌ Solo letras y hasta 3 espacios (sin números ni caracteres especiales)");
            return;
        }

        if (input.includes("  ")) {
            setError("❌ No se permiten dos espacios seguidos");
            return;
        }

        const cantidadEspacios = (input.match(/ /g) || []).length;
        if (cantidadEspacios > 3) {
            setError("❌ Máximo 3 espacios permitidos");
            return;
        }

        const cantMayus = (input.match(/[A-Z]/g) || []).length;
        if (cantMayus > 1) {
            setError("❌ Solo se permite 1 mayúscula");
            return;
        }

        setValor(input);
        setError("");
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            {label && <label htmlFor={name}>{label}</label>}

            <input
                type="text"
                className={myStyle}
                id={name}
                name={name}
                placeholder={placeholder}
                maxLength={maxLength}
                minLength={minLength}
                value={valor}
                onChange={handleChange}
            />

            {error && (
                <p style={{ color: "red", fontSize: "0.9em" }}>{error}</p>
            )}
        </div>
    );
}
