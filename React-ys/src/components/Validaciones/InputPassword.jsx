import React, { useState } from "react";
import "./InputPassword.css";

export default function InputPassword({
  value,
  onChange,
  placeholder,
  name,
  id,
  required,
  myStyle,
}) {
  const [show, setShow] = useState(false);

  // --- VALIDACIÓN INTERNA DEL INPUT ---
  const validarPassword = (e) => {
    let val = e.target.value;

    // Bloquear espacios
    val = val.replace(/\s+/g, "");

    // Bloquear caracteres especiales no permitidos
    // Solo letras y números
    val = val.replace(/[^A-Za-z0-9]/g, "");

    // Crear evento falso con el valor corregido y mandarlo al form
    const eventoCorregido = {
      ...e,
      target: {
        ...e.target,
        value: val,
        name: name,
      },
    };

    onChange(eventoCorregido);
  };

  return (
    <div className="password-wrapper">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={validarPassword}   // ← ahora sí usa validación interna
        placeholder={placeholder}
        name={name}
        id={id}
        required={required}
        className={myStyle || "recuadro"}
        autoComplete="current-password"
      />

      <button
        type="button"
        className={`icon-eye ${show ? "open" : "closed"}`}
        onClick={() => setShow(!show)}
        tabIndex={-1}
        aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        <svg
          className="eye-open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        <svg
          className="eye-closed"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a20.1 20.1 0 0 1 5.06-5.94" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      </button>
    </div>
  );
}
