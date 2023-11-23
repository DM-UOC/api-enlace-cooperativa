import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { catchError, throwError } from 'rxjs';

import { CreateImagenDto } from '@models/ms-comun/dto/create-imagen.dto';
import { CreateMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/create-ms-movimiento.dto';
import { UpdateMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/update-ms-movimiento.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';

import config from '@app/libs/config/config';

@Injectable()
export class MsMovimientosService {
  constructor(
    @Inject(config().microservicios.cooperativa.alias)
    private readonly clientProxySeguridad: ClientProxy,
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
      return this.clientProxySeguridad
        .send(
          {
            cmd: config().microservicios.cooperativa.procesos.movimientos
              .usuario.crear,
          },
          {
            ...createMsMovimientoDto,
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

  findAll() {
    return `This action returns all msMovimientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} msMovimiento`;
  }

  update(id: number, updateMsMovimientoDto: UpdateMsMovimientoDto) {
    return `This action updates a #${id} msMovimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} msMovimiento`;
  }
}
