import { Module } from '@nestjs/common';

import { MsMovimientosController } from '@controllers/ms-cooperativa/ms-movimientos/ms-movimientos.controller';
import { MsMovimientosService } from '@services/ms-cooperativa/ms-movimientos/ms-movimientos.service';

@Module({
  controllers: [MsMovimientosController],
  providers: [MsMovimientosService],
})
export class MsMovimientosModule {}
