import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Autorizacion } from '@decorators/autorizacion.decorator';

import { CreateMsRoleDto } from '@models/ms-seguridad/ms-roles/dto/create-ms-role.dto';
import { UpdateMsRoleDto } from '@models/ms-seguridad/ms-roles/dto/update-ms-role.dto';
import { AutorizacionUsuarioDto } from '@app/src/models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';

import { MsRolesService } from '@services/ms-seguridad/ms-roles/ms-roles.service';

import { SeguridadGuard } from '@guards/seguridad.guard';

@UseGuards(SeguridadGuard)
@Controller('ms-roles')
export class MsRolesController {
  constructor(private readonly msRolesService: MsRolesService) {}

  @Post()
  create(
    @Body() createMsRoleDto: CreateMsRoleDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msRolesService
      .create(createMsRoleDto, autorizacionUsuarioDto)
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

  @Get()
  findAll(@Res() response: Response) {
    return this.msRolesService.findAll().subscribe({
      next(listado) {
        // * responde el token...
        return response.status(HttpStatus.OK).json(listado);
      },
      error(err) {
        return response.status(HttpStatus.BAD_REQUEST).json(err);
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.msRolesService.findOne(+id);
  }

  @Patch()
  update(
    @Body() updateMsRoleDto: UpdateMsRoleDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msRolesService
      .update(updateMsRoleDto, autorizacionUsuarioDto)
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.msRolesService.remove(+id);
  }
}
