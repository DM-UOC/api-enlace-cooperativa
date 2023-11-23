import { Module } from '@nestjs/common';

import { MsPrestamosController } from '@controllers/ms-cooperativa/ms-prestamos//ms-prestamos.controller';
import { MsPrestamosService } from '@services/ms-cooperativa/ms-prestamos/ms-prestamos.service';

@Module({
  controllers: [MsPrestamosController],
  providers: [MsPrestamosService],
})
export class MsPrestamosModule {}
