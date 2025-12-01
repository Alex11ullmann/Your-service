/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Oficio } from '../oficio/entities/oficio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfil, Usuario, Oficio])],
  controllers: [PerfilController],
  providers: [PerfilService],
})
export class PerfilModule {}
