import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { tap, catchError, throwError } from 'rxjs';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';

import config from '@app/libs/config/config';
import { UsuarioDto } from '@app/src/models/ms-seguridad/usuario/usuario.dto';

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
        .emit(
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

  crear(usuarioDto: UsuarioDto) {
    try {
      this.clientProxySeguridad.emit(
        {
          cmd: '',
        },
        usuarioDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
