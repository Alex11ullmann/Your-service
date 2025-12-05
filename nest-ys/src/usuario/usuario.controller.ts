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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  private create(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
    console.log("🟡 Datos recibidos:", dto);
    return this.usuarioService.create(dto);
  }

  @Post('login')
  async login(@Body() body: { usuario: string; password: string }) {
    return this.usuarioService.login(body.usuario, body.password);
  }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  private findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  private update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  private delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.usuarioService.delete(+id);
  }
}
