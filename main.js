"use Strict";

let lista=document.getElementById("lista");

const dirImagenes=  ["./ImgTrabj/juan.jfif", "./ImgTrabj/lucas.jfif",   "./ImgTrabj/alexis.jfif", "./ImgTrabj/pablo.jfif", "./ImgTrabj/pedro.jfif", "./ImgTrabj/maria.jfif",   "./ImgTrabj/jose.jfif",  "./ImgTrabj/mauricio.jfif",  "./ImgTrabj/agustina.jfif",  "./ImgTrabj/juana.jfif"];                                                                                                                      
const nombre=       ["Juan",        "Lucas",          "Alexis",        "Pablo",                  "Pedro",        "Maria",          "jose",         "Mauricio",         "Agustina",          "Juana"];
const calificacion= ["⭐⭐",       "⭐⭐⭐",       "⭐⭐⭐⭐",    "⭐⭐⭐⭐⭐",          "⭐⭐",         "⭐⭐⭐",        "⭐⭐",        "⭐⭐⭐",          "⭐⭐",            "⭐⭐⭐"];
const telefono    = [1111111,       22222222         ,3333333333       ,444444444444           ,55555555        ,666666666        ,7777777777     ,8888888888         ,999999999            ,100000000   ];

function crearLista (dirimagenes,arraynombre,arrayCalificacion,telefono){
    for(let i=0;i<arraynombre.length;i++){
        let li=document.createElement("li");

        let text = document.createElement("p");
        text.textContent = `${arraynombre[i]}: ${arrayCalificacion[i]}`;
        text.style.fontSize = "1.4vw"; // texto ajustable

        const img= document.createElement("img");
        img.src=dirimagenes[i];
        img.style.width = "17vw";    // altura para imagen
        img.style.height = "17vw";   // ancho para imagen
        
        let button=document.createElement("button");
            button.setAttribute("class","button");
            button.textContent = "Contactar";
            button.addEventListener('click', function() {
                    mostrarPerfilTrabajador(dirimagenes[i],arraynombre[i],arrayCalificacion[i],telefono[i]);
                }); //llama la funcion para mostrar ltrabajador
                    
        li.appendChild(img);//asigno la imagen dentro de la lista.
        li.appendChild(text);//asigno el texto(Nombre, calificacion) a la lista
        li.appendChild(button);
        lista.appendChild(li);//Creolista con imagen, texto y el boton.
    }
}

function mostrarPerfilTrabajador(imagen,nombre,calificacion,telefono){
      alert(
            " Perfil del Trabajador:\n" +
            " Nombre: " + nombre + "\n" +
            " Calificación: " + calificacion + "\n" +
            " Imagen: " + imagen + "\n" +
            " Celular: " + telefono
            );
}

crearLista(dirImagenes,nombre,calificacion,telefono);

