"use Strict";//Activa el modo estricto de JavaScript para evitar errores silenciosos, como declarar variables sin let, const o var.

let lista=document.getElementById("lista");//Obtiene el elemento <ul id="lista"> donde vas a insertar cada perfil como un <li> dinámicamente.

function crearListaDesdeJSON(data) {
  data.forEach(persona => {
    let li = document.createElement("li");//Define una función que toma un array de objetos (data) y crea un <li> por cada persona.

    const img = document.createElement("img");
    img.src = persona.imagen;
    img.style.width = "17vw";
    img.style.height = "17vw";
    //Crea una etiqueta <img> con la URL del trabajador. Le da tamaño fijo en unidades relativas (vw → viewport width).

    let text = document.createElement("p");
    text.textContent = `${persona.usuario} (${persona.oficio}): ${persona.calificacion}`;
    text.style.fontSize = "1.5vw";
    //Muestra nombre, oficio y calificación en un párrafo.

    let button = document.createElement("button");//Crea un botón con la clase "button" y el texto “Contactar”.
    button.setAttribute("class", "button");
    button.textContent = "Contactar";
    button.addEventListener("click", () => {//Al hacer clic, se ejecuta la función mostrarPerfilTrabajador enviando todos los datos de esa persona.
        mostrarPerfilTrabajador(
              persona.imagen,
              persona.usuario,
              persona.calificacion,
              persona.telefono,
              persona.localidad,
              persona.direccion,
              persona.dni,
              persona.oficio,
              persona.descripcion,
              persona.referencia,
              persona.fotos,
              persona.videoUrl
            );
    });

    li.appendChild(img);
    li.appendChild(text);
    li.appendChild(button);
    lista.appendChild(li);
    //Agrega imagen, texto y botón al <li>. Luego lo agrega al <ul id="lista">.
  });
}

function mostrarPerfilTrabajador(imagen, usuario, calificacion, telefono, localidad, direccion, dni, oficio, descripcion,referencia,fotos,videoUrl) {
const perfil = {
                  imagen,
                  usuario,
                  calificacion,
                  telefono,
                  localidad,
                  direccion,
                  dni,
                  oficio,
                  descripcion,
                  referencia,
                  fotos,
                  videoUrl
                };
  /* localStore lo utilizamos para guardar datos y llevarlo a Trabajador*/
  localStorage.setItem("perfilTrabajador", JSON.stringify(perfil));
  /*despues de guardar redirigimos a trabajador*/
  window.location.href = "trabajador.html";
  //Arma un objeto perfil con todos los datos. Lo guarda en localStorage para que trabajador.html lo pueda usar. Luego redirige automáticamente a esa página.
}

fetch("./Data/profecionales.json")
  .then(response => response.json()) /*traemos datos del json*/
  .then(data => {
    crearListaDesdeJSON(data); /*funcion para generar las cards*/
  })
  .catch(error => console.error("Error al cargar JSON:", error));

//Usa fetch para traer el archivo profecionales.json. Lo convierte en un objeto JS (.json()). Si se carga correctamente, llama a crearListaDesdeJSON() para construir la lista. Si hay error, lo muestra en consola.