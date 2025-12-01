import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OficioService } from "./oficio.service";
import { CreateOficioDto } from "./dto/create-oficio.dto";
import { UpdateOficioDto } from "./dto/update-oficio.dto";

@Controller("oficios")
export class OficioController {
  constructor(private readonly oficioService: OficioService) {}

  @Post()
  create(@Body() dto: CreateOficioDto) {
    return this.oficioService.create(dto);
  }

  @Get()
  findAll() {
    return this.oficioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.oficioService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateOficioDto) {
    return this.oficioService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.oficioService.remove(+id);
  }
}
