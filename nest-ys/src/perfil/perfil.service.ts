/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, ConflictException, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Perfil } from './entities/perfil.entity';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Oficio } from '../oficio/entities/oficio.entity';

@Injectable()
export class PerfilService {

  constructor(
    @InjectRepository(Perfil) private perfilRepo: Repository<Perfil>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Oficio) private oficioRepo: Repository<Oficio>,
  ) { }

  public async create(dto: CreatePerfilDto): Promise<Perfil> {
    try {
      const tel = await this.perfilRepo.findOne({ where: { telefono: dto.telefono } });
      if (tel) {
        throw new ConflictException('Teléfono ya existe');
      }
      const mail = await this.perfilRepo.findOne({ where: { email: dto.email } });
      if (mail) {
        throw new ConflictException('Email ya existe');
      }
      const usuario = await this.usuarioRepo.findOne({
        where: { id_usuarios: dto.id_usuarios },
      });
      if (!usuario) {
        throw new BadRequestException('Usuario no existe');
      }
      const oficio = await this.oficioRepo.findOne({
        where: { id_oficios: dto.id_oficios },
      });
      if (!oficio) {
        throw new BadRequestException('Oficio no existe');
      }
      const perfil = this.perfilRepo.create({ ...dto, usuario, oficio });
      return await this.perfilRepo.save(perfil);
    } catch (error: any) {
      if (error instanceof ConflictException) throw error;
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Error al crear el perfil: ' + (error.message ?? '')
      );
    }
  }

  public async findAll(): Promise<Perfil[]> {
    try {
      const criterio: FindManyOptions<Perfil> = {
        relations: ['usuario', 'oficio'],
      };
      return await this.perfilRepo.find(criterio);
    } catch (error: any) {
      throw new InternalServerErrorException(
        'Error al obtener los perfiles: ' + (error.message ?? '')
      );
    }
  }

  public async findOne(id_perfiles: number): Promise<Perfil> {
    try {
      const criterio: FindOneOptions<Perfil> = {
        where: { id_perfiles },
        relations: ['usuario', 'oficio'],
      };
      const perfil = await this.perfilRepo.findOne(criterio);
      if (!perfil) {
        throw new NotFoundException(`Perfil ${id_perfiles} no existe`);
      }
      return perfil;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error al buscar el perfil: ' + (error.message ?? '')
      );
    }
  }

  public async update(id_perfiles: number, dto: UpdatePerfilDto): Promise<Perfil> {
    try {
      const perfil = await this.findOne(id_perfiles);
      if (dto.id_usuarios) {
        const usuario = await this.usuarioRepo.findOne({
          where: { id_usuarios: dto.id_usuarios },
        });
        if (!usuario) {
          throw new BadRequestException('Usuario no existe');
        }
        (perfil as any).usuario = usuario;
      }
      if (dto.id_oficios) {
        const oficio = await this.oficioRepo.findOne({
          where: { id_oficios: dto.id_oficios },
        });
        if (!oficio) {
          throw new BadRequestException('Oficio no existe');
        }
        (perfil as any).oficio = oficio;
      }
      Object.assign(perfil, {
        nombreyapellido: dto.nombreyapellido ?? perfil.nombreyapellido,
        localidad: dto.localidad ?? perfil.localidad,
        direccion: dto.direccion ?? perfil.direccion,
        telefono: dto.telefono ?? perfil.telefono,
        dni: dto.dni ?? perfil.dni,
        email: dto.email ?? perfil.email,
        estrabajador: dto.estrabajador ?? perfil.estrabajador,
      });
      return await this.perfilRepo.save(perfil);
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof BadRequestException) throw error;
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El correo o teléfono ya está registrado');
      }
      throw new InternalServerErrorException(
        'Error al actualizar el perfil: ' + (error.message ?? '')
      );
    }
  }

  public async remove(id_perfiles: number): Promise<boolean> {
    try {
      const perfil = await this.findOne(id_perfiles);
      await this.perfilRepo.remove(perfil);
      return true;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al eliminar el perfil: ' + (error.message ?? '')
      );
    }
  }
}
