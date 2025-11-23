import React, { useState, useEffect } from "react";

export default function InputSoloLetras({
  myStyle,
  label,
  name,
  placeholder,
  maxLength,
  minLength,
  onChange,
  value // <-- ahora recibimos value como prop
}) {

  const [valor, setValor] = useState(value || "");
  const [error, setError] = useState("");

  // sincronizar cuando value cambie desde fuera (perfil)
  useEffect(() => {
    setValor(value || "");
  }, [value]);

  const handleChange = (e) => {
    let input = e.target.value;

    // permitir solo letras
    const soloPermitidos = /^[a-zA-Z]*$/.test(input);
    if (!soloPermitidos) return;

    const cantMayus = (input.match(/[A-Z]/g) || []).length;
    if (cantMayus > 1) return;

    if (input.length > maxLength) return;

    if (input.length > 0) {
      input = input[0].toUpperCase() + input.slice(1).toLowerCase();
    }

    setValor(input);
    setError("");

    // propagar cambio como evento compatible con handleChange del form
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
