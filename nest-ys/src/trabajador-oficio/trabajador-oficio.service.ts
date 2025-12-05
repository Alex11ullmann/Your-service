/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrabajadorOficio } from './entities/trabajador-oficio.entity';
import { Perfil } from '../perfil/entities/perfil.entity';
import { Oficio } from '../oficio/entities/oficio.entity';

@Injectable()
export class TrabajadorOficioService {
  constructor(
    @InjectRepository(TrabajadorOficio)
    private readonly trabajoRepo: Repository<TrabajadorOficio>,
    @InjectRepository(Perfil)
    private readonly perfilRepo: Repository<Perfil>,
    @InjectRepository(Oficio)
    private readonly oficioRepo: Repository<Oficio>,
  ) { }

  async assign(id_perfiles: number, id_oficios: number) {
    const perfil = await this.perfilRepo.findOne({ where: { id_perfiles } });
    if (!perfil) throw new NotFoundException('Perfil no encontrado');

    const oficio = await this.oficioRepo.findOne({ where: { id_oficios } });
    if (!oficio) throw new NotFoundException('Oficio no encontrado');

    const existente = await this.trabajoRepo.findOne({
      where: { perfil: { id_perfiles }, oficio: { id_oficios } },
    });

    if (existente) {
      return existente;
    }
    const nuevo = this.trabajoRepo.create({ perfil, oficio });
    return await this.trabajoRepo.save(nuevo);
  }

  async delete(id_perfiles: number, id_oficios: number) {
  const relacion = await this.trabajoRepo.findOne({
    where: {
      perfil: { id_perfiles },
      oficio: { id_oficios },
    },
  });

  if (!relacion) {
    throw new NotFoundException('Relación no encontrada');
  }

  await this.trabajoRepo.delete({
    perfil: { id_perfiles },
    oficio: { id_oficios },
  });

  return { message: 'Relación eliminada correctamente' };
}


  async getOficios(id_perfiles: number) {
    const perfil = await this.perfilRepo.findOne({
      where: { id_perfiles },
      relations: ['oficios', 'oficios.oficio'],
    });

    if (!perfil) throw new NotFoundException('Perfil no encontrado');

    return perfil.oficios.map((t) => t.oficio);
  }

  async getAll() {
    try {
      return await this.trabajoRepo.find({
        relations: ['perfil', 'oficio'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener todas las asignaciones: ' + error.message,
      );
    }
  }
}
