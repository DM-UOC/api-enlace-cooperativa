import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { catchError, throwError } from 'rxjs';

import { CreateMsUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/create-ms-usuario.dto';
import { UpdateMsUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/update-ms-usuario.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';

import config from '@app/libs/config/config';

@Injectable()
export class MsUsuariosService {
  
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(
    createMsUsuarioDto: CreateMsUsuarioDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto
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
            ...createMsUsuarioDto,
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

  findOne(id: number) {
    return `This action returns a #${id} msUsuario`;
  }

  update(id: number, updateMsUsuarioDto: UpdateMsUsuarioDto) {
    return `This action updates a #${id} msUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} msUsuario`;
  }
}
