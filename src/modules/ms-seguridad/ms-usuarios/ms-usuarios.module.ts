import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

import { MsUsuariosController } from '@controllers/ms-seguridad/ms-usuarios//ms-usuarios.controller';
import { MsUsuariosService } from '@services/ms-seguridad/ms-usuarios/ms-usuarios.service';
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
  controllers: [MsUsuariosController],
  providers: [MsUsuariosService, MsAutorizacionService]
})
export class MsUsuariosModule {}
