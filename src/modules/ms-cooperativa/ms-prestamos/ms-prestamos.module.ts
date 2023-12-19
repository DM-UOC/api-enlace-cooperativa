import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

import { MsPrestamosController } from '@controllers/ms-cooperativa/ms-prestamos//ms-prestamos.controller';
import { MsPrestamosService } from '@services/ms-cooperativa/ms-prestamos/ms-prestamos.service';

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
  controllers: [MsPrestamosController],
  providers: [MsPrestamosService],
})
export class MsPrestamosModule {}
