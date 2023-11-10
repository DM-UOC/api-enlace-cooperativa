import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

import { MsSeguridadController } from '@controllers/ms-seguridad/ms-seguridad.controller';
import { MsSeguridadService } from '@services/ms-seguridad/ms-seguridad.service';
import { MsAutorizacionService } from '@services/ms-seguridad/ms-autorizacion.service';

import config from '@app/libs/config/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config().seguridad.secreto,
      signOptions: {
        expiresIn: config().seguridad.tiempo.caducidad,
      },
    }),
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
  controllers: [MsSeguridadController],
  providers: [MsSeguridadService, MsAutorizacionService],
})
export class MsSeguridadModule {}
