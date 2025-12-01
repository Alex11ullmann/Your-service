/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oficio } from './entities/oficio.entity';
import { OficioService } from './oficio.service';
import { OficioController } from './oficio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Oficio])],
  controllers: [OficioController],
  providers: [OficioService],
})
export class OficioModule {}
