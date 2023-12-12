import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

import { CreateMsSubmenuDto } from '@models/ms-seguridad/ms-submenus/dto/create-ms-submenu.dto';
import { UpdateMsSubmenuDto } from '@models/ms-seguridad/ms-submenus/dto/update-ms-submenu.dto';
import { AutorizacionUsuarioDto } from '@app/src/models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';

import { UtilitariosService } from '@services/utilitarios/utilitarios.service';

import config from '@app/libs/config/config';

@Injectable()
export class MsSubmenusService {
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(
    createMsSubmenuDto: CreateMsSubmenuDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización para solo enviar el usuario...
      const { id, exp, iat, nombres, ...autorizacionDTO } =
        autorizacionUsuarioDto;
      return UtilitariosService.ejecutaMicroServicio(
        this.clientProxySeguridad,
        config().microservicios.seguridad.procesos.submenus.crear,
        {
          ...createMsSubmenuDto,
          ...autorizacionDTO,
        },
      );
      // * enviando mensaje al MS...
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.submenus.crear,
          },
          {
            ...createMsSubmenuDto,
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
    return `This action returns all msSubmenus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} msSubmenu`;
  }

  update(
    updateMsSubmenuDto: UpdateMsSubmenuDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { id, exp, iat, nombres, ...autorizacionDTO } =
        autorizacionUsuarioDto;
      // * ms editar...
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.submenus.editar,
          },
          {
            ...updateMsSubmenuDto,
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
    return `This action removes a #${id} msSubmenu`;
  }
}
