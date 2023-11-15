import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { Autorizacion } from '@decorators/autorizacion.decorator';

import { CreateMsUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/create-ms-usuario.dto';
import { UpdateMsUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/update-ms-usuario.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';

import { MsUsuariosService } from '@services/ms-seguridad/ms-usuarios/ms-usuarios.service';

import { SeguridadGuard } from '@guards/seguridad.guard';

@Controller('ms-usuarios')
export class MsUsuariosController {
  constructor(private readonly msUsuariosService: MsUsuariosService) {}

  @UseGuards(SeguridadGuard)
  @Get()
  findAll(@Res() response: Response) {
    return this.msUsuariosService.findAll().subscribe({
      next(listado) {
        // * responde el token...
        return response.status(HttpStatus.OK).json(listado);
      },
      error(err) {
        return response.status(HttpStatus.BAD_REQUEST).json(err);
      },
    });
  }

  @Get(':identificacion')
  findOne(@Param('identificacion') identificacion: string) {
    return this.msUsuariosService.findOne(identificacion);
  }

  @UseGuards(SeguridadGuard)
  @Post()
  create(
    @Body() createMsUsuarioDto: CreateMsUsuarioDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msUsuariosService
      .create(createMsUsuarioDto, autorizacionUsuarioDto)
      .subscribe({
        next(usuario) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(usuario);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @UseGuards(SeguridadGuard)
  @Patch()
  update(
    @Body() updateMsUsuarioDto: UpdateMsUsuarioDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msUsuariosService
      .update(updateMsUsuarioDto, autorizacionUsuarioDto)
      .subscribe({
        next(listado) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(listado);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @UseGuards(SeguridadGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.msUsuariosService.remove(+id);
  }
}
