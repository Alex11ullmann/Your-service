import { Navigate } from "react-router-dom";

export default function RutaPrivada({ children }) {
  const usuarioOn = localStorage.getItem("usuarioOn") === "true";
  if (!usuarioOn) {
    alert("⚠️ Debes iniciar sesión para acceder a esta sección.");
    return <Navigate to="/LogIn" replace />;
  }
  return children;
}
