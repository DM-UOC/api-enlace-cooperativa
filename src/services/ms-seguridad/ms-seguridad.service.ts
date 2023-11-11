import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';

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
      // * retornando procesos de autenticación...
      return this.clientProxySeguridad
        .send(
          { cmd: config().microservicios.seguridad.procesos.autenticacion },
          autenticacionDto,
        )
        .pipe(
          catchError((error) => {
            return throwError(
              () => new HttpException(error, HttpStatus.CONFLICT),
            );
          }),
        );
    } catch (error) {
      throw error;
    }
  }

  menus(_id: string) {
    try {
      // * retornando menus usuario...
      return this.clientProxySeguridad
        .send({ cmd: config().microservicios.seguridad.procesos.menus }, _id)
        .pipe(
          catchError((error) => {
            return throwError(
              () => new HttpException(error, HttpStatus.CONFLICT),
            );
          }),
        );
    } catch (error) {
      throw error;
    }
  }
}
