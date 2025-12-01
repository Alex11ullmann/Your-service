/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber } from 'class-validator';

export class AssignOficioDto {
  @IsNumber()
  id_perfiles: number;

  @IsNumber()
  id_oficios: number;
}
