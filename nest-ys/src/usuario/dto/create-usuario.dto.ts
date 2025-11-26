import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: "El usuario es obligatorio" })
  @Length(4, 50, { message: "El usuario debe tener entre 4 y 50 caracteres" })
  usuario: string;

  @IsString()
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @Length(8, 100, {
    message: "La contraseña debe tener entre 8 y 100 caracteres",
  })
  contraseña: string;
}
