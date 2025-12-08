/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Perfil } from './entities/perfil.entity';

@Controller('perfiles')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) { }

  @Post()
  private create(@Body() dto: CreatePerfilDto): Promise<Perfil> {
    return this.perfilService.create(dto);
  }

  @Get()
  findAll(): Promise<Perfil[]> {
    return this.perfilService.findAll();
  }

  @Get(':id')
  private findOne(@Param('id', ParseIntPipe) id: number): Promise<Perfil> {
    return this.perfilService.findOne(id);
  }

  // Verificar si un usuario existe
  @Get('existe-usuario/:usuario')
  async existeUsuario(@Param('usuario') usuario: string) {
    return this.perfilService.existeUsuario(usuario);
  }

  // Verificar si un DNI existe
  @Get('existe-dni/:dni')
  async existeDni(@Param('dni') dni: string) {
    return this.perfilService.existeDni(dni);
  }

  // Verificar si un email existe
  @Get('existe-email/:email')
  async existeEmail(@Param('email') email: string) {
    return this.perfilService.existeEmail(email);
  }

  @Patch(':id')
  private update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePerfilDto): Promise<Perfil> {
    return this.perfilService.update(id, dto);
  }

  @Delete(':id')
  private async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.perfilService.delete(id);
  }
}
