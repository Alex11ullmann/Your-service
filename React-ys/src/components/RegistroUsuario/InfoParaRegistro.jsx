
export const infoParaRegistro = [
    {
      id: "usuario",
      type: "text",
      name: "usuario",
      placeholder: "Usuario",
      maxLength: 12,
      minLength: 6,
      required: true,
      label: "Usuario",
      helperText: "Debe contener 1 letra mayuscula, letras minusculas y números. Min 6 - Max 12. Ej: Jose123"
    },
    {
      id: "nombresYApellidos",
      type: "text",
      name: "nombresYApellidos",
      placeholder: "Nombres y Apellidos",
      maxLength: 25,
      minLength: 6,
      required: true,
      label: "Nombres y Apellidos",
      helperText: "Debe contener 1 letra mayuscula, solo 1 espacio entre palabras y letras minusculas. Min 6 - Max 25. Ej: Jose Perez"
    },
    {
      id: "password",
      type: "password",
      name: "password",
      placeholder: "Contraseña",
      maxLength: 20,
      minLength: 6,
      required: true,
      label: "Contraseña",
      helperText: "Debe contener 1 letra mayuscula, letras minusculas y numeros. Min 6 - Max 25. Ej: Usuario123"
    },
    {
      id: "repPassword",
      type: "password",
      name: "repPassword",
      placeholder: "Repetir Contraseña",
      maxLength: 20,
      minLength: 6,
      required: true,
      label: "Rep.Contraseña",
      helperText: "Repita la contraseña, debe ser igual a la anterior."
    },
    {
      id: "localidad",
      type: "text",
      name: "localidad",
      placeholder: "Localidad",
      maxLength: 20,
      minLength: 4,
      required: true,
      label: "Localidad",
      helperText: "Debe contener 1 letra mayuscula y letras minusculas. Min 4 - Max 20. Ej: Olavarria"
    },
    {
      id: "direccion",
      type: "text",
      name: "direccion",
      placeholder: "Direccion",
      maxLength: 20,
      minLength: 4,
      required: true,
      label: "Direccion",
      helperText: "Debe contener 1 letra mayuscula, letras minusculas y números. Min 4 - Max 20. Ej: Lavalle123"
    },
    {
      id: "telefono",
      type: "text",
      name: "telefono",
      placeholder: "Telefono",
      maxLength: 10,
      minLength: 8,
      required: true,
      label: "Telefono",
      helperText: "Solo se permiten numeros. Min 8 - Max 10. Ej: 2284121212"
    },
    {
      id: "dni",
      type: "text",
      name: "dni",
      placeholder: "DNI",
      maxLength: 8,
      minLength: 7,
      required: true,
      label: "D.N.I",
      helperText: "Solo se permiten numeros. Min 7 - Max 8. Ej: 30111222"
    },
    {
      id: "email",
      type: "email",
      name: "email",
      placeholder: "Email",
      maxLength: 30,
      minLength: 7,
      required: true,
      label: "Email",
      helperText: "Ingrese su Email. Min 7 - Max 30. Ej: Yourservice@gmail.com"
    }
  ];
  