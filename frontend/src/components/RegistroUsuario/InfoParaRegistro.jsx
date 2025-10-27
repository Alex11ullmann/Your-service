
export const infoParaRegistro = [
    {
      id: "Usuario",
      type: "text",
      name: "Usuario",
      placeholder: "Usuario",
      maxLength: 12,
      minLength: 6,
      required: true,
      label: "Usuario",
      helperText: "Solo se permiten letras minusculas, mayusculas y números."
    },
    {
      id: "Password",
      type: "password",
      name: "Password",
      placeholder: "Password",
      maxLength: 20,
      minLength: 6,
      required: true,
      label: "Contraseña",
      helperText: "Solo se permiten letras minusculas, mayusculas y números."
    },
    {
      id: "PepPassword",
      type: "password",
      name: "PepPassword",
      placeholder: "Repetir Password",
      maxLength: 20,
      minLength: 6,
      required: true,
      label: "Rep.Contraseña",
      helperText: "Repita la contraseña, debe ser igual a la anterior."
    },
    {
      id: "Localidad",
      type: "text",
      name: "Localidad",
      placeholder: "Localidad",
      maxLength: 20,
      minLength: 4,
      required: true,
      label: "Localidad",
      helperText: "Solo se permiten letras minusculas y mayusculas. Ej: Olavarria"
    },
    {
      id: "Direccion",
      type: "text",
      name: "Direccion",
      placeholder: "Direccion",
      maxLength: 20,
      minLength: 4,
      required: true,
      label: "Direccion",
      helperText: "Solo se permiten letras minusculas, mayusculas y números. Ej: Lavalle123"
    },
    {
      id: "Telefono",
      type: "text",
      name: "Telefono",
      placeholder: "Telefono",
      maxLength: 10,
      minLength: 8,
      required: true,
      label: "Telefono",
      helperText: "Solo se permiten numeros, sin puntos, ni comas. Ej: 2284121212"
    },
    {
      id: "Dni",
      type: "text",
      name: "Dni",
      placeholder: "DNI",
      maxLength: 8,
      minLength: 7,
      required: true,
      label: "D.N.I",
      helperText: "Solo se permiten numeros, sin puntos, ni comas. Ej: 30123123"
    },
    {
      id: "Email",
      type: "email",
      name: "Email",
      placeholder: "Email",
      maxLength: 30,
      minLength: 7,
      required: true,
      label: "Email",
      helperText: "Ingrese su Email. Ej: Yourservice@gmail.com"
    }
  ];
  