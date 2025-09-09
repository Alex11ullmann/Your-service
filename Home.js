document.addEventListener("DOMContentLoaded", () => {
    const perfilUsuario = JSON.parse(localStorage.getItem("perfilUsuario"));
    const perfilTrabajador = JSON.parse(localStorage.getItem("perfilTrabajador"));

    const userMenu = document.getElementById("userMenu");
    const loginLink = document.getElementById("loginLink");
    const userName = document.getElementById("userName");

    if (perfilUsuario || perfilTrabajador) {
        // Mostrar menú usuario
        loginLink.style.display = "none";
        userMenu.style.display = "inline-block";

        const perfil = perfilUsuario || perfilTrabajador;
        userName.textContent = perfil.usuario; // o `${perfil.nombre} ${perfil.apellido}` si lo guardás

        // Logout
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("perfilUsuario");
            localStorage.removeItem("perfilTrabajador");
            window.location.href = "./Home.html";
        });
    } else {
        // Mostrar botón login
        userMenu.style.display = "none";
    }

});
