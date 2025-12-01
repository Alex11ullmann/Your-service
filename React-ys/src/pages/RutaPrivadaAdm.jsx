import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RutaPrivadaAdmin({ children }) {
  const [autorizado, setAutorizado] = useState(null);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioAdmin");
    const pass = localStorage.getItem("passAdmin");
    if (usuario === "Admin" && pass === "asdasd") {
      setAutorizado(true);
    } else {
      setAutorizado(false);
    }
  }, []);

  if (autorizado === null) return null; // mientras verifica, no muestra nada

  if (!autorizado) {
    alert("❌ Debes iniciar sesión como administrador para acceder a esta sección.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
