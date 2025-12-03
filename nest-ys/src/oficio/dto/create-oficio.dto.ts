/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOficioDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 40, { message: "El campo Nombre del Oficio debe tener entre 4 y 20 caracteres" })
  nombre_oficio: string;
}
