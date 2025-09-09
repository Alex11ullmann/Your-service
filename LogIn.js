window.addEventListener("DOMContentLoaded", () => {//Se ejecuta una vez que todo el HTML esté completamente cargado.
    const campos = [
        //Seccion LOGIN
        { inputId: "usuario", mensajeId: "mensajeUsuario" },
        { inputId: "password", mensajeId: "mensajePassword" },
    ];//Lista de campos del formulario de LogIn. Aunque mensajeId se define, en este fragmento no se utiliza (quizás lo uses en otro script para validación visual).

    const regex = /^[a-zA-Z0-9]+$/;//Define que caracteres son validos.

    // Funfion Buscar usuario/Trabajador LogIn
    const formInicio = document.getElementById("forminicio");//Toma el formulario de inicio de sesión por su ID.



    //Verifica que el campo tenga al menos 6 caracteres. Si no cumnple muestra el mensj de error. 
    function validarCampo(input, mensaje) {
        const valor = input.value.trim();
        const esValido = valor.length >= 6 && regex.test(valor);

        if (!esValido) {
            mensaje.hidden = false;
            input.classList.add("error");
        } else {
            mensaje.hidden = true;
            input.classList.remove("error");
        }

        return esValido;
    }




    if (formInicio) {
        formInicio.addEventListener("submit", async (e) => {//Escucha el evento de envío del formulario. Lo marca como async porque va a usar fetch para cargar archivos JSON.
            e.preventDefault();//Previene el comportamiento por defecto (evitar recarga del navegador).



            //Recorre los campos definidos y valida cada uno y si alguno no cumple se detiene la funcion.
            let todoValido = true;

            campos.forEach(({ inputId, mensajeId }) => {
                const input = document.getElementById(inputId);//OBTENEMOS EL ELEMENTO INPUT DEL HTML
                const mensaje = document.getElementById(mensajeId);//OBTENEMOS EL DIV QUE CONTIENE EL MENSJ
                const esValido = validarCampo(input, mensaje);
                if (!esValido) todoValido = false;
            });

            if (!todoValido) return;

            const usuarioInput = document.getElementById("usuario")?.value.trim();
            const passwordInput = document.getElementById("password")?.value.trim();

            //Obtiene lo que el usuario escribió en los campos.?. previene errores si algún campo no existe en el DOM. .trim() elimina espacios en blanco al principio o al final.

            try {
                // Buscar primero en clientes.json
                const clientesRes = await fetch("./data/clientes.json");
                const clientes = await clientesRes.json();
                const cliente = clientes.find(
                    c => c.usuario === usuarioInput && c.password === passwordInput
                    //Carga el archivo de clientes. Busca si hay coincidencia exacta de usuario y contraseña.
                );

                if (cliente) {
                    localStorage.setItem("perfilUsuario", JSON.stringify(cliente));
                    //window.location.href = "./gestorUsuario.html";// redirige a gestorUsuario con campos en Memoria
                    window.location.href = "./Home.html";// redirige al home
                    return;
                }

                // Buscar en profecionales.json si no está en clientes
                const profRes = await fetch("./data/profecionales.json");
                const profs = await profRes.json();
                const prof = profs.find(
                    p => p.usuario === usuarioInput && p.password === passwordInput
                    //Si no se encontró en clientes, intenta con el listado de trabajadores/profesionales.
                );

                if (prof) {
                    localStorage.setItem("perfilTrabajador", JSON.stringify(prof));
                    //window.location.href = "./gestorTrabajador.html"; //redirige a gestorTrabajador con sus campos en memoria
                    window.location.href = "./Home.html"; //redirige al home
                    return;
                    //Lo guarda como perfilTrabajador y lo redirige al panel de gestión de trabajador.
                }

                // Si no se encontró en ninguno
                alert("⚠️ Usuario o contraseña incorrectos.");//Si no se encontró en ningún JSON, se avisa al usuario.

            } catch (error) {
                console.error("Error en login:", error);
                alert("Error al intentar iniciar sesión.");
            }//Captura cualquier error durante la ejecución del fetch o conversión .json().
        });
    }
});


