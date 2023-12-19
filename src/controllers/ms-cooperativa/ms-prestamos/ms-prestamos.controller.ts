import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/create-ms-prestamo.dto';
import { UpdateMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/update-ms-prestamo.dto';
import { ValidacionMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/validacion-ms-prestamo.dto';

import { MsPrestamosService } from '@services/ms-cooperativa/ms-prestamos/ms-prestamos.service';

@Controller('ms-prestamos')
export class MsPrestamosController {
  constructor(private readonly msPrestamosService: MsPrestamosService) {}

  @Post()
  create(@Body() createMsPrestamoDto: CreateMsPrestamoDto) {
    return this.msPrestamosService.create(createMsPrestamoDto);
  }

  @Get('validacion')
  validacionPrestamo(
    @Query() validacionMsPrestamoDto: ValidacionMsPrestamoDto,
    @Res() response: Response,
  ) {
    return this.msPrestamosService
      .validacion(validacionMsPrestamoDto)
      .subscribe({
        next(respuesta) {
          // * responde resultado...
          return response.status(HttpStatus.OK).json(respuesta);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }
}
