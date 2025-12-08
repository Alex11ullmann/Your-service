/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) { }

  async login(usuario: string, password: string) {
    const user = await this.usuarioRepo
      .createQueryBuilder("usuario")
      .where("BINARY usuario.usuario = :usuario", { usuario })
      .andWhere("BINARY usuario.password = :password", { password })
      .leftJoinAndSelect("usuario.perfiles", "perfiles")
      .leftJoinAndSelect("perfiles.oficios", "oficios")
      .leftJoinAndSelect("oficios.oficio", "oficio")
      .getOne();
    if (!user) throw new NotFoundException('Usuario o contraseña incorrectos');

    return user;
  }

  public async create(dto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const existente = await this.usuarioRepo.findOne({
        where: { usuario: dto.usuario },
      });

      if (existente) {
        throw new ConflictException('El usuario ya existe');
      }
      const nuevo = this.usuarioRepo.create(dto);
      return await this.usuarioRepo.save(nuevo);
    } catch (error: any) {
      if (error instanceof ConflictException) throw error;
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El usuario ya existe');
      }
      throw new InternalServerErrorException(
        'Error al crear el usuario: ' + (error.message ?? ''),
      );
    }
  }

  public async findAll(): Promise<Usuario[]> {
    try {
      const criterio: FindManyOptions<Usuario> = {
        relations: ['perfiles'],
      };
      return await this.usuarioRepo.find(criterio);
    } catch (error: any) {
      throw new InternalServerErrorException(
        'Error al obtener los usuarios: ' + (error.message ?? ''),
      );
    }
  }

  public async findOne(id_usuario: number): Promise<Usuario> {
    try {
      const criterio: FindOneOptions<Usuario> = {
        where: { id_usuario },
        relations: ['perfiles'],
      };
      const usuario = await this.usuarioRepo.findOne(criterio);
      if (!usuario) {
        throw new NotFoundException(
          `Usuario con id ${id_usuario} no encontrado`,
        );
      }
      return usuario;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error al buscar el usuario: ' + (error.message ?? ''),
      );
    }
  }

  public async update(id_usuario: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      const usuario = await this.findOne(id_usuario);
      Object.assign(usuario, dto);
      return await this.usuarioRepo.save(usuario);
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('El nuevo usuario ya existe');
      }
      throw new InternalServerErrorException(
        'Error al actualizar el usuario: ' + (error.message ?? ''),
      );
    }
  }

  public async delete(id_usuario: number): Promise<boolean> {
    try {
      const result = await this.usuarioRepo.delete(id_usuario);
      if (result.affected === 0) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return true;

    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error al eliminar el usuario: ' + (error.message ?? ''),
      );
    }
  }
}
