import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  nombreyapellido: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  localidad: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  telefono: string;

  @IsInt()
  @Length(8)
  dni: number;

  @IsEmail()
  email: string;

  @IsBoolean()
  estrabajador: boolean;

  @IsInt()
  id_usuarios: number;

  @IsInt()
  id_oficios: number;
}
