import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { catchError, throwError } from 'rxjs';

import { CreateMsUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/create-ms-usuario.dto';
import { UpdateMsUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/update-ms-usuario.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';
import { ActualizaUsuarioImagenDto } from '@models/ms-seguridad/ms-usuarios/dto/actualiza-usuarioimagen.dto';
import { CreateImagenDto } from '@models/ms-comun/dto/create-imagen.dto';
import { RegistraUsuarioCorreoDto } from '@models/ms-seguridad/ms-usuarios/dto/registra-usuario.correo.dto';
import { ActualizaUsuarioCorreoDto } from '@models/ms-seguridad/ms-usuarios/dto/actualiza-usuario.correo.dto';

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
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { id, ...autorizacionDTO } = autorizacionUsuarioDto;
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

  findOne(
    opcion: string,
    cmd: string = config().microservicios.seguridad.procesos.usuario
      .identificacion,
  ) {
    try {
      return this.clientProxySeguridad
        .send(
          {
            cmd,
          },
          opcion,
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

  update(
    updateMsUsuarioDto: UpdateMsUsuarioDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
    cmd: string = config().microservicios.seguridad.procesos.usuarios.editar,
  ) {
    try {
      // * desestructura el objeto de autorización...
      const { id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * ms editar...
      return this.clientProxySeguridad
        .send(
          {
            cmd,
          },
          {
            ...updateMsUsuarioDto,
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

  registroInicialPin(
    updateMsUsuarioDto: UpdateMsUsuarioDto,
    cmd: string = config().microservicios.seguridad.procesos.usuarios.editar,
  ) {
    try {
      // * ms editar...
      return this.clientProxySeguridad
        .send(
          {
            cmd,
          },
          updateMsUsuarioDto,
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

  registraCorreoUsuario(
    registraUsuarioCorreoDto: RegistraUsuarioCorreoDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * ms registrar correo...
      return this.clientProxySeguridad
        .send(
          {
            cmd: this.configService.get(
              'microservicios.seguridad.procesos.usuario.correo.registrar',
            ),
          },
          {
            ...registraUsuarioCorreoDto,
            ...autorizacionUsuarioDto,
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

  editarCorreoUsuario(
    actualizaUsuarioCorreoDto: ActualizaUsuarioCorreoDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * ms registrar correo...
      return this.clientProxySeguridad
        .send(
          {
            cmd: this.configService.get(
              'microservicios.seguridad.procesos.usuario.correo.editar',              
            ),
          },
          {
            ...actualizaUsuarioCorreoDto,
            ...autorizacionUsuarioDto,
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

  eliminarCorreoUsuario(
    actualizaUsuarioCorreoDto: ActualizaUsuarioCorreoDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * ms registrar correo...
      return this.clientProxySeguridad
        .send(
          {
            cmd: this.configService.get(
              'microservicios.seguridad.procesos.usuario.correo.eliminar',
            ),
          },
          {
            ...actualizaUsuarioCorreoDto,
            ...autorizacionUsuarioDto,
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
    return `This action removes a #${id} msUsuario`;
  }

  actualizaImagen(
    actualizaUsuarioImagenDto: ActualizaUsuarioImagenDto,
    files: Array<Express.Multer.File>,
    serverUrl: string,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * agrega al objeto de actualización...
      actualizaUsuarioImagenDto.imagen = new CreateImagenDto(
        files[0],
        serverUrl,
      );
      // * desestructura el objeto de autorización...
      const { id, ...autorizacionDTO } = autorizacionUsuarioDto;
      // * ms editar...
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.seguridad.procesos.usuario.imagen,
          },
          {
            ...actualizaUsuarioImagenDto,
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
}
