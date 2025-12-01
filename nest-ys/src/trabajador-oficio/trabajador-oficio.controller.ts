/* eslint-disable prettier/prettier */
import { Controller, Post, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TrabajadorOficioService } from './trabajador-oficio.service';

@Controller('trabajador-oficio')
export class TrabajadorOficioController {
  constructor(private readonly trabajoService: TrabajadorOficioService) { }

  @Post(':idPerfil/:idOficio')
  private assign(
    @Param('idPerfil', ParseIntPipe) idPerfil: number,
    @Param('idOficio', ParseIntPipe) idOficio: number,
  ) {
    return this.trabajoService.assign(idPerfil, idOficio);
  }

  @Delete(':idPerfil/:idOficio')
  private remove(
    @Param('idPerfil', ParseIntPipe) idPerfil: number,
    @Param('idOficio', ParseIntPipe) idOficio: number,
  ) {
    return this.trabajoService.remove(idPerfil, idOficio);
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
