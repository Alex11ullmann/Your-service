import React, { useState, useEffect } from "react";

export default function InputSoloNumeros({
    myStyle,
    label,
    name,
    placeholder,
    maxLength,
    minLength,
    onChange,
    value
}) {

    const [valor, setValor] = useState(value || "");
    const [error, setError] = useState("");

    useEffect(() => {
        setValor(value || "");
    }, [value]);

    const handleChange = (e) => {
        const input = e.target.value;

        if (!/^[0-9]*$/.test(input)) return;

        setValor(input);
        setError("");

        if (onChange) {
            onChange({
                target: {
                    name,
                    value: input
                }
            });
        }
    };

    const handleBlur = (e) => {
        if ((valor || "").length < (minLength || 0)) {
            setError(`❌ Debe contener al menos ${minLength} numeros`);
        } else {
            setError("");
        }

        let input = e.target.value;

        if (input.length === 0) {
            setError("");
        }
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
                onBlur={handleBlur}
            />

            {error && (
                <p style={{ color: "red", fontSize: "0.9em" }}>{error}</p>
            )}
        </div>
    );
}
