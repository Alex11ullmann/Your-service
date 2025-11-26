import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerfilService } from "./perfil.service";
import { CreatePerfilDto } from "./dto/create-perfil.dto";
import { UpdatePerfilDto } from "./dto/update-perfil.dto";

@Controller("perfiles")
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  create(@Body() dto: CreatePerfilDto) {
    return this.perfilService.create(dto);
  }

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.perfilService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePerfilDto) {
    return this.perfilService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.perfilService.remove(+id);
  }
}
