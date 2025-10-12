
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
      helperText: "Solo se permiten letras minusculas, mayusculas y números."
    },
    {
      id: "password",
      type: "password",
      name: "password",
      placeholder: "Password",
      maxLength: 20,
      minLength: 6,
      required: true,
      label: "Contraseña",
      helperText: "Solo se permiten letras minusculas, mayusculas y números."
    },
    {
      id: "repPassword",
      type: "password",
      name: "repPassword",
      placeholder: "Repetir Password",
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
      helperText: "Solo se permiten letras minusculas y mayusculas. Ej: Olavarria"
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
      helperText: "Solo se permiten letras minusculas, mayusculas y números. Ej: Lavalle123"
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
      helperText: "Solo se permiten numeros, sin puntos, ni comas. Ej: 2284121212"
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
      helperText: "Solo se permiten numeros, sin puntos, ni comas. Ej: 30123123"
    },
    {
      id: "email",
      type: "email",
      name: "email",
      placeholder: "email@Yourservice",
      required: true,
      label: "Email",
      helperText: null
    }
  ];
  