window.addEventListener("DOMContentLoaded", () => {
    // Obtener datos del trabajador desde localStorage
    const perfil = JSON.parse(localStorage.getItem("perfilUsuario"));

    if (!perfil) {
        alert("Debe iniciar sesión");
        window.location.href = "./LogIn.html";
        return;
    }

    //Mostrar foto de perfil
    const img = document.createElement("img");
    img.src = perfil.imagen;
    img.style.width= "25vw";
    img.style.height= "25vw";
    img.style.borderRadius= "50%";
    img.style.objectFit="cover";
    document.getElementById("fotoPerfil").appendChild(img);

    // Mostrar los datos en los elementos <h3> y <h4>
    document.querySelector(".info-perfil h3:nth-child(1)").innerText = `Usuario: ${perfil.usuario}`;
    document.querySelector(".info-perfil h3:nth-child(2)").innerText = `DNI: ${perfil.dni}`;

    const campos = document.querySelectorAll(".modificar");

    // Asignar valores actuales a los inputs
    campos[0].querySelector("input").value = perfil.password;
    campos[1].querySelector("input").value = perfil.localidad;
    campos[2].querySelector("input").value = perfil.direccion;
    campos[3].querySelector("input").value = perfil.email;
    campos[4].querySelector("input").value = perfil.telefono;

    // Botón GUARDAR CAMBIOS ( id="guardarCambios")
    const btnGuardar = document.getElementById("guardarCambios");
    if (btnGuardar) {
        btnGuardar.addEventListener("click", () => {
            perfil.password  = campos[0].querySelector("input").value.trim();
            perfil.localidad = campos[1].querySelector("input").value.trim();
            perfil.direccion = campos[2].querySelector("input").value.trim();
            perfil.email     = campos[3].querySelector("input").value.trim();
            perfil.telefono  = campos[4].querySelector("input").value.trim();
            localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
            mostrarMensaje("👍Cambios guardados(Simulacion)👍",perfil);
        });
    }

    // Mostrar alerta flotante
   function mostrarMensaje(texto, perfil) {
    const div = document.createElement("div");

        // Estilos de la card
        div.style.position = "fixed";
        div.style.bottom = "5vw";
        div.style.right = "5vw";
        div.style.background = "#ffffff";
        div.style.color = "#333";
        div.style.padding = "16px";
        div.style.borderRadius = "12px";
        div.style.boxShadow = "0 8px 16px rgba(0,0,0,0.25)";
        div.style.zIndex = "9999"; //muestra encima del html
        div.style.maxWidth = "300px";

        // Contenido estructurado
        div.innerHTML = `
            <div style="font-weight: bold; font-size: 16px; color: #28a745; margin-bottom: 8px;">
                ${texto}
            </div>
            <div><strong>Contraseña:</strong> ${perfil.password}</div>
            <div><strong>Localidad:</strong> ${perfil.localidad}</div>
            <div><strong>Dirección:</strong> ${perfil.direccion}</div>
            <div><strong>Email    :</strong> ${perfil.email}</div>
            <div><strong>Telefono :</strong> ${perfil.telefono}</div>
        `;

    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3500);
}

    // Eliminar cuenta con verificación de contraseña
    const btnEliminar = document.getElementById("btnEliminarCuenta");
    const inputEliminar = document.getElementById("inputEliminarPass");

    if (btnEliminar && inputEliminar) {
        btnEliminar.addEventListener("click", () => {
            const passIngresada = inputEliminar.value.trim();

            if (passIngresada === "") {
                alert("Ingrese su contraseña para confirmar");
                return;
            }

            if (passIngresada !== perfil.password) {
                alert("⛔ Contraseña incorrecta. No se puede eliminar la cuenta.⛔");
                return;
            }

            const confirmar = confirm("¿Estás seguro de que querés eliminar tu cuenta?🤔 Esta acción no se puede deshacer.");

            if (confirmar) {
                localStorage.removeItem("perfilTrabajador");
                alert("🗑️ Tu cuenta fue eliminada (modo simulación)");
                window.location.href = "./LogIn.html";
            }
        });
    }
});