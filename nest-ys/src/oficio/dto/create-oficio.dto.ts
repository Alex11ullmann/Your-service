import { IsOptional, IsString, Length } from 'class-validator';

export class CreateOficioDto {
  @IsString()
  @Length(6, 100)
  nombre_oficio: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  sobre_mi?: string;
}
