import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { ProxyService } from '@services/proxy/proxy.service';

import config from '@app/libs/config/config';

@Injectable()
export class MsSeguridadService {
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  autenticacion(autenticacionDto: AutenticacionDto) {
    try {
      // * ms autenticación seguridad...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.autenticacion,
        autenticacionDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
