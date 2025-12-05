/* eslint-disable prettier/prettier */
import { Controller, Post, Delete, Get, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrabajadorOficioService } from './trabajador-oficio.service';

@Controller('trabajador-oficio')
export class TrabajadorOficioController {
  constructor(private readonly trabajoService: TrabajadorOficioService) { }

  // Asignar oficio a perfil
  @Post(':idPerfil/:idOficio')
  assign(
    @Param('idPerfil', ParseIntPipe) idPerfil: number,
    @Param('idOficio', ParseIntPipe) idOficio: number,
  ) {
    return this.trabajoService.assign(idPerfil, idOficio);
  }

  // Eliminar una relación por ID único
  @Delete(':id_perfil/:id_oficio')
  delete(
    @Param('id_perfil', ParseIntPipe) id_perfil: number,
    @Param('id_oficio', ParseIntPipe) id_oficio: number,
  ) {
    return this.trabajoService.delete(id_perfil, id_oficio);
  }
  
  @Get()
  getAll() {
    return this.trabajoService.getAll();
  }

  @Get(':idPerfil')
  getOficios(@Param('idPerfil', ParseIntPipe) idPerfil: number) {
    return this.trabajoService.getOficios(idPerfil);
  }
}

