import { Controller, Get, Query } from '@nestjs/common';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { MsCooperativaService } from '@services/ms-cooperativa/ms-cooperativa.service';

@Controller('ms-cooperativa')
export class MsCooperativaController {
  constructor(private readonly msCooperativaService: MsCooperativaService) {}

  @Get()
  autenticar(@Query() autenticacionDto: AutenticacionDto) {
    return this.msCooperativaService.autenticar(autenticacionDto);
  }
}
