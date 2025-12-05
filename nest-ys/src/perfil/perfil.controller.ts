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
  constructor(private readonly perfilService: PerfilService) {}

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

  @Patch(':id')
  private update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePerfilDto): Promise<Perfil> {
    return this.perfilService.update(id, dto);
  }

  @Delete(':id')
  private async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.perfilService.delete(id);
  }
}
