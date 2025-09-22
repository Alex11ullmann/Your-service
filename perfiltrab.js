"use strict";//"use strict": activa el modo estricto para evitar errores silenciosos. 
window.addEventListener("DOMContentLoaded", () => {//Se ejecuta cuando todo el DOM esté cargado.
    // Obtener datos del trabajador desde localStorage
    const perfil = JSON.parse(localStorage.getItem("perfilTrabajador"));
    console.log("Perfil cargado:", perfil);
//Obtiene el perfil del trabajador desde localStorage. Si no tiene el campo fotos, lo inicializa como un array vacío.
    if (!perfil.fotos) {
        perfil.fotos = []; // creamos un arreglo para pushear imagenes. // crea un array vacío si no hay fotos
    }

    // Seccion agregar imagenes

    let btnagregarimg = document.getElementById ("btnagregarimg");
    let contenedorCarrusel = document.getElementById("contenedorCarrusel");
    let imagenTrabajador = document.getElementById("imagenTrabajador");
    let imagenSeleccionada = null; 
    //Captura los elementos clave del DOM y prepara una variable para rastrear qué imagen está seleccionada.

    // Recargar imágenes permanente, para que no desaparezcan
    perfil.fotos.forEach(fotos => {
        const imgElement = document.createElement("img");
        imgElement.src = fotos;
        imgElement.style.maxWidth = "200px";
        imgElement.style.marginRight = "10px";
        imgElement.style.display = "inline-block";

        imgElement.addEventListener("click", function () {
            imagenTrabajador.src = fotos;
            imagenSeleccionada = imgElement;
        });

        contenedorCarrusel.appendChild(imgElement);
    });
    //Recorre el array perfil.fotos y crea una imagen para cada una. Al hacer clic en una imagen: Se muestra como imagen principal (imagenTrabajador). Se guarda como imagenSeleccionada para posibles acciones posteriores.

    btnagregarimg.addEventListener("change", function (event) {
    const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const reader = new FileReader();//Al seleccionar imágenes desde el input, se recorren con FileReader.
                reader.onload = function(e) {
                    const imgElement = document.createElement("img");
                    imgElement.src = e.target.result;
                    imgElement.style.maxWidth = "200px";
                    imgElement.style.marginRight = "10px";
                    imgElement.style.display = "inline-block";

                    // 🔵 Cuando se hace clic en una imagen del carrusel
                    imgElement.addEventListener("click", function() {
                        imagenTrabajador.src = e.target.result;
                        imagenSeleccionada = imgElement; // Guardar referencia para eliminar después
                    });
                    // Guardar en el array imagenes
                    perfil.fotos.push(e.target.result);
                    localStorage.setItem("perfilTrabajador", JSON.stringify(perfil));
                    contenedorCarrusel.appendChild(imgElement);
                    
                };
                reader.readAsDataURL(file);
                //Convierte la imagen seleccionada en base64. La muestra en el carrusel. La guarda en perfil.fotos. Actualiza el localStorage.
            }
        }
    });


    let btneliminarimg = document.getElementById("btneliminarimg");
    
    if (btneliminarimg) {
        btneliminarimg.addEventListener("click", function () {
        if (imagenSeleccionada) {
            contenedorCarrusel.removeChild(imagenSeleccionada);
            imagenSeleccionada = null; // Limpiar selección
            imagenTrabajador.src = "./Imgdeperfiltrab/Photograph.jpg"; // Opcional: limpiar imagen de perfil si la eliminas
        } else {
            alert("Selecciona una imagen primero para eliminar.");
        }
        });
        //Si hay una imagen seleccionada, se elimina del carrusel. Si no hay, se muestra una alerta. Nota: no se elimina del array perfil.fotos, solo del DOM.
    }


    // Se asigna funcion para guardar descripcion 
    document.getElementById("btnagregardescripcion").addEventListener("click", function () {
    const texto = document.getElementById("textareaqs").value.trim();
        if (texto.length < 20) {// 
            alert("La descripción debe tener al menos 20 caracteres.");
            return;
        }
        if (texto.length > 600) {
            alert("La descripción no puede superar los 600 caracteres.");
            return;
        }
        perfil.descripcion = texto;
        localStorage.setItem("perfilTrabajador", JSON.stringify(perfil));
        alert("Se guardo correctamente");
        //Se validan los límites de la descripción (mínimo 20, máximo 600 caracteres). Se guarda la descripción dentro del objeto perfil. Se actualiza el localStorage.
    });

    // si el usuario agrego descripcion la Mostramos
    if (perfil.descripcion) {
        document.getElementById("textareaqs").value = perfil.descripcion;
        //Al cargar la página, si hay una descripción, se muestra automáticamente en el textarea.
    }

    // Guardar opciones de trabajo (checkboxes)/////////////////////////////////////////////
  const opciones = [
    { id: "checkbox1", key: "certificadoAltura", label: "label1" },
    { id: "checkbox2", key: "trabajaSolo", label: "label2" },
    { id: "checkbox4", key: "servicio24hs", label: "label3" },
    { id: "checkbox5", key: "finesDeSemana", label: "label5" },
    { id: "checkbox6", key: "feriados", label: "label6" }
  ];

  opciones.forEach(({ id, key, label }) => {
    perfil[key] = perfil[key] ?? false;

    const checkbox = document.getElementById(id);
    const textoLabel = document.getElementById(label);

    if (checkbox) {
      checkbox.checked = perfil[key];
      if (textoLabel) textoLabel.textContent = checkbox.checked ? "Si" : "No";

      checkbox.addEventListener("change", () => {
        perfil[key] = checkbox.checked;
        localStorage.setItem("perfilTrabajador", JSON.stringify(perfil));
        if (textoLabel) textoLabel.textContent = checkbox.checked ? "Si" : "No";
      });
    }
  });
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Se Redirigen cambios y registro en memoria a gestorTrabajador
    document.getElementById("botonguardar").addEventListener("click", () => {
        window.location.href = "./gestorTrabajador.html";
        //Redirige a la pantalla de gestor de trabajador (como paso siguiente del flujo de registro o edición).
    });

});
