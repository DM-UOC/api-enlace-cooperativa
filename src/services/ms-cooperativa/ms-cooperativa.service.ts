import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import config from '@app/libs/config/config';

@Injectable()
export class MsCooperativaService {

  constructor(
    @Inject(config().microservicios.cooperativa.alias)
    private readonly clientProxyCooperativa: ClientProxy,
    private readonly configService: ConfigService
  ) {}

}
