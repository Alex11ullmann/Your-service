export const regex = {
    alfanumerico: /^[a-zA-Z0-9]+$/,
    letras: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    numeros: /^[0-9]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export function validarCampo(input, mensaje, tipo = "alfanumerico", minLength = 5) {
    const valor = input.value.trim();
    const esValido = valor.length >= minLength && regex[tipo].test(valor);

    mensaje.textContent = esValido
        ? ""
        : `⚠️ Campo inválido. Debe tener al menos ${minLength} caracteres y contener solo ${tipo}.`;
    mensaje.hidden = esValido;
    input.classList.toggle("error", !esValido);

    return esValido;
}

export function validarIgualdad(input1, input2, mensaje) {
    const iguales = input1.value === input2.value;
    mensaje.textContent = iguales ? "" : "⚠️ Las contraseñas no coinciden.";
    mensaje.hidden = iguales;
    input2.classList.toggle("error", !iguales);
    return iguales;
}
