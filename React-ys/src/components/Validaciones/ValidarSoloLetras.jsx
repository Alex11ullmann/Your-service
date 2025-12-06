import React, { useState, useEffect } from "react";

export default function InputSoloLetras({
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
    let input = e.target.value;

    // Solo letras y espacios, sin permitir 2 espacios seguidos
    const soloPermitidos = /^[a-zA-Z ]*$/.test(input) && !/ {2,}/.test(input);
    if (!soloPermitidos) return;

    // Máximo 4 espacios permitidos en total
    const cantEspacios = (input.match(/ /g) || []).length;
    if (cantEspacios > 4) return;

    // Máximo 1 mayúscula
    const cantMayus = (input.match(/[A-Z]/g) || []).length;
    if (cantMayus > 1) return;

    // Respeta maxLength
    if (input.length > maxLength) return;

    // Forzar primera letra mayúscula y resto minúsculas
    if (input.length > 0) {
      input = input[0].toUpperCase() + input.slice(1).toLowerCase();
    }

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
      setError(`❌ Debe contener al menos ${minLength} caracteres`);
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
        <p style={{ color: "red", fontSize: "0.9em", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
