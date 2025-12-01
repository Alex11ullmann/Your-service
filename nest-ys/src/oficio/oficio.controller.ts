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
import { OficioService } from './oficio.service';
import { CreateOficioDto } from './dto/create-oficio.dto';
import { UpdateOficioDto } from './dto/update-oficio.dto';
import { Oficio } from './entities/oficio.entity';

@Controller('oficios')
export class OficioController {
  constructor(private readonly oficioService: OficioService) { }

  @Post()
  private create(@Body() dto: CreateOficioDto): Promise<Oficio> {
    return this.oficioService.create(dto);
  }

  @Get()
  findAll(): Promise<Oficio[]> {
    return this.oficioService.findAll();
  }

  @Get(':id')
  private findOne(@Param('id', ParseIntPipe) id: number): Promise<Oficio> {
    return this.oficioService.findOne(id);
  }

  @Patch(':id')
  private update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOficioDto): Promise<Oficio> {
    return this.oficioService.update(id, dto);
  }


  @Delete(':id')
  private remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.oficioService.remove(id);
  }

}