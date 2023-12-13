import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { CreateMsRoleDto } from '@models/ms-seguridad/ms-roles/dto/create-ms-role.dto';
import { UpdateMsRoleDto } from '@models/ms-seguridad/ms-roles/dto/update-ms-role.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';

import { ProxyService } from '@services/proxy/proxy.service';

import config from '@app/libs/config/config';

@Injectable()
export class MsRolesService {
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(
    createMsRoleDto: CreateMsRoleDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * ms crear...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.roles.crear,
        {
          ...createMsRoleDto,
          ...autorizacionDTO,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      // * ms consultar...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.roles.listado,
        {},
      );
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} msRole`;
  }

  update(
    updateMsRoleDto: UpdateMsRoleDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * ms editar...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.roles.editar,
        {
          ...updateMsRoleDto,
          ...autorizacionDTO,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} msRole`;
  }
}
