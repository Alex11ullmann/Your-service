/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber } from 'class-validator';

export class RemoveOficioDto {
  @IsNumber()
  id_perfiles: number;

  @IsNumber()
  id_oficios: number;
}
