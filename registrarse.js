window.addEventListener("DOMContentLoaded", () => {
    const campos = [
                //Seccion REGISTRO
                { inputId: "repPassword" },
                { inputId: "direccion" }
    ];

    const caracteres = /^[A-Za-z0-9]*$/;

    //Funcion para validad que no sean caracteres especiales
    campos.forEach(({ inputId, mensajeId }) => {
        const input = document.getElementById(inputId);
        const mensaje = document.getElementById(mensajeId);
            input.addEventListener("input", () => {
                if (!caracteres.test(input.value)) {
                    input.value = input.value.replace(/[^A-Za-z0-9]/g, "");
                    mensaje.style.display = "block";
                } else {
                    mensaje.style.display = "none";
                }
            });
    });

    // Validacion Localidad Registro
    const camposSinNumeros = [
        { inputId: "localidad" }
    ];

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]*$/;

    camposSinNumeros.forEach(({ inputId }) => {
        const input = document.getElementById(inputId);
            input.addEventListener("input", () => {
                if (!soloLetras.test(input.value)) {
                    input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ]/g, "");
                }
            });
    });


    const camposNumeros = [
    { inputId: "telefono"},
    { inputId: "dni"}
    ];

    const soloNumeros = /^[0-9]*$/;
    
    //Validamos Telefonos En Registro
    camposNumeros.forEach(({ inputId }) => {
        const input = document.getElementById(inputId);
            input.addEventListener("input", () => {
                if (!soloNumeros.test(input.value)) {
                    input.value = input.value.replace(/[^0-9]/g, "");
                }
            });
    });
    
    // Evento submit del formulario
    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita recarga

        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;
        const repPassword = document.getElementById("repPassword").value;
        const direccion = document.getElementById("direccion").value;
        const localidad = document.getElementById("localidad").value;
        const telefono = document.getElementById("telefono").value;
        const dni = document.getElementById("dni").value;
        const email = document.getElementById("email")?.value || "sin@email.com";

        // Validaciones básicas
        if (!usuario || !password || !repPassword || !direccion || !localidad || !telefono || !dni) {
            alert("Por favor, completá todos los campos.");
            return;
        }

        if (password !== repPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Verificar si el usuario ya existe
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const existe = usuarios.some(u => u.usuario === usuario);

        if (existe) {
            alert("El usuario ya existe. Elegí otro nombre.");
            return;
        }

        // Crear objeto usuario
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

        // Guardar en localStorage
        usuarios.push(nuevoUsuario);
               
        if (nuevoUsuario.tipo === "trabajador") {
            alert("Usuario registrado como trabajador. Continue el registro >>> ");
            localStorage.setItem("perfilTrabajador", JSON.stringify(nuevoUsuario)); // 👈 igual al que usás en gestorTrabajador
            window.location.href = "./perfiltrab.html";

        } else {
            alert("Usuario registrado correctamente.");
            localStorage.setItem("perfilUsuario", JSON.stringify(nuevoUsuario));
            window.location.href = "./gestorUsuario.html";// redirige a gestorUsuario con campos en Memoria
        }
    });


});