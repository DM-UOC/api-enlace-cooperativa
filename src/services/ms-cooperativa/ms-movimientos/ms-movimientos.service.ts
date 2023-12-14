import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { CreateImagenDto } from '@models/ms-comun/dto/create-imagen.dto';
import { CreateMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/create-ms-movimiento.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';
import { VerificaRetiroMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/verificaretirno-ms-movimiento.dto';
import { AceptarRetiroMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/aceptar-retiro.ms-movimiento.dto';
import { EliminarRetiroMsMovimientoDto } from '@app/src/models/ms-cooperativa/ms-movimientos/dto/eliminar-retiro.ms-movimiento.dto';

import { ProxyService } from '@services/proxy/proxy.service';

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
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
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
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
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
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
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
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
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
      // * enviando mensaje al MS...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
        this.configService.get(
          'microservicios.cooperativa.procesos.movimientos.usuario.ultimo',
        ),
        id,
      );
    } catch (error) {
      throw error;
    }
  }

  movimientosPorUsuarioId(id: string) {
    try {
      // * enviando mensaje al MS...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
        this.configService.get(
          'microservicios.cooperativa.procesos.movimientos.usuario.todos',
        ),
        id,
      );
    } catch (error) {
      throw error;
    }
  }

  retornaMovimientosPorTipo(msConsultaTipo: string) {
    try {
      // * enviando mensaje al MS...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
        msConsultaTipo,
        {},
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
      // * enviando mensaje al MS...
      return ProxyService.ejecutaMicroServicio(
        this.clientProxyCooperativa,
        this.configService.get(
          'microservicios.cooperativa.procesos.movimientos.usuario.retiro.verifica',
        ),
        verificaRetiroMovimientoDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
