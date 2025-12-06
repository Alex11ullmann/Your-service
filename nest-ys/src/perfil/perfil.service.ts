/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Perfil } from './entities/perfil.entity';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private perfilRepo: Repository<Perfil>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) { }

  public async create(dto: CreatePerfilDto): Promise<Perfil> {
    try {
      const dni = await this.perfilRepo.findOne({
        where: { dni: dto.dni },
      });
      if (dni) throw new ConflictException('Dni ya existe');

      const mail = await this.perfilRepo.findOne({
        where: { email: dto.email },
      });
      if (mail) throw new ConflictException('Email ya existe');

      const usuario = await this.usuarioRepo.findOne({
        where: { id_usuario: dto.id_usuario },
      });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');

      const perfil = this.perfilRepo.create({ ...dto, usuario });

      return await this.perfilRepo.save(perfil);

    } catch (error: any) {
      throw new InternalServerErrorException(
        'Error al crear el perfil: ' + (error.message ?? ''),
      );
    }
  }

  public async findAll(): Promise<Perfil[]> {
    try {
      const criterio: FindManyOptions<Perfil> = {
        relations: ['usuario', 'oficios', 'oficios.oficio'],
      };
      return await this.perfilRepo.find(criterio);

    } catch (error: any) {
      throw new InternalServerErrorException(
        'Error al obtener los perfiles de las cards: ' + (error.message ?? ''),
      );
    }
  }

  public async findOne(id_perfiles: number): Promise<Perfil> {
    try {
      const criterio: FindOneOptions<Perfil> = {
        where: { id_perfiles },
        relations: ['usuario', 'oficios', 'oficios.oficio'],
      };

      const perfil = await this.perfilRepo.findOne(criterio);
      if (!perfil) throw new NotFoundException('Perfil no encontrado');

      return perfil;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        'Error al buscar el perfil: ' + (error.message ?? ''),
      );
    }
  }

  public async update(
    id_perfiles: number,
    dto: UpdatePerfilDto,
  ): Promise<Perfil> {
    try {
      const perfil = await this.findOne(id_perfiles);

      if (dto.id_usuario) {
        const usuario = await this.usuarioRepo.findOne({
          where: { id_usuario: dto.id_usuario },
        });
        if (!usuario) throw new BadRequestException('Usuario no existe');

        perfil.usuario = usuario;
      }

      Object.assign(perfil, dto);
      return await this.perfilRepo.save(perfil);
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException(
        'Error al actualizar el perfil: ' + (error.message ?? ''),
      );
    }
  }

  public async delete(id_perfiles: number): Promise<boolean> {
    try {
      const result = await this.perfilRepo.delete(id_perfiles);

      if (result.affected === 0) {
        throw new NotFoundException('Perfil no encontrado');
      }

      return true;
    } catch (error: any) {
      throw new InternalServerErrorException(
        'Error al eliminar el perfil: ' + (error.message ?? ''),
      );
    }
  }
}