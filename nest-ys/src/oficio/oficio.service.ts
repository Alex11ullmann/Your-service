import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from "typeorm";
import { Oficio } from "./entities/oficio.entity";
import { CreateOficioDto } from "./dto/create-oficio.dto";
import { UpdateOficioDto } from "./dto/update-oficio.dto";

@Injectable()
export class OficioService {
  constructor(
    @InjectRepository( Oficio ) private oficioRepo: Repository < Oficio >,
  ) {}

  async create(dto: CreateOficioDto) {
    const nuevo = this.oficioRepo.create(dto);
    return this.oficioRepo.save( nuevo);
  }

  async findAll() {
    const criterio: FindManyOptions < Oficio> = { relations: [ "perfiles"] };
    return this.oficioRepo.find(criterio);
  }

  async findOne(id_oficios: number) {
    const criterio: FindOneOptions < Oficio> = {
      where: { id_oficios },
      relations: [ "perfiles"],
    };
    const oficio = await this.oficioRepo.findOne( criterio);
    if ( !oficio) {
      throw new HttpException(
        `Oficio ${ id_oficios} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }
    return oficio;
  }

  async update(id_oficios: number, dto: UpdateOficioDto) {
    const oficio = await this.findOne( id_oficios );
    Object.assign(oficio, dto);
    return this.oficioRepo.save( oficio);
  }

  async remove( id_oficios: number) {
    const oficio = await this.findOne( id_oficios);
    await this.oficioRepo.remove( oficio );
  }
}
