"use strict";


// Seccion agregar imagenes

let btnagregarimg = document.getElementById ("btnagregarimg");
let contenedorCarrusel = document.getElementById("contenedorCarrusel");
let imagenTrabajador = document.getElementById("imagenTrabajador");
let btneliminarimg = document.getElementById("btneliminarimg");
let imagenSeleccionada = null; 

btnagregarimg.addEventListener("change", function(event) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file) {
            const reader = new FileReader();

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

                contenedorCarrusel.appendChild(imgElement);
            };

            reader.readAsDataURL(file);
        }
    }
});




btneliminarimg.addEventListener("click", function () {
    if (imagenSeleccionada) {
        contenedorCarrusel.removeChild(imagenSeleccionada);
        imagenSeleccionada = null; // Limpiar selección
        imagenTrabajador.src = "./Imgdeperfiltrab/Photograph.jpg"; // Opcional: limpiar imagen de perfil si la eliminas
    } else {
        alert("Selecciona una imagen primero para eliminar.");
    }
});