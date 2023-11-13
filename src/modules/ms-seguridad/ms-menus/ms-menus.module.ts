import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MsMenusController } from '@controllers/ms-seguridad/ms-menus/ms-menus.controller';
import { MsMenusService } from '@services/ms-seguridad/ms-menus/ms-menus.service';
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
  controllers: [MsMenusController],
  providers: [MsMenusService, MsAutorizacionService],
})
export class MsMenusModule {}
