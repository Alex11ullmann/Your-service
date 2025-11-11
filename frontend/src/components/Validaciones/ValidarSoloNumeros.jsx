import React, { useState } from "react";

export default function InputSoloNumeros({
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

        if (!/^[0-9]*$/.test(input)) {
            setError("❌ Solo se permiten números");
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
