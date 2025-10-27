import React, { useState } from "react";

export default function InputValidado({ label, name, placeholder }) {
  const [valor, setValor] = useState("");
  const [error, setError] = useState("");

  // Expresión regular: solo letras y números permitidos
  const regexPermitido = /^[a-zA-Z0-9]*$/;

  const handleChange = (e) => {
    const input = e.target.value;

    // Si el último carácter no cumple la regla, no lo agregamos
    if (regexPermitido.test(input)) {
      setValor(input);
      setError("");
    } else {
      setError("❌ No se permiten espacios ni caracteres especiales");
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        id={name}
        name={name}
        value={valor}
        placeholder={placeholder}
        onChange={handleChange}
        className="input-validado"
        style={{
          display: "block",
          padding: "8px",
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "6px",
          marginTop: "4px",
        }}
      />
      {error && (
        <p style={{ color: "red", fontSize: "0.9em", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}


Cómo usarlo
import InputValidado from "./InputValidado";

export default function FormRegistro() {
  return (
    <form>
      <InputValidado label="Usuario" name="usuario" placeholder="Ingrese su usuario" />
      <InputValidado label="Contraseña" name="password" placeholder="Ingrese su contraseña" />
      <button type="submit">Registrar</button>
    </form>
  );
}


Si querés que el carácter ni siquiera se escriba (en lugar de borrarlo luego)
const handleKeyDown = (e) => {
  const regex = /^[a-zA-Z0-9]$/;
  if (!regex.test(e.key)) {
    e.preventDefault();
    setError("❌ No se permiten caracteres especiales");
  } else {
    setError("");
  }
};
onKeyDown={handleKeyDown}
