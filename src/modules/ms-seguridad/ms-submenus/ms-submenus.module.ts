import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

import { MsSubmenusController } from '@controllers/ms-seguridad/ms-submenus/ms-submenus.controller';
import { MsSubmenusService } from '@services/ms-seguridad/ms-submenus/ms-submenus.service';
import { MsAutorizacionService } from '@services/ms-seguridad/ms-autorizacion.service';

import config from '@app/libs/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config().microservicios.seguridad.alias,
        transport: Transport.TCP,
        options: {
          host: config().microservicios.seguridad.nombre,
          port: config().microservicios.seguridad.puerto,
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [MsSubmenusController],
  providers: [MsSubmenusService, MsAutorizacionService],
})
export class MsSubmenusModule {}
