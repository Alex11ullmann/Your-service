import { validarCampo } from "./validaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRecuperar");
  const emailInput = document.getElementById("email");
  const errorEmail = document.getElementById("error-email");
  const mensajeExito = document.getElementById("mensajeExito");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailValido = validarCampo(emailInput, errorEmail, "email", 5);

    if (emailValido) {
      try {
        // Envio a backend
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailInput.value.trim() })
        });

        if (respuesta.ok) {
          mensajeExito.hidden = false;
          form.reset();
        } else {
          alert("No se pudo procesar la solicitud.");
        }
      } catch (error) {
        console.error("error:", error);
        alert("Error de conexion.");
      }
    }
  });
});
