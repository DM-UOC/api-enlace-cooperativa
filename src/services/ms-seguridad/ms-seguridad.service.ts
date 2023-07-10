import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

import config from '@app/libs/config/config';

@Injectable()
export class MsSeguridadService {

  constructor(
    @Inject(config().microservicios.inventario.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService
  ) {}

}
