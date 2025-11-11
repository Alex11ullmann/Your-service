window.addEventListener("DOMContentLoaded", () => {
    const reglas = {
        alfanumerico: /^[a-zA-Z0-9]*$/,
        letras: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/,
        numeros: /^[0-9]*$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    };

    const campos = [
        { inputId: "usuario", tipo: "alfanumerico" },
        { inputId: "password", tipo: "alfanumerico" },
        { inputId: "repPassword", tipo: "alfanumerico" },
        { inputId: "direccion", tipo: "alfanumerico" },
        { inputId: "localidad", tipo: "letras" },
        { inputId: "telefono", tipo: "numeros" },
        { inputId: "dni", tipo: "numeros" },
        { inputId: "email", tipo: "email" }
    ];

    campos.forEach(({ inputId, tipo }) => {
        const input = document.getElementById(inputId);
        const mensaje = document.createElement("div");
        mensaje.className = "mensaje-error";
        mensaje.hidden = true;
        input.parentNode.appendChild(mensaje);

        input.addEventListener("input", () => {
            let valor = input.value;
            const regex = reglas[tipo];

            if (tipo === "email") {
                const esValido = regex.test(valor);
                mensaje.textContent = esValido ? "" : "⚠️ Ingresá un email válido. Ej: nombre@dominio.com";
                mensaje.hidden = esValido;
                input.classList.toggle("error", !esValido);
            } else {
                if (!regex.test(valor)) {
                    const limpio = valor.replace(new RegExp(`[^${regex.source.replace(/^\^|\*$/g, '')}]`, 'g'), "");
                    input.value = limpio;
                    mensaje.textContent = `⚠️ Solo se permiten caracteres válidos para este campo (${tipo}).`;
                    mensaje.hidden = false;
                    input.classList.add("error");
                } else {
                    mensaje.hidden = true;
                    mensaje.textContent = "";
                    input.classList.remove("error");
                }
            }
        });
    });

    // Validación de contraseñas iguales
    const pass1 = document.getElementById("password");
    const pass2 = document.getElementById("repPassword");
    const mensajeIgualdad = document.createElement("div");
    mensajeIgualdad.className = "mensaje-error";
    mensajeIgualdad.hidden = true;
    pass2.parentNode.appendChild(mensajeIgualdad);

    pass2.addEventListener("input", () => {
        const iguales = pass1.value === pass2.value;
        mensajeIgualdad.textContent = iguales ? "" : "⚠️ Las contraseñas no coinciden.";
        mensajeIgualdad.hidden = iguales;
        pass2.classList.toggle("error", !iguales);
    });

    // Validación final al enviar
    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        let todoValido = true;

        campos.forEach(({ inputId, tipo }) => {
            const input = document.getElementById(inputId);
            const valor = input.value.trim();
            const regex = reglas[tipo];
            const mensaje = input.parentNode.querySelector(".mensaje-error");

            const esValido = tipo === "email"
                ? regex.test(valor)
                : valor.length >= 1 && regex.test(valor);

            if (!esValido) {
                mensaje.hidden = false;
                input.classList.add("error");
                todoValido = false;
            } else {
                mensaje.hidden = true;
                input.classList.remove("error");
            }
        });

        const iguales = pass1.value === pass2.value;
        if (!iguales) {
            mensajeIgualdad.hidden = false;
            pass2.classList.add("error");
            todoValido = false;
        }

        if (!todoValido) {
            alert("⚠️ Hay campos inválidos. Verificá los datos ingresados.");
            return;
        }

        // Registro
        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const localidad = document.getElementById("localidad").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const dni = document.getElementById("dni").value.trim();
        const email = document.getElementById("email").value.trim();

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const existe = usuarios.some(u => u.usuario === usuario);
        if (existe) {
            alert("El usuario ya existe. Elegí otro nombre.");
            return;
        }

        const nuevoUsuario = {
            usuario,
            password,
            direccion,
            localidad,
            telefono,
            dni,
            email,
            tipo: document.getElementById('tilde-trabajador').classList.contains('checked') ? "trabajador" : "cliente"
        };

        // Guardar perfil activo
        localStorage.removeItem("perfilUsuario");
        localStorage.removeItem("perfilTrabajador");
        localStorage.setItem("perfilUsuario", JSON.stringify(nuevoUsuario));

        // Guardar en lista de usuarios
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Redirigir según tipo
        if (nuevoUsuario.tipo === "trabajador") {
            alert("Usuario registrado como trabajador. Continue el registro >>> ");
            localStorage.setItem("HomeTrabajador", JSON.stringify(nuevoUsuario));
            window.location.href = "./perfiltrab.html";
        } else {
            alert("Usuario registrado correctamente.");
            localStorage.setItem("HomeUsuario", JSON.stringify(nuevoUsuario));
            window.location.href = "./Home.html";
        }
    });
});
