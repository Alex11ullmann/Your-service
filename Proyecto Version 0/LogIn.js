import { validarCampo } from './validaciones.js';

window.addEventListener("DOMContentLoaded", () => {
    const campos = [
        { inputId: "usuario", mensajeId: "mensajeUsuario", tipo: "alfanumerico" },
        { inputId: "password", mensajeId: "mensajePassword", tipo: "alfanumerico" },
    ];

    const formInicio = document.getElementById("forminicio");

    // Validación en tiempo real
    campos.forEach(({ inputId, mensajeId, tipo }) => {
        const input = document.getElementById(inputId);
        const mensaje = document.getElementById(mensajeId);
        input.addEventListener("input", () => validarCampo(input, mensaje, tipo, 6));
    });

    if (!formInicio) return;

    formInicio.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar antes de buscar
        let todoValido = true;
        campos.forEach(({ inputId, mensajeId, tipo }) => {
            const input = document.getElementById(inputId);
            const mensaje = document.getElementById(mensajeId);
            const esValido = validarCampo(input, mensaje, tipo, 6);
            if (!esValido) todoValido = false;
        });
        if (!todoValido) return;

        const usuarioInput = document.getElementById("usuario")?.value.trim();
        const passwordInput = document.getElementById("password")?.value.trim();

        // Leer usuarios guardados
        let usuarios;
        try {
            usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (!Array.isArray(usuarios)) usuarios = [];
        } catch {
            usuarios = [];
        }

        // Buscar coincidencia exacta
        const usuarioEncontrado = usuarios.find(
            u => u.usuario === usuarioInput && u.password === passwordInput
        );

        if (!usuarioEncontrado) {
            alert("⚠️ Usuario o contraseña incorrectos.");
            return;
        }

        // Guardar sesión según tipo
        const clavePerfil = usuarioEncontrado.tipo === "trabajador" ? "perfilTrabajador" : "perfilUsuario";
        localStorage.setItem(clavePerfil, JSON.stringify(usuarioEncontrado));

        // Redirigir
        window.location.href = "./Home.html";
    });
});
