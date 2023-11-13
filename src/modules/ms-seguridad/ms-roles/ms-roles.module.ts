import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MsRolesController } from '@controllers/ms-seguridad/ms-roles/ms-roles.controller';
import { MsRolesService } from '@services/ms-seguridad/ms-roles/ms-roles.service';
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
  controllers: [MsRolesController],
  providers: [MsRolesService, MsAutorizacionService]
})
export class MsRolesModule {}
