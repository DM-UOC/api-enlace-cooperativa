import { Controller, Get, Query } from '@nestjs/common';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { MsSeguridadService } from '@services/ms-seguridad/ms-seguridad.service';

@Controller('ms-seguridad')
export class MsSeguridadController {
  
  constructor(private readonly msSeguridadService: MsSeguridadService) {}

  @Get()
  autenticacion(@Query() autenticacionDto: AutenticacionDto) {
    return this.msSeguridadService.autenticacion(autenticacionDto);
  }

}
