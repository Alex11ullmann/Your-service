"use Strict";

let lista=document.getElementById("lista");

function crearListaDesdeJSON(data) {
  data.forEach(persona => {
    let li = document.createElement("li");

    const img = document.createElement("img");
    img.src = persona.imagen;
    img.style.width = "17vw";
    img.style.height = "17vw";

    let text = document.createElement("p");
    text.textContent = `${persona.nombre} (${persona.Oficio}): ${persona.calificacion}`;
    text.style.fontSize = "1.5vw";

    let button = document.createElement("button");
    button.setAttribute("class", "button");
    button.textContent = "Contactar";
    button.addEventListener("click", () => {
        mostrarPerfilTrabajador(
              persona.imagen,
              persona.nombre,
              persona.calificacion,
              persona.telefono,
              persona.localidad,
              persona.direccion,
              persona.dni,
              persona.Oficio
            );
    });

    li.appendChild(img);
    li.appendChild(text);
    li.appendChild(button);
    lista.appendChild(li);
  });
}

function mostrarPerfilTrabajador(imagen, nombre, calificacion, telefono, localidad, direccion, dni, oficio) {
  alert(`Nombre: ${nombre}
        Oficio: ${oficio}
        Calificación: ${calificacion}
        Teléfono: ${telefono}
        Localidad: ${localidad}
        Dirección: ${direccion}
        DNI: ${dni}`);
}

fetch("./Data/profecionales.json")
  .then(response => response.json())
  .then(data => {
    crearListaDesdeJSON(data);
  })
  .catch(error => console.error("Error al cargar JSON:", error));

  