import { Module } from '@nestjs/common';

import { MsCalculosController } from '@controllers/ms-cooperativa/ms-calculos/ms-calculos.controller';
import { MsCalculosService } from '@services/ms-cooperativa/ms-calculos/ms-calculos.service';

@Module({
  controllers: [MsCalculosController],
  providers: [MsCalculosService],
})
export class MsCalculosModule {}
