import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/create-ms-prestamo.dto';
import { UpdateMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/update-ms-prestamo.dto';

import { MsPrestamosService } from '@services/ms-cooperativa/ms-prestamos/ms-prestamos.service';

@Controller('ms-prestamos')
export class MsPrestamosController {
  constructor(private readonly msPrestamosService: MsPrestamosService) {}

  @Post()
  create(@Body() createMsPrestamoDto: CreateMsPrestamoDto) {
    return this.msPrestamosService.create(createMsPrestamoDto);
  }

  @Get()
  findAll() {
    return this.msPrestamosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.msPrestamosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMsPrestamoDto: UpdateMsPrestamoDto,
  ) {
    return this.msPrestamosService.update(+id, updateMsPrestamoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.msPrestamosService.remove(+id);
  }
}
