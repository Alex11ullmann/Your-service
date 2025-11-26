import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Perfil } from "./entities/perfil.entity";
import { CreatePerfilDto } from "./dto/create-perfil.dto";
import { UpdatePerfilDto } from "./dto/update-perfil.dto";
import { Usuario } from "../usuario/entities/usuario.entity";
import { Oficio } from "../oficio/entities/oficio.entity";

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository( Perfil ) private perfilRepo: Repository < Perfil >,
    @InjectRepository( Usuario ) private usuarioRepo: Repository< Usuario >,
    @InjectRepository( Oficio ) private oficioRepo: Repository< Oficio >,
  ) {}

  async create(dto: CreatePerfilDto): Promise < Perfil> {
    const tel = await this.perfilRepo.findOne({
      where: { telefono: dto.telefono },
    });
    if (tel)
      throw new HttpException("Telefono ya existe", HttpStatus.CONFLICT);

    const mail = await this.perfilRepo.findOne({ where: { email: dto.email } });
    if (mail)
      throw new HttpException("Email ya existe", HttpStatus.CONFLICT);

    const usuario = await this.usuarioRepo.findOne({
      where: { id_usuarios: dto.id_usuarios },
    });
    if (!usuario)
      throw new HttpException("Usuario no existe", HttpStatus.BAD_REQUEST);

    const oficio = await this.oficioRepo.findOne({
      where: { id_oficios: dto.id_oficios },
    });
    if (!oficio)
      throw new HttpException("Oficio no existe", HttpStatus.BAD_REQUEST);

    const perfil = this.perfilRepo.create({ ...dto, usuario, oficio });
    return this.perfilRepo.save( perfil );
  }

  async findAll(): Promise< Perfil[] > {
    const criterio: FindManyOptions < Perfil > = {
      relations: ["usuario", "oficio"],
    };
    return this.perfilRepo.find( criterio);
  }

  async findOne(id_perfiles: number): Promise < Perfil> {
    const criterio: FindOneOptions < Perfil > = {
      where: { id_perfiles },
      relations: ["usuario", "oficio"],
    };
    const perfil = await this.perfilRepo.findOne( criterio );
    if (!perfil)
      throw new HttpException(
        `Perfil ${id_perfiles} no existe`,
        HttpStatus.NOT_FOUND,
      );
    return perfil;
  }

  async update(id_perfiles: number, dto: UpdatePerfilDto): Promise < Perfil> {
    const perfil = await this.findOne(id_perfiles);

    if (dto.id_usuarios) {
      const usuario = await this.usuarioRepo.findOne({
        where: { id_usuarios: dto.id_usuarios },
      });
      if (!usuario)
        throw new HttpException("Usuario no existe", HttpStatus.BAD_REQUEST);
      (perfil as any).usuario = usuario;
    }
    if (dto.id_oficios) {
      const oficio = await this.oficioRepo.findOne({
        where: { id_oficios: dto.id_oficios },
      });
      if (!oficio)
        throw new HttpException("Oficio no existe", HttpStatus.BAD_REQUEST);
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

    return this.perfilRepo.save(perfil);
  }

  async remove(id_perfiles: number): Promise < void > {
    const perfil = await this.findOne(id_perfiles);
    await this.perfilRepo.remove(perfil);
  }
}
