import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { CreateUsuarioDto } from '@models/ms-seguridad/usuario/dto/create-usuario.dto';

import config from '@app/libs/config/config';
import { AutorizacionUsuarioDto } from '@app/src/models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';

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

  crear(
    createUsuarioDto: CreateUsuarioDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { _id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * enviando mensaje al MS...
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.usuarios.crear,
          },
          {
            ...createUsuarioDto,
            ...autorizacionDTO,
          },
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

  listadoUsuarios() {
    try {
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.usuarios.listado,
          },
          {},
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
}
