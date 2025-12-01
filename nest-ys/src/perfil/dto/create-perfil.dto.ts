/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 25, { message: "El campo Nombre y Apellido debe tener entre 6 y 25 caracteres" })
  nombreyapellido: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20, { message: "El campo Localidad debe tener entre 4 y 20 caracteres" })
  localidad: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20, { message: "El campo Direccion debe tener entre 4 y 20 caracteres" })
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 10, { message: "El campo Telefono debe tener entre 8 y 10 dígitos." })
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 8, { message: "El campo DNI debe tener entre 7 y 8 dígitos." })
  dni: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(7, 30, { message: "El campo Email debe tener entre 7 y 30 caracteres" })
  email: string;

  @IsBoolean()
  estrabajador: boolean;

  @IsInt()
  @Type(() => Number)
  id_usuarios: number;
}
