/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Oficio } from './entities/oficio.entity';
import { CreateOficioDto } from './dto/create-oficio.dto';
import { UpdateOficioDto } from './dto/update-oficio.dto';
import { oficiosSeed } from '../seeds/oficios.seed';

@Injectable()
export class OficioService {

  constructor(
    @InjectRepository(Oficio)
    private readonly oficioRepo: Repository<Oficio>,
  ) { }

  async onModuleInit() {
    const count = await this.oficioRepo.count();
    if (count === 0) {
      const oficios = oficiosSeed.map((nombre) =>
        this.oficioRepo.create({ nombre_oficio: nombre })
      );
      await this.oficioRepo.save(oficios);
    }
  }


  public async create(dto: CreateOficioDto): Promise<Oficio> {
    try {
      const nuevo = this.oficioRepo.create(dto);
      return await this.oficioRepo.save(nuevo);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El oficio ya existe');
      }
      throw new InternalServerErrorException('Error al crear el oficio');
    }
  }

  public async findAll(): Promise<Oficio[]> {
    try {
      const criterio: FindManyOptions<Oficio> = {
        relations: ['trabajadores'],
      };
      return await this.oficioRepo.find(criterio);
    } catch (error: any) {
      throw new InternalServerErrorException(
        'Error al obtener los oficios: ' + (error.message || '')
      );
    }
  }

  public async findOne(id_oficios: number): Promise<Oficio> {
    try {
      const criterio: FindOneOptions<Oficio> = {
        where: { id_oficios },
        relations: ['trabajadores'],
      };
      const oficio = await this.oficioRepo.findOne(criterio);
      if (!oficio) {
        throw new NotFoundException(`El oficio ${id_oficios} no existe`);
      }
      return oficio;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error al buscar el oficio: ' + (error.message || '')
      );
    }
  }

  public async update(id_oficios: number, dto: UpdateOficioDto): Promise<Oficio> {
    try {
      const oficio = await this.findOne(id_oficios);
      Object.assign(oficio, dto);
      return await this.oficioRepo.save(oficio);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Ya existe un oficio con estos datos');
      }
      throw new InternalServerErrorException(
        'Error al actualizar el oficio: ' + (error.message || '')
      );
    }
  }

  public async delete(id_oficios: number): Promise<boolean> {
    try {
      const oficio = await this.findOne(id_oficios);
      await this.oficioRepo.delete(oficio);
      return true;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al eliminar el oficio: ' + (error.message || '')
      );
    }
  }
}
