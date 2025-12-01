document.addEventListener("DOMContentLoaded", () => {
    const perfilUsuario = JSON.parse(localStorage.getItem("perfilUsuario"));
    const perfilTrabajador = JSON.parse(localStorage.getItem("perfilTrabajador"));
    const perfil = perfilUsuario || perfilTrabajador;

    const userMenu = document.getElementById("userMenu");
    const loginLink = document.getElementById("loginLink");
    const userName = document.getElementById("userName");
    const avatar = document.querySelector(".avatar");
    const perfilLink = document.getElementById("perfilLink");

    if (perfil) {
        // ✅ Mostrar nombre
        if (userName) {
            userName.textContent = perfil.usuario;
        }

        // ✅ Mostrar imagen
        if (avatar && perfil.imagen) {
            avatar.src = perfil.imagen;
        }

        // ✅ Mostrar menú
        if (loginLink) loginLink.style.display = "none";
        if (userMenu) userMenu.style.display = "inline-block";

        // ✅ Redirigir al perfil correcto
        if (perfilLink) {
            if (perfil.tipo === "trabajador") {
                perfilLink.href = "./gestorTrabajador.html";
            } else {
                perfilLink.href = "./gestorUsuario.html";
            }
        }

        // ✅ Logout
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("perfilUsuario");
                localStorage.removeItem("perfilTrabajador");
                window.location.href = "./Home.html";
            });
        }
    } else {
        if (userMenu) userMenu.style.display = "none";
    }
});
