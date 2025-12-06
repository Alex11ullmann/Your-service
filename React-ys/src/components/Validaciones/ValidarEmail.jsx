import React, { useState } from "react";

export default function InputEmail({
    label,
    name,
    placeholder,
    onChange,
    value,
    myStyle
}) {
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const input = e.target.value;
        // Dar el cambio al formulario padre
        if (onChange) {
            onChange({
                target: {
                    name,
                    value: input,
                },
            });
        }
    };

    const handleBlur = (e) => {
        const input = e.target.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(input)) {
            setError("❌ Ingrese un correo válido (ej: nombre@correo.com)");
        } else {
            setError("");
        }
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type="text"
                id={name}
                name={name}
                className={myStyle}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {error && (
                <p style={{ color: "red", fontSize: "0.9em", marginTop: "4px" }}>
                    {error}
                </p>
            )}
        </div>
    );
}