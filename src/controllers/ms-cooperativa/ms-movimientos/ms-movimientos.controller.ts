import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/create-ms-movimiento.dto';
import { UpdateMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/update-ms-movimiento.dto';

import { MsMovimientosService } from '@services/ms-cooperativa/ms-movimientos/ms-movimientos.service';

@Controller('ms-movimientos')
export class MsMovimientosController {
  constructor(private readonly msMovimientosService: MsMovimientosService) {}

  @Post()
  create(@Body() createMsMovimientoDto: CreateMsMovimientoDto) {
    return this.msMovimientosService.create(createMsMovimientoDto);
  }

  @Get()
  findAll() {
    return this.msMovimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.msMovimientosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMsMovimientoDto: UpdateMsMovimientoDto,
  ) {
    return this.msMovimientosService.update(+id, updateMsMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.msMovimientosService.remove(+id);
  }
}
