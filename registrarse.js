window.addEventListener("DOMContentLoaded", () => {//Espera que toda la estructura HTML esté cargada antes de ejecutar cualquier lógica.
    const campos = [//🔐 Validación de caracteres especiales
        //Seccion REGISTRO
                { inputId: "usuario" },
                { inputId: "password" },
                { inputId: "repPassword" },
                { inputId: "direccion" }
    ];
//Declara campos que deben tener solo letras y números. La expresión regular caracteres define qué caracteres son válidos.
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
        //Itera cada campo y agrega un input listener. Si se detecta un caracter especial: lo elimina y muestra el mensaje de error (mensaje.style.display = "block").⚠️ Advertencia: mensajeId no está definido en los objetos, por lo tanto mensaje será undefined. Este bloque va a lanzar un error si no se corrige. Podés remover mensajeId o agregarlo en cada objeto del array.
    });

    // Validacion Localidad Registro
    //🏘️ Validación de campo sin números (localidad)
    const camposSinNumeros = [
        { inputId: "localidad" }
    ];

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]*$/;//Restringe el campo “localidad” a letras (incluye tildes y ñ).

    camposSinNumeros.forEach(({ inputId }) => {
        const input = document.getElementById(inputId);
            input.addEventListener("input", () => {
                if (!soloLetras.test(input.value)) {
                    input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ]/g, "");//Remueve números u otros caracteres si se ingresan.
                }
            });
    });

//📞 Validación de campos numéricos
    const camposNumeros = [
    { inputId: "telefono"},
    { inputId: "dni"}
    ];

    const soloNumeros = /^[0-9]*$/;//Define que solo se permiten números en esos campos.
    
    //Validamos Telefonos En Registro
    camposNumeros.forEach(({ inputId }) => {//Itera sobre un array de objetos (ej. { inputId: "telefono" }, { inputId: "dni" }).Desestructura para acceder directamente a inputId.
        const input = document.getElementById(inputId);//Toma el elemento de HTML (por ejemplo, el <input id="telefono">).
            input.addEventListener("input", () => {//Cada vez que se escribe o pega algo en el campo (input event), se ejecuta la función.
                if (!soloNumeros.test(input.value)) {//Usa la expresión regular soloNumeros, que seguramente es: const soloNumeros = /^[0-9]*$/;
                    //Verifica si el valor contiene solo números del 0 al 9. Si no, entra al if.
                    input.value = input.value.replace(/[^0-9]/g, "");//Elimina caracteres que no sean dígitos numéricos.
                    //Reemplaza cualquier caracter que no sea un número ([^0-9]) por vacío (""). g es la bandera de “global”, que asegura que los cambios se apliquen a todos los caracteres del string.
                }
            });
    });
    
    // Evento submit del formulario
    const formulario = document.querySelector("form");//📨 Validación final y registro
    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita recarga
        //Captura el evento de envío del formulario. event.preventDefault() evita que la página se recargue.

        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;
        const repPassword = document.getElementById("repPassword").value;
        const direccion = document.getElementById("direccion").value;
        const localidad = document.getElementById("localidad").value;
        const telefono = document.getElementById("telefono").value;
        const dni = document.getElementById("dni").value;
        const email = document.getElementById("email")?.value || "sin@email.com";
        //Se extraen todos los valores ingresados. El email tiene un valor por defecto si el campo no existe por alguna razón.

        // Validaciones básicas
        if (!usuario || !password || !repPassword || !direccion || !localidad || !telefono || !dni) {
            alert("Por favor, completá todos los campos.");
            return;//Si algún campo obligatorio está vacío, se cancela la acción.
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }


        if (password !== repPassword) {
            alert("Las contraseñas no coinciden.");
            return;//Asegura que ambas contraseñas sean iguales.
        }

        // Verificar si el usuario ya existe
        //Obtiene la lista de usuarios ya registrados desde localStorage. Verifica si ya existe un usuario con el mismo nombre.
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const existe = usuarios.some(u => u.usuario === usuario);

        if (existe) {
            alert("El usuario ya existe. Elegí otro nombre.");
            return;//Si ya existe, alerta y detiene el registro.
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
            //Se construye un objeto con los datos ingresados. Define si es "trabajador" o "cliente" según si el botón está marcado.
        };

        // Guardar en localStorage
        //💾 Guardado y redirección
        usuarios.push(nuevoUsuario);//Agrega el nuevo usuario al array.
               
        if (nuevoUsuario.tipo === "trabajador") {
            alert("Usuario registrado como trabajador. Continue el registro >>> ");
            localStorage.setItem("HomeTrabajador", JSON.stringify(nuevoUsuario)); // 👈 igual al que usás en gestorTrabajador
            window.location.href = "./Home.html";

        } else {
            alert("Usuario registrado correctamente.");
            localStorage.setItem("HomeUsuario", JSON.stringify(nuevoUsuario));
            window.location.href = "./Home.html";// redirige a gestorUsuario con campos en Memoria
        }
        //Guarda el perfil según el tipo. Redirige a la página correspondiente.
    });

});

//✅ En resumen: 
// Este script:
//-Valida campos del formulario
//-Limpia caracteres inválidos en vivo
//-Evita que se registren datos incompletos o duplicados
//-Guarda los datos en localStorage
//-Redirige a cada perfil correspondiente