import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { SeguridadGuard } from '@guards/seguridad.guard';

import { Autorizacion } from '@decorators/autorizacion.decorator';

import { CreateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/create-ms-menu.dto';
import { UpdateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/update-ms-menu.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';

import { MsMenusService } from '@services/ms-seguridad/ms-menus/ms-menus.service';

@UseGuards(SeguridadGuard)
@Controller('ms-menus')
export class MsMenusController {
  constructor(private readonly msMenusService: MsMenusService) {}

  @Post()
  create(
    @Body() createMsMenuDto: CreateMsMenuDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msMenusService
      .create(createMsMenuDto, autorizacionUsuarioDto)
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
  findAll() {
    return this.msMenusService.findAll();
  }

  @Get('usuario')
  usuarioMenus(@Query('_id') _id: string, @Res() response: Response) {
    try {
      this.msMenusService.usuarioMenus(_id).subscribe({
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.msMenusService.findOne(+id);
  }

  @Patch()
  update(
    @Body() updateMsMenuDto: UpdateMsMenuDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msMenusService
      .update(updateMsMenuDto, autorizacionUsuarioDto)
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
    return this.msMenusService.remove(+id);
  }
}
