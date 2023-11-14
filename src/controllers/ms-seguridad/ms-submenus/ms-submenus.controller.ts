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

import { SeguridadGuard } from '@guards/seguridad.guard';

import { CreateMsSubmenuDto } from '@models/ms-seguridad/ms-submenus/dto/create-ms-submenu.dto';
import { UpdateMsSubmenuDto } from '@models/ms-seguridad/ms-submenus/dto/update-ms-submenu.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';

import { MsSubmenusService } from '@services/ms-seguridad/ms-submenus/ms-submenus.service';

@UseGuards(SeguridadGuard)
@Controller('ms-submenus')
export class MsSubmenusController {
  constructor(private readonly msSubmenusService: MsSubmenusService) {}

  @Post()
  create(
    @Body() createMsSubmenuDto: CreateMsSubmenuDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msSubmenusService
      .create(createMsSubmenuDto, autorizacionUsuarioDto)
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
    return this.msSubmenusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.msSubmenusService.findOne(+id);
  }

  @Patch()
  update(
    @Body() updateMsSubmenuDto: UpdateMsSubmenuDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msSubmenusService
      .update(updateMsSubmenuDto, autorizacionUsuarioDto)
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
    return this.msSubmenusService.remove(+id);
  }
}
