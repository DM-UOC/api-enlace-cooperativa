import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { catchError, throwError } from 'rxjs';

import { CreateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/create-ms-menu.dto';
import { UpdateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/update-ms-menu.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';

import { ProxyService } from '@services/proxy/proxy.service';

import config from '@app/libs/config/config';

@Injectable()
export class MsMenusService {
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  usuarioMenus(_id: string) {
    try {
      // * ms consulta menus usuario...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.menus.usuario,
        _id,
      );
    } catch (error) {
      throw error;
    }
  }

  create(
    createMsMenuDto: CreateMsMenuDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * enviando mensaje al MS...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.menus.crear,
        {
          ...createMsMenuDto,
          ...autorizacionDTO,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      // * MS consulta...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.menus.listado,
        {},
      );
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} msMenu`;
  }

  update(
    updateMsMenuDto: UpdateMsMenuDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * ms editar...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.menus.editar,
        {
          ...updateMsMenuDto,
          ...autorizacionDTO,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} msMenu`;
  }
}
