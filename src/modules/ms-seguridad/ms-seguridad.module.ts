import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { MsSeguridadController } from '@controllers/ms-seguridad/ms-seguridad.controller';
import { MsSeguridadService } from '@services/ms-seguridad/ms-seguridad.service';

import config from '@app/libs/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config().microservicios.seguridad.alias,
        transport: Transport.TCP,
        options: {
          host: config().microservicios.seguridad.nombre,
          port: config().microservicios.seguridad.puerto
        },
      },
    ]),
    ConfigModule
  ],
  controllers: [MsSeguridadController],
  providers: [MsSeguridadService]
})
export class MsSeguridadModule {}
