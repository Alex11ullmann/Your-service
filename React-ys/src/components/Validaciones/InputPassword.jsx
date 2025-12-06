/* eslint-disable no-undef */
import React, { useState } from "react";
import "../Validaciones/InputPassword.css";

export default function InputPassword({
    value,
    onChange,
    placeholder,
    name,
    id,
    required,
}) {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="password-container">
            <input
                type={mostrar ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="password-input"
                name={name}
                id={id}
                required={required}
            />

            <span
                className="password-toggle"
                onClick={() => setMostrar(!mostrar)}
            >
                {mostrar ? (
                    // 👁‍🗨 OJO ABIERTO
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                ) : (
                    // 👁 OJO CERRADO
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a20.1 20.1 0 0 1 5.06-5.94"></path>
                        <path d="M1 1l22 22"></path>
                    </svg>
                )}
            </span>
        </div>
    );
}