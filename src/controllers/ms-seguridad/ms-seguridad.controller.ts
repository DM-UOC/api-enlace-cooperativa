import { Controller, Get } from '@nestjs/common';

import { MsSeguridadService } from '@services/ms-seguridad/ms-seguridad.service';

@Controller('ms-seguridad')
export class MsSeguridadController {
  
  constructor(private readonly msSeguridadService: MsSeguridadService) {}

  @Get()
  login() {
    return this.msSeguridadService.login();
  }

}
