import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, throwError } from 'rxjs';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';

import config from '@app/libs/config/config';

@Injectable()
export class MsSeguridadService {

  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService
  ) {}

  autenticacion(autenticacionDto: AutenticacionDto) {
    try {
      return this.clientProxySeguridad.send(
        { cmd: config().microservicios.seguridad.procesos.autenticacion },
        autenticacionDto
        ).pipe(
          map(result => {
            console.log("*********************");
          }),
          catchError((error) => {
            return throwError(() => new HttpException('error', 401))
          })
        );
    } catch (error) {
      throw error;
    }
  }

}
