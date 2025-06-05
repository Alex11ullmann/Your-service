window.addEventListener("DOMContentLoaded", () => {
    const campos = [
        //Seccion LOGIN
        { inputId: "usuario", mensajeId: "mensajeUsuario" },
        { inputId: "password", mensajeId: "mensajePassword" },
        //Seccion REGISTRO
        { inputId: "repPassword" },
        { inputId: "direccion" }
    ];

    const caracteres = /^[A-Za-z0-9]*$/;

    //Funcion para validad que no sean caracteres especiales
    campos.forEach(({ inputId, mensajeId }) => {
        const input = document.getElementById(inputId);
        const mensaje = document.getElementById(mensajeId);

        input.addEventListener("input", () => {
            if (!caracteres.test(input.value)) {
                input.value = input.value.replace(/[^A-Za-z0-9]/g, "");
                mensaje.style.display = "block";
            } else {
                mensaje.style.display = "none";
            }
        });
    });

    

    const camposSinNumeros = [
    { inputId: "localidad" }
    ];

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]*$/;

    camposSinNumeros.forEach(({ inputId }) => {
        const input = document.getElementById(inputId);

        input.addEventListener("input", () => {
            if (!soloLetras.test(input.value)) {
                input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ]/g, "");
            }
        });
    });


    const camposNumeros = [
    { inputId: "telefono"},
    { inputId: "dni"}
    ];

    const soloNumeros = /^[0-9]*$/;

    camposNumeros.forEach(({ inputId }) => {
        const input = document.getElementById(inputId);

        input.addEventListener("input", () => {
            if (!soloNumeros.test(input.value)) {
                input.value = input.value.replace(/[^0-9]/g, "");
            }
        });
    });

    


});
