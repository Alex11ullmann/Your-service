/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajadorOficio } from './entities/trabajador-oficio.entity';
import { TrabajadorOficioService } from './trabajador-oficio.service';
import { TrabajadorOficioController } from './trabajador-oficio.controller';
import { Perfil } from '../perfil/entities/perfil.entity';
import { Oficio } from '../oficio/entities/oficio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrabajadorOficio, Perfil, Oficio])],
  controllers: [TrabajadorOficioController],
  providers: [TrabajadorOficioService],
})
export class TrabajadorOficioModule {}
