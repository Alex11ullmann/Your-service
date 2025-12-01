import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilDto } from './create-perfil.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
