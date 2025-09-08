window.addEventListener("DOMContentLoaded", () => {
  //Se ejecuta cuando el DOM ya está completamente cargado y listo para manipular elementos.
  
  const perfil = JSON.parse(localStorage.getItem("perfilTrabajador"));
  //Recupera del localStorage la información guardada con la clave "perfilTrabajador". JSON.parse convierte el string a un objeto de JavaScript.

  if (perfil) { //Si se encontró el objeto, ejecuta el siguiente bloque.
    //Crea una imagen HTML. Le aplica estilos: tamaño proporcional, borde redondeado (circular), imagen ajustada.
    const img = document.createElement("img");
      img.src = perfil.imagen;
      img.style.width= "25vw";
      img.style.height= "25vw";
      img.style.borderRadius= "50%";
      img.style.objectFit="cover";
    
    document.getElementById("fotoPerfil").appendChild(img);//Inserta la imagen dentro del contenedor con id="fotoPerfil".
    //Asigna cada dato (usuario, oficio, calificación, etc.) al elemento HTML correspondiente. Se muestran como texto dentro de etiquetas con IDs específicas.
    document.getElementById("nombre").textContent = perfil.usuario;
    document.getElementById("oficio").textContent = `Oficio: ${perfil.oficio}`;
    document.getElementById("calificacion").textContent = `Calificación: ${perfil.calificacion}`;
    document.getElementById("telefono").textContent = `Teléfono: ${perfil.telefono}`;
    document.getElementById("localidad").textContent = `Localidad: ${perfil.localidad}`;
    document.getElementById("direccion").textContent = `Dirección: ${perfil.direccion}`;
    document.getElementById("email").textContent = `email: ${perfil.email}`;
    
    document.getElementById("descripcion").textContent = `Descripcion: ${perfil.descripcion}`;
    document.getElementById("referencia").textContent = `Referencias: ${perfil.referencia}`;
    //Agrega descripción personal y referencias a su perfil.
    

  } else {//Si no hay perfil en localStorage, muestra un mensaje de advertencia en toda la página.
    document.body.textContent = "No se encontraron datos del trabajador.";
  }

  // Segmento para Mostrar Fotos de sus trabajos
    const contenedor = document.getElementById("contenedorimg");//Verifica si perfil.fotos es un array válido.
      if (perfil.fotos && Array.isArray(perfil.fotos)) {
        perfil.fotos.forEach((fotoUrl, index) => {
          const div = document.createElement("div");
          div.innerHTML = `<img src="${fotoUrl}" alt="Foto ${index + 1}">`;
          contenedor.appendChild(div);
          //Por cada URL en el array de fotos: Crea un <div> que contiene una imagen. Inserta la imagen en el contenedor contenedorimg.
        });
      }

    // Segmento para Mostrar Video de sus trabajos
    const contenedorVideo = document.getElementById("contenedorVideo");//Verifica si hay una URL de video.
      if (perfil.videoUrl) {
        // Convertir el enlace de YouTube en un embed válido
        const urlYouTube = perfil.videoUrl.replace("watch?v=", "embed/");
        //Convierte un enlace estándar de YouTube en formato embed para incrustar.

        const iframe = document.createElement("iframe");
        // Configura atributos del iframe para video
        iframe.width = "100%";
        iframe.height = "315";
        iframe.src = urlYouTube;
        iframe.title = "Video del trabajador";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        contenedorVideo.appendChild(iframe);//Crea el <iframe> con el video y lo inserta en el contenedor correspondiente.
      }

});

//🧩 Resultado final:
//Este código transforma datos estáticos guardados localmente en una experiencia visual completa de perfil profesional. Si lo necesitás, también se puede complementar con funciones de edición o validación para mantenerlo siempre actualizado.