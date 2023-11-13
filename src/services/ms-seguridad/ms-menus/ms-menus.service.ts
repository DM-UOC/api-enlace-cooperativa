import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { catchError, throwError } from 'rxjs';

import { CreateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/create-ms-menu.dto';
import { UpdateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/update-ms-menu.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';

import config from '@app/libs/config/config';

@Injectable()
export class MsMenusService {
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  usuarioMenus(_id: string) {
    try {
      // * retornando menus usuario...
      return this.clientProxySeguridad
        .send(
          { cmd: config().microservicios.seguridad.procesos.menus.usuario },
          _id,
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

  create(
    createMsMenuDto: CreateMsMenuDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { _id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * enviando mensaje al MS...
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.menus.crear,
          },
          {
            ...createMsMenuDto,
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

  findAll() {
    try {
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.menus.listado,
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

  findOne(id: number) {
    return `This action returns a #${id} msMenu`;
  }

  update(
    updateMsMenuDto: UpdateMsMenuDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { _id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * ms editar...
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.menus.editar,
          },
          {
            ...updateMsMenuDto,
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

  remove(id: number) {
    return `This action removes a #${id} msMenu`;
  }
}
