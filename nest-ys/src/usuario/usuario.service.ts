import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario ) private usuarioRepo: Repository < Usuario >,
  ) {}

  async create(dto: CreateUsuarioDto): Promise < Usuario > {
    const criterio: FindOneOptions<Usuario> = {
      where: { usuario: dto.usuario },
    };
    const existente = await this.usuarioRepo.findOne(criterio);
    if (existente) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }
    try {
      const nuevo = this.usuarioRepo.create( dto );
      return await this.usuarioRepo.save( nuevo );
    } catch {
      throw new HttpException('Usuario no creado', HttpStatus.BAD_REQUEST );
    }
  }

  async findAll(): Promise< Usuario[] > {
    const criterio: FindManyOptions< Usuario > = { relations: ['perfiles'] };
    return this.usuarioRepo.find(criterio );
  }

  async findOne(id_usuarios: number ): Promise < Usuario > {
    const criterio: FindOneOptions< Usuario> = {
      where: { id_usuarios },
      relations: ['perfiles'],
    };
    const usuario = await this.usuarioRepo.findOne( criterio);
    if (!usuario) {
      throw new HttpException(
        `Usuario con id ${id_usuarios} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
    return usuario;
  }

  async update(id_usuarios: number, dto: UpdateUsuarioDto): Promise < Usuario > {
    const usuario = await this.findOne( id_usuarios);
    Object.assign(usuario, dto);
    return this.usuarioRepo.save( usuario );
  }

  async remove(id_usuarios: number ): Promise < void> {
    const usuario = await this.findOne(id_usuarios );
    await this.usuarioRepo.remove( usuario);
  }
}
