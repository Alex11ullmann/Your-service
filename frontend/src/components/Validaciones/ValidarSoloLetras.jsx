import React, { useState } from "react";

export default function InputSoloLetras({
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

    // Solo letras y números
    const soloPermitidos = /^[a-zA-Z]*$/.test(input);
    if (!soloPermitidos) {
      setError("❌ Solo letras (sin numeros, ni espacios ni caracteres especiales)");
      return;
    }

    // Contar mayúsculas
    const cantMayus = (input.match(/[A-Z]/g) || []).length;

    if (cantMayus > 1) {
      setError("❌ Solo se permite 1 sola mayúscula");
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
        <p style={{ color: "red", fontSize: "0.9em", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

