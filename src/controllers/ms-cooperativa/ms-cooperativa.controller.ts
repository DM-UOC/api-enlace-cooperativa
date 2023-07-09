import { Controller } from '@nestjs/common';

import { MsCooperativaService } from '@services/ms-cooperativa/ms-cooperativa.service';

@Controller('ms-cooperativa')
export class MsCooperativaController {
  constructor(private readonly msCooperativaService: MsCooperativaService) {}
}
