import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MsMovimientosController } from '@controllers/ms-cooperativa/ms-movimientos/ms-movimientos.controller';

import { MsMovimientosService } from '@services/ms-cooperativa/ms-movimientos/ms-movimientos.service';
import { MsAutorizacionService } from '@services/ms-seguridad/ms-autorizacion.service';

import config from '@app/libs/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config().microservicios.cooperativa.alias,
        transport: Transport.TCP,
        options: {
          host: config().microservicios.cooperativa.nombre,
          port: config().microservicios.cooperativa.puerto,
        },
      },
    ]),
    ConfigModule,
  ],  
  controllers: [MsMovimientosController],
  providers: [MsMovimientosService, MsAutorizacionService],
})
export class MsMovimientosModule {}
