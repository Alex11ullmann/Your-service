"use strict";
window.addEventListener("DOMContentLoaded", () => {
    // Obtener datos del trabajador desde localStorage
    const perfil = JSON.parse(localStorage.getItem("perfilTrabajador"));
    console.log("Perfil cargado:", perfil);

    if (!perfil.fotos) {
        perfil.fotos = []; // creamos un arreglo para pushear imagenes.
    }

    // Seccion agregar imagenes

    let btnagregarimg = document.getElementById ("btnagregarimg");
    let contenedorCarrusel = document.getElementById("contenedorCarrusel");
    let imagenTrabajador = document.getElementById("imagenTrabajador");
    let imagenSeleccionada = null; 

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
                    // Guardar en el array imagenes
                    perfil.fotos.push(e.target.result);
                    localStorage.setItem("perfilTrabajador", JSON.stringify(perfil));
                    contenedorCarrusel.appendChild(imgElement);
                    
                };
                reader.readAsDataURL(file);
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
    });

    // si el usuario agrego descripcion la Mostramos
    if (perfil.descripcion) {
        document.getElementById("textareaqs").value = perfil.descripcion;
    }

    //Se Redirigen cambios y registro en memoria a gestorTrabajador
    document.getElementById("botonguardar").addEventListener("click", () => {
       window.location.href = "./gestorTrabajador.html";
    });

});
