import React, { useState } from "react";
import "./InputPassword.css";

export default function InputPassword({
    value,
    onChange,
    placeholder,
    name,
    id,
    required,
    myStyle 
}) {
    const [show, setShow] = useState(false);

    return (
        <div className="password-wrapper">
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={id}
                required={required}
                className={myStyle}  
            />

            <span className="icon-eye" onClick={() => setShow(!show)}>
                {show ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a20.1 20.1 0 0 1 5.06-5.94" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                )}
            </span>
        </div>
    );
}
