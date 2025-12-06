/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilDto } from './create-perfil.dto';
import { IsOptional, IsString, Length } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {
    @IsString()
    @IsOptional()
    @Length(0, 600, { message: "El campo Sobre Mi debe tener como máximo 600 caracteres" })
    descripcion?: string;
}
