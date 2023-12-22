import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { CreateMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/create-ms-prestamo.dto';
import { UpdateMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/update-ms-prestamo.dto';
import { ValidacionMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/validacion-ms-prestamo.dto';

import { ProxyService } from '@services/proxy/proxy.service';

import config from '@app/libs/config/config';

@Injectable()
export class MsPrestamosService {
  constructor(
    @Inject(config().microservicios.cooperativa.alias)
    private readonly clientProxyCooperativa: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(createMsPrestamoDto: CreateMsPrestamoDto) {
    try {
      // * enviando mensaje al MS...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
        this.configService.get(
          'microservicios.cooperativa.procesos.prestamos.crear',
        ),
        createMsPrestamoDto,
      );
    } catch (error) {
      throw error;
    }
  }

  validacion(validacionMsPrestamoDto: ValidacionMsPrestamoDto) {
    try {
      // * enviando mensaje al MS...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
        this.configService.get(
          'microservicios.cooperativa.procesos.prestamos.validacion',
        ),
        validacionMsPrestamoDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
