window.addEventListener("DOMContentLoaded", () => {
    const campos = [
        //Seccion LOGIN
        { inputId: "usuario", mensajeId: "mensajeUsuario" },
        { inputId: "password", mensajeId: "mensajePassword" },
    ];

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
                    window.location.href = "./gestorUsuario.html";// redirige a gestorUsuario con campos en Memoria
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
                    window.location.href = "./gestorTrabajador.html"; //redirige a gestorTrabajador con sus campos en memoria
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
