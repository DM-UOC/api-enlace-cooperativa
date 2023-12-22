import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { SeguridadGuard } from '@app/src/guards/seguridad.guard';

import { CreateMsCalculoDto } from '@models/ms-cooperativa/ms-calculos/dto/create-ms-calculo.dto';
import { UpdateMsCalculoDto } from '@models/ms-cooperativa/ms-calculos/dto/update-ms-calculo.dto';

import { MsCalculosService } from '@services/ms-cooperativa/ms-calculos/ms-calculos.service';

@UseGuards(SeguridadGuard)
@Controller('ms-calculos')
export class MsCalculosController {
  constructor(private readonly msCalculosService: MsCalculosService) {}

  @Post()
  create(@Body() createMsCalculoDto: CreateMsCalculoDto) {
    return this.msCalculosService.create(createMsCalculoDto);
  }

  @Get()
  findAll() {
    return this.msCalculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.msCalculosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMsCalculoDto: UpdateMsCalculoDto,
  ) {
    return this.msCalculosService.update(+id, updateMsCalculoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.msCalculosService.remove(+id);
  }
}
