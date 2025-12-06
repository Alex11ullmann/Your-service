import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 

const InputPassword = ({ value, onChange, placeholder }) => {
    const [show, setShow] = useState(false);

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder || "Contraseña"}
                style={{
                    width: "100%",
                    padding: "10px 40px 10px 10px",
                    borderRadius: "8px",
                    border: "1px solid gray",
                    fontSize: "1rem"
                }}
            />
            <span
                onClick={() => setShow(!show)}
                style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    userSelect: "none"
                }}
            >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
        </div>
    );
};

export default InputPassword;