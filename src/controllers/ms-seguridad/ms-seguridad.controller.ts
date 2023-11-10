import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { MsSeguridadService } from '@services/ms-seguridad/ms-seguridad.service';
import { CreateUsuarioDto } from '@models/ms-seguridad/usuario/dto/create-usuario.dto';

@Controller('ms-seguridad')
export class MsSeguridadController {
  constructor(private readonly msSeguridadService: MsSeguridadService) {}

  @Post()
  autenticacion(
    @Body() autenticacionDto: AutenticacionDto,
    @Res() response: Response,
  ) {
    try {
      this.msSeguridadService.autenticacion(autenticacionDto).subscribe({
        next(token) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(token);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('menus')
  menus(@Query('_id') _id: string, @Res() response: Response) {
    try {
      this.msSeguridadService.menus(_id).subscribe({
        next(menus) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(menus);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('usuario/crear')
  crearUsuario(@Body() createUsuarioDto: CreateUsuarioDto,
  @Res() response: Response) {
    return this.msSeguridadService.crear(createUsuarioDto).subscribe({
      next(menus) {
        // * responde el token...
        return response.status(HttpStatus.OK).json(menus);
      },
      error(err) {
        return response.status(HttpStatus.BAD_REQUEST).json(err);
      },
    });
  }
}
