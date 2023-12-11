import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { catchError, throwError } from 'rxjs';

import { CreateImagenDto } from '@models/ms-comun/dto/create-imagen.dto';
import { CreateMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/create-ms-movimiento.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';
import { VerificaRetiroMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/verificaretirno-ms-movimiento.dto';
import { AceptarRetiroMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/aceptar-retiro.ms-movimiento.dto';
import { EliminarRetiroMsMovimientoDto } from '@app/src/models/ms-cooperativa/ms-movimientos/dto/eliminar-retiro.ms-movimiento.dto';

import config from '@app/libs/config/config';

@Injectable()
export class MsMovimientosService {
  constructor(
    @Inject(config().microservicios.cooperativa.alias)
    private readonly clientProxyCooperativa: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(
    createMsMovimientoDto: CreateMsMovimientoDto,
    files: Array<Express.Multer.File>,
    serverUrl: string,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * agrega al objeto de actualización...
      createMsMovimientoDto.imagen = new CreateImagenDto(files[0], serverUrl);
      // * enviando mensaje al MS...
      return this.ejecutaMicroServicio(
        config().microservicios.cooperativa.procesos.movimientos.usuario.crear,
        {
          ...createMsMovimientoDto,
          ...autorizacionUsuarioDto,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  crearRetiro(
    createMsMovimientoDto: CreateMsMovimientoDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * enviando mensaje al MS...
      return this.ejecutaMicroServicio(
        this.configService.get(
          'microservicios.cooperativa.procesos.movimientos.usuario.retiro.crear',
        ),
        {
          ...createMsMovimientoDto,
          ...autorizacionUsuarioDto,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  aceptarRetiro(
    aceptarRetiroMsMovimientoDto: AceptarRetiroMsMovimientoDto,
    files: Array<Express.Multer.File>,
    serverUrl: string,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * agrega al objeto de actualización...
      aceptarRetiroMsMovimientoDto.imagen = new CreateImagenDto(
        files[0],
        serverUrl,
      );
      // * enviando mensaje al MS...
      return this.ejecutaMicroServicio(
        this.configService.get(
          'microservicios.cooperativa.procesos.movimientos.usuario.retiro.aceptar',
        ),
        {
          ...aceptarRetiroMsMovimientoDto,
          ...autorizacionUsuarioDto,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  eliminarRetiro(
    eliminarRetiroMsMovimientoDto: EliminarRetiroMsMovimientoDto,
    autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * enviando mensaje al MS...
      return this.ejecutaMicroServicio(
        this.configService.get(
          'microservicios.cooperativa.procesos.movimientos.usuario.retiro.eliminar',
        ),
        {
          ...eliminarRetiroMsMovimientoDto,
          ...autorizacionUsuarioDto,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all msMovimientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} msMovimiento`;
  }

  ultimoMovimientoPorUsuarioId(id: string) {
    try {
      return this.clientProxyCooperativa
        .send(
          {
            cmd: this.configService.get(
              'microservicios.cooperativa.procesos.movimientos.usuario.ultimo',
            ),
          },
          id,
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

  movimientosPorUsuarioId(id: string) {
    try {
      return this.clientProxyCooperativa
        .send(
          {
            cmd: this.configService.get(
              'microservicios.cooperativa.procesos.movimientos.usuario.todos',
            ),
          },
          id,
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

  movimientosRetiros() {
    try {
      return this.clientProxyCooperativa
        .send(
          {
            cmd: this.configService.get(
              'microservicios.cooperativa.procesos.movimientos.retiros.general',
            ),
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

  update(id: number) {
    return `This action updates a #${id} msMovimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} msMovimiento`;
  }

  verificaRetiro(verificaRetiroMovimientoDto: VerificaRetiroMovimientoDto) {
    try {
      return this.clientProxyCooperativa
        .send(
          {
            cmd: config().microservicios.cooperativa.procesos.movimientos
              .usuario.retiro.verifica,
          },
          verificaRetiroMovimientoDto,
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

  private ejecutaMicroServicio<A, B>(cmd: A, objetoTransferencia: B) {
    try {
      return this.clientProxyCooperativa
        .send(
          {
            cmd,
          },
          objetoTransferencia,
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
