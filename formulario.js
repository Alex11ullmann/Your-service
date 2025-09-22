import { validarCampo } from "./validaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector(".contacto-formulario1");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const mensaje = document.getElementById("mensaje");

    const errorNombre = document.getElementById("error-nombre");
    const errorEmail = document.getElementById("error-email");
    const errorTelefono = document.getElementById("error-telefono");
    const errorMensaje = document.getElementById("error-mensaje");

    const nombreValido = validarCampo(nombre, errorNombre, "letras", 5);
    const emailValido = validarCampo(email, errorEmail, "email", 5);
    const telefonoValido = telefono.value.trim() === "" || validarCampo(telefono, errorTelefono, "numeros", 8);
    const mensajeValido = validarCampo(mensaje, errorMensaje, "alfanumerico", 10);

    if (nombreValido && emailValido && telefonoValido && mensajeValido) {
      alert("Formulario enviado correctamente.");
      formulario.reset();
    }
  });
});
