window.addEventListener("DOMContentLoaded", () => {
  
const perfil = JSON.parse(localStorage.getItem("perfilTrabajador"));

  if (perfil) {
    const img = document.createElement("img");
      img.src = perfil.imagen;
      img.style.width= "25vw";
      img.style.height= "25vw";
      img.style.borderRadius= "50%";
      img.style.objectFit="cover";
    
    document.getElementById("fotoPerfil").appendChild(img);
    document.getElementById("nombre").textContent = perfil.usuario;
    document.getElementById("oficio").textContent = `Oficio: ${perfil.oficio}`;
    document.getElementById("calificacion").textContent = `Calificación: ${perfil.calificacion}`;
    document.getElementById("telefono").textContent = `Teléfono: ${perfil.telefono}`;
    document.getElementById("localidad").textContent = `Localidad: ${perfil.localidad}`;
    document.getElementById("direccion").textContent = `Dirección: ${perfil.direccion}`;
    document.getElementById("email").textContent = `email: ${perfil.email}`;
    
    document.getElementById("descripcion").textContent = `Descripcion: ${perfil.descripcion}`;
    document.getElementById("referencia").textContent = `Referencias: ${perfil.referencia}`;
    

  } else {
    document.body.textContent = "No se encontraron datos del trabajador.";
  }

  // Segmento para Mostrar Fotos de sus trabajos
    const contenedor = document.getElementById("contenedorimg");
      if (perfil.fotos && Array.isArray(perfil.fotos)) {
        perfil.fotos.forEach((fotoUrl, index) => {
          const div = document.createElement("div");
          div.innerHTML = `<img src="${fotoUrl}" alt="Foto ${index + 1}">`;
          contenedor.appendChild(div);
        });
      }

    // Segmento para Mostrar Video de sus trabajos
    const contenedorVideo = document.getElementById("contenedorVideo");
      if (perfil.videoUrl) {
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
      }

});