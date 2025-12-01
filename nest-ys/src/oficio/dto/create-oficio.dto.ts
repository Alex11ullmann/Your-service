/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateOficioDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 40, { message: "El campo Nombre del Oficio debe tener entre 4 y 20 caracteres" })
  nombre_oficio: string;

  @IsString()
  @IsOptional()
  @Length(20, 600, { message: "El campo Sobre Mi debe tener entre 20 y 600 caracteres" })
  sobre_mi?: string;
}
