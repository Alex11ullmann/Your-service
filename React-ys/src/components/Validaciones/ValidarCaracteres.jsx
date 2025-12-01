import React from "react";

export default function InputValidado({
  myStyle,
  label,
  name,
  placeholder,
  maxLength,
  minLength,
  value,
  onChange,
  passwordValue
}) {
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    let input = e.target.value;

    if (!/^[a-zA-Z0-9]*$/.test(input)) return;

    const cantMayus = (input.match(/[A-Z]/g) || []).length;
    if (cantMayus > 1) return;

    if (input.length > maxLength) return;

    if (input.length > 0) {
      input = input[0].toUpperCase() + input.slice(1).toLowerCase();
    }

    if (name === "repPassword" && passwordValue !== input) {
      setError("❌ Las contraseñas no coinciden");
    } else {
      setError("");
    }

    onChange({
      target: {
        name,
        value: input
      }
    });
  };

  const handleBlur = (e) => {
    if (value.length < minLength) {
      setError(`❌ Debe contener al menos ${minLength} caracteres`);
    }

    let input = e.target.value;

    if (input.length == 0) {
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
