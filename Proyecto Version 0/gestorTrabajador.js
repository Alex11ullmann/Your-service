window.addEventListener("DOMContentLoaded", () => {//Espera que el DOM esté completamente cargado antes de ejecutar.
    // Obtener datos del trabajador desde localStorage
    const perfil = JSON.parse(localStorage.getItem("perfilTrabajador"));
    console.log("Perfil cargado:", perfil);
    //Recupera el objeto perfilTrabajador del localStorage. Lo convierte desde JSON a un objeto JS.

    if (!perfil) {
        alert("Debe iniciar sesión");
        window.location.href = "./LogIn.html";
        return;//Si no encuentra el perfil, redirige al usuario a la página de login.
    }

    //Mostrar foto de perfil
    const img = document.createElement("img");
    img.src = perfil.imagen;
    img.style.width= "25vw";
    img.style.height= "25vw";
    img.style.borderRadius= "50%";
    img.style.objectFit="cover";
    document.getElementById("fotoPerfil").appendChild(img);//Crea una imagen circular con el link guardado y la muestra en el contenedor #fotoPerfil.

    // Mostrar los datos en los elementos <h3> y <h4>
    document.querySelector(".info-perfil h3:nth-child(1)").innerText = `Usuario: ${perfil.usuario}`;
    document.querySelector(".info-perfil h3:nth-child(2)").innerText = `DNI: ${perfil.dni}`;
    //Inserta los valores del usuario y DNI en los primeros dos elementos <h3> de la sección info-perfil.

    const campos = document.querySelectorAll(".modificar");

    // Asignar valores actuales a los inputs
    campos[0].querySelector("input").value = perfil.password;
    campos[1].querySelector("input").value = perfil.localidad;
    campos[2].querySelector("input").value = perfil.direccion;
    campos[3].querySelector("input").value = perfil.email;
    campos[4].querySelector("input").value = perfil.telefono;
//Recupera los inputs que están en contenedores .modificar y les coloca los datos actuales del perfil.

    // Botón GUARDAR CAMBIOS ( id="guardarCambios")
    const btnGuardar = document.getElementById("guardarCambios");
    if (btnGuardar) {
        btnGuardar.addEventListener("click", () => {
            perfil.password  = campos[0].querySelector("input").value.trim();
            perfil.localidad = campos[1].querySelector("input").value.trim();
            perfil.direccion = campos[2].querySelector("input").value.trim();
            perfil.email     = campos[3].querySelector("input").value.trim();
            perfil.telefono  = campos[4].querySelector("input").value.trim();
            localStorage.setItem("perfilTrabajador", JSON.stringify(perfil));
            mostrarMensaje("👍Cambios guardados(Simulacion)👍",perfil);
        });
        //Al hacer clic en "Guardar cambios", actualiza los campos en el objeto perfil y lo vuelve a guardar.
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
            <div><strong>Contrase;a:</strong> ${perfil.password}</div>
            <div><strong>Localidad:</strong>  ${perfil.localidad}</div>
            <div><strong>Dirección:</strong>  ${perfil.direccion}</div>
            <div><strong>Email:</strong>      ${perfil.email}</div>
            <div><strong>Telefono:</strong>   ${perfil.telefono}</div>
        `;

    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3500);//Crea una mini notificación visual que muestra los datos modificados, desaparece luego de 3.5 segundos.
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
            }//Compara la contraseña ingresada con la actual. Si coincide y el usuario confirma, elimina la cuenta simulando una baja.
        });
    }

    // Segmento para Mostrar Fotos de sus trabajos
    const contenedorImagenes = document.getElementById("contenedor");
        if (perfil.fotos && Array.isArray(perfil.fotos)) {
            perfil.fotos.forEach((fotoUrl, index) => {
                const div = document.createElement("div");

                div.innerHTML = `
                    <img src="${fotoUrl}" alt="Foto ${index + 1}">
                    <span class="lapiz1">✏️</span>
                    <span class="lapiz1">🗑️</span>
                `;

                contenedorImagenes.appendChild(div);//Recorre las imágenes guardadas en perfil.fotos y las muestra en el contenedor #contenedor.
            });
        }

    // Segmento para Mostrar Video de sus trabajos
    const contenedorVideo = document.getElementById("contenedorVideo");
    const inputNuevaUrl = document.querySelector(".inputt"); //input modificar url
    const btnGuardarUrl = document.getElementById("nuevaUrl");// boton confirmar nueva url

      if (perfil?.videoUrl) {
        // Convertir el enlace de YouTube en un embed válido
        const urlYouTube = perfil.videoUrl.replace("watch?v=", "embed/");

        const iframe = document.createElement("iframe");
        iframe.width = "100%";
        iframe.height = "315";
        iframe.src = urlYouTube;
        iframe.title = "Video del trabajador";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        contenedorVideo.appendChild(iframe);
        inputNuevaUrl.value = perfil.videoUrl;
        //Convierte un link estándar de YouTube en un link incrustado (embed). Muestra el video en un <iframe>. También coloca el link original en un campo para poder editarlo.
        }

        // Segmento para modificar la URL del video
        btnGuardarUrl.addEventListener("click", () => {
            const nuevaUrl = inputNuevaUrl.value.trim();

        if (nuevaUrl !== "") {
            perfil.videoUrl = nuevaUrl;
            // Guardar nuevamente el perfil actualizado en localStorage
            localStorage.setItem("perfilTrabajador", JSON.stringify(perfil));
            
            // Limpiar el contenedor anterior y volver a insertar el nuevo iframe
            contenedorVideo.innerHTML = "";

            const urlYouTube = nuevaUrl.replace("watch?v=", "embed/");
            const iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "315";
            iframe.src = urlYouTube;
            iframe.title = "Video del trabajador";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            contenedorVideo.appendChild(iframe);

            inputNuevaUrl.value = ""; // Limpiar el input 
        } else {
            alert("Ingrese una URL válida.");
        } 
    });//Reemplaza la URL del video, actualiza el iframe y guarda el perfil actualizado.



    //Ver-Modificar Texto de descripcion y referencia
    const textareaDescripcion = document.getElementById("textareaDescripcion");
    const inputReferencia = document.getElementById("inputReferencia");
    const btnGuardarDescripcion = document.getElementById("btnGuardarDescripcion");

    // Cargar datos si existen
    if (perfil.descripcion) textareaDescripcion.value = perfil.descripcion;
    if (perfil.referencia) inputReferencia.value = perfil.referencia;//Carga los textos si ya existen en localStorage.

    // Evento para guardar descripción y referencia
    btnGuardarDescripcion.addEventListener("click", () => {
        const nuevaDesc = textareaDescripcion.value.trim();
        const nuevaRef = inputReferencia.value.trim();

        if (nuevaDesc.length < 20) {
             alert("✍️ La descripción debe tener al menos 20 caracteres.");
             return;
        }

        perfil.descripcion = nuevaDesc;
        perfil.referencia = nuevaRef;

        localStorage.setItem("perfilTrabajador", JSON.stringify(perfil));
        mensajeDescripYReferencia ("👍Descripción y Referencia actualizada con éxito", perfil);
    });
     
    function mensajeDescripYReferencia(texto, perfil) {
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
        `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3500);
    }
    
});