import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MsCooperativaController } from '@controllers/ms-cooperativa/ms-cooperativa.controller';
import { MsCooperativaService } from '@services/ms-cooperativa/ms-cooperativa.service';

import config from '@app/libs/config/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config().microservicios.archivos.alias,
        transport: Transport.TCP,
        options: {
          host: config().microservicios.archivos.nombre,
          port: config().microservicios.archivos.puerto
        },
      },
    ]),
    ConfigModule,
  ],  
  controllers: [MsCooperativaController],
  providers: [MsCooperativaService]
})
export class MsCooperativaModule {}
