import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MsCooperativaModule } from '@modules/ms-cooperativa/ms-cooperativa.module';
import { MsSeguridadModule } from '@modules/ms-seguridad/ms-seguridad.module';

@Module({
  imports: [MsCooperativaModule, MsSeguridadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
