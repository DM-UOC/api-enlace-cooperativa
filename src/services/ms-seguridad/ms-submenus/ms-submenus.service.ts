import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

import { CreateMsSubmenuDto } from '@models/ms-seguridad/ms-submenus/dto/create-ms-submenu.dto';
import { UpdateMsSubmenuDto } from '@models/ms-seguridad/ms-submenus/dto/update-ms-submenu.dto';
import { AutorizacionUsuarioDto } from '@app/src/models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';

import { ProxyService } from '@services/proxy/proxy.service';

import config from '@app/libs/config/config';

@Injectable()
export class MsSubmenusService {
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(
    createMsSubmenuDto: CreateMsSubmenuDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización para solo enviar el usuario...
      const { id, exp, iat, nombres, ...autorizacionDTO } =
        autorizacionUsuarioDto;
      // * ms crear...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.submenus.crear,
        {
          ...createMsSubmenuDto,
          ...autorizacionDTO,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all msSubmenus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} msSubmenu`;
  }

  update(
    updateMsSubmenuDto: UpdateMsSubmenuDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { id, exp, iat, nombres, ...autorizacionDTO } =
        autorizacionUsuarioDto;
      // * ms editar...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.submenus.editar,
        {
          ...updateMsSubmenuDto,
          ...autorizacionDTO,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} msSubmenu`;
  }
}
