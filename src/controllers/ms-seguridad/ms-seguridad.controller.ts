import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { MsSeguridadService } from '@services/ms-seguridad/ms-seguridad.service';
import { CreateUsuarioDto } from '@models/ms-seguridad/usuario/dto/create-usuario.dto';
import { SeguridadGuard } from '@guards/seguridad.guard';
import { Autorizacion } from '@decorators/autorizacion.decorator';
import { AutorizacionUsuarioDto } from '@app/src/models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';

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

  @UseGuards(SeguridadGuard)
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

  @UseGuards(SeguridadGuard)
  @Get('usuarios')
  listadoUsuarios(@Res() response: Response) {
    return this.msSeguridadService.listadoUsuarios().subscribe({
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
  @Post('usuarios/crear')
  crearUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msSeguridadService
      .crear(createUsuarioDto, autorizacionUsuarioDto)
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
  @Get('roles')
  listadoRoles(@Res() response: Response) {
    return this.msSeguridadService.listadoUsuarios().subscribe({
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
  @Post('rol/crear')
  crearRol(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msSeguridadService
      .crear(createUsuarioDto, autorizacionUsuarioDto)
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

}
