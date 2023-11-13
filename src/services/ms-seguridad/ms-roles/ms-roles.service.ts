import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { catchError, throwError } from 'rxjs';

import { CreateMsRoleDto } from '@models/ms-seguridad/ms-roles/dto/create-ms-role.dto';
import { UpdateMsRoleDto } from '@models/ms-seguridad/ms-roles/dto/update-ms-role.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';

import config from '@app/libs/config/config';

@Injectable()
export class MsRolesService {
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(
    createMsRoleDto: CreateMsRoleDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { _id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * enviando mensaje al MS...
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.roles.crear,
          },
          {
            ...createMsRoleDto,
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
            cmd: config().microservicios.seguridad.procesos.roles.listado,
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
    return `This action returns a #${id} msRole`;
  }

  update(updateMsRoleDto: UpdateMsRoleDto, autorizacionUsuarioDto: AutorizacionUsuarioDto) {
    try {
      // * desestructura el objeto de autorización...
      const { _id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * ms editar...      
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.roles.editar,
          },
          {
            ...updateMsRoleDto,
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
    return `This action removes a #${id} msRole`;
  }
}
