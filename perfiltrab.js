"use strict";

// Seccion agregar imagenes

let btnagregarimg = document.getElementById ("btnagregarimg");
let contenedorCarrusel = document.getElementById("contenedorCarrusel");
let imagenTrabajador = document.getElementById("imagenTrabajador");

btnagregarimg.addEventListener("change", function(event) {
    const files = event.target.files; // Obtiene la imagen seleccionada

    for (let i = 0; i < files.length; i++) {
        const file = files [i];

        if (file) {
            const reader = new FileReader(); 

            reader.onload = function(e) {
                const imgElement = document.createElement("img");
                imgElement.src = e.target.result; // Asigna la imagen al <img>
                imgElement.style.maxWidth = "200px";
                imgElement.style.marginRight = "10px";
                imgElement.style.display = "inline-block";

                // Evento para copiar la imagen al div "trabajador"
                imgElement.addEventListener("click", function() {
                    imagenTrabajador.src = e.target.result;
                });

                contenedorCarrusel.appendChild(imgElement);
            };
            reader.readAsDataURL(file); // Convierte la imagen a base64 para vista previa
        }
    }
});

// Seccion agregar descripcion

let botonquiensoy = document.getElementById ("botonquiensoy");
let textarea = document.getElementById("textareaqs");


botonquiensoy.addEventListener ("click", function () {
    const texto = textarea.value.trim(); // Obtiene el texto del textarea

    if (texto !== "" && texto.length > 20) {
        const contenido = document.createElement("p");
        contenido.textContent = texto;
        contenido.style.color = "gray";
        contenido.style.fontfamily = "'Calibri Light', Calibri, sans-serif";
        contenido.style.fontsize = "1vw";
        contenido.style.display = "block"; // Evita que afecte el diseño
        contenido.style.width = textarea.offsetWidth + "px"; // Mantiene el ancho del textarea
        contenido.style.height = textarea.offsetHeight + "px"; // Mantiene la altura del textarea
        botonquiensoy.style.display = "none";
        function formatearTexto(texto) {

            let palabras = texto.split(" "); // Divide el texto en palabras
            let nuevoTexto = "";
            
            palabras.forEach((palabra, index) => {
                nuevoTexto += palabra + " ";
                if ((index + 1) % 5 === 0) {
                    nuevoTexto += "<br>"; // Agrega un salto de línea cada 5 palabras
                }
            });
            return nuevoTexto;
        }

        textarea.replaceWith(contenido); // Reemplaza el textarea por el <a>
    }
});
