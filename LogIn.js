window.addEventListener("DOMContentLoaded", () => {
    const campos = [
        //Seccion LOGIN
        { inputId: "usuario", mensajeId: "mensajeUsuario" },
        { inputId: "password", mensajeId: "mensajePassword" },
        //Seccion REGISTRO
        { inputId: "repPassword" },
        { inputId: "direccion" }
    ];

    const caracteres = /^[A-Za-z0-9]*$/;

    //Funcion para validad que no sean caracteres especiales
    
    campos.forEach(({ inputId, mensajeId }) => {
        const input = document.getElementById(inputId);
        const mensaje = document.getElementById(mensajeId);
        if (input && mensaje) {
            input.addEventListener("input", () => {
                if (!caracteres.test(input.value)) {
                    input.value = input.value.replace(/[^A-Za-z0-9]/g, "");
                    mensaje.style.display = "block";
                } else {
                    mensaje.style.display = "none";
                }
            });
        }
    });

    // Validacion Localidad Registro
    const camposSinNumeros = [
        { inputId: "localidad" }
    ];

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]*$/;

    camposSinNumeros.forEach(({ inputId }) => {
        const input = document.getElementById(inputId);
        if (input) { //veo si existe para no generar problemas en LogIn
            input.addEventListener("input", () => {
                if (!soloLetras.test(input.value)) {
                    input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ]/g, "");
                }
            });
        }
    });


    const camposNumeros = [
    { inputId: "telefono"},
    { inputId: "dni"}
    ];

    const soloNumeros = /^[0-9]*$/;
    //Validamos Telefonos En Registro
    camposNumeros.forEach(({ inputId }) => {
        const input = document.getElementById(inputId);
         if (input) { 
            input.addEventListener("input", () => {
                if (!soloNumeros.test(input.value)) {
                    input.value = input.value.replace(/[^0-9]/g, "");
                }
            });
        }
    });

    
    // Funcion para validar tilde (Registro)
    let botonGuardar = document.getElementById('guardar-btn');
    if (botonGuardar){
        botonGuardar.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe por defecto

        const tilde = document.getElementById('tilde-trabajador');

        if (tilde.classList.contains('checked')) {
            // Redirige al enlace deseado
            window.location.href = './perfiltrab.html';
        } else {
            alert('Su perfil ah sido creado');
        }
        });
    }


    // Funfion Buscar usuario/Trabajador LogIn
    const formInicio = document.getElementById("forminicio");
    if (formInicio) {
        formInicio.addEventListener("submit", async (e) => {
            e.preventDefault();

            const usuarioInput = document.getElementById("usuario")?.value.trim();
            const passwordInput = document.getElementById("password")?.value.trim();

            if (!usuarioInput || !passwordInput) {
                alert("Por favor completá ambos campos.");
                return;
            }

            try {
                // Buscar primero en clientes.json
                const clientesRes = await fetch("./data/clientes.json");
                const clientes = await clientesRes.json();
                const cliente = clientes.find(
                    c => c.usuario === usuarioInput && c.password === passwordInput
                );

                if (cliente) {
                    localStorage.setItem("perfilUsuario", JSON.stringify(cliente));
                    window.location.href = "./gestorUsuario.html";
                    return;
                }

                // Buscar en profecionales.json si no está en clientes
                const profRes = await fetch("./data/profecionales.json");
                const profs = await profRes.json();
                const prof = profs.find(
                    p => p.usuario === usuarioInput && p.password === passwordInput
                );

                if (prof) {
                    localStorage.setItem("perfilTrabajador", JSON.stringify(prof));
                    window.location.href = "./gestorTrabajador.html";
                    return;
                }

                // Si no se encontró en ninguno
                alert("⚠️ Usuario o contraseña incorrectos.");

            } catch (error) {
                console.error("Error en login:", error);
                alert("Error al intentar iniciar sesión.");
            }
        });
    }
});
