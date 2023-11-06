import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { UtilitariosService } from '@services/utilitarios/utilitarios.service';

import config from '@app/libs/config/config';

@Injectable()
export class MsCooperativaService {
  constructor(
    @Inject(config().microservicios.cooperativa.alias)
    private readonly clientProxyCooperativa: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  autenticar(autenticacionDto: AutenticacionDto) {
    try {
      // * retornando proceso de cooperativa..
      return this.clientProxyCooperativa.send(
        {
          cmd: UtilitariosService.retornaCadenaMensajes(
            this.configService.get('cadenas'),
          ).microservicio.seguridad.autenticar,
        },
        autenticacionDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
