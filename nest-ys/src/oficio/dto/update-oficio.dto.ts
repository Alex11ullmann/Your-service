/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateOficioDto } from './create-oficio.dto';

export class UpdateOficioDto extends PartialType(CreateOficioDto) {}
