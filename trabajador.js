
const perfil = JSON.parse(localStorage.getItem("perfilTrabajador"));

if (perfil) {
  const img = document.createElement("img");
  img.src = perfil.imagen;
    img.style.width= "20vw";
    img.style.height= "20vw";
    img.style.borderRadius= "50%";
    img.style.objectFit="cover";
  
  document.getElementById("fotoPerfil").appendChild(img);
  document.getElementById("nombre").textContent = perfil.nombre;
  document.getElementById("oficio").textContent = `Oficio: ${perfil.oficio}`;
  document.getElementById("calificacion").textContent = `Calificación: ${perfil.calificacion}`;
  document.getElementById("telefono").textContent = `Teléfono: ${perfil.telefono}`;
  document.getElementById("localidad").textContent = `Localidad: ${perfil.localidad}`;
  document.getElementById("direccion").textContent = `Dirección: ${perfil.direccion}`;
  document.getElementById("dni").textContent = `DNI: ${perfil.dni}`;
  document.getElementById("descripcion").textContent = `DNI: ${perfil.descripcion}`;
  document.getElementById("referencia").textContent = `DNI: ${perfil.referencia}`;

} else {
  document.body.textContent = "No se encontraron datos del trabajador.";
}