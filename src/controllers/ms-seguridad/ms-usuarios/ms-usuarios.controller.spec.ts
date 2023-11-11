import { Test, TestingModule } from '@nestjs/testing';

import { MsUsuariosController } from '@controllers/ms-seguridad/ms-usuarios/ms-usuarios.controller';
import { MsUsuariosService } from '@services/ms-seguridad/ms-usuarios/ms-usuarios.service';

describe('MsUsuariosController', () => {
  let controller: MsUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsUsuariosController],
      providers: [MsUsuariosService],
    }).compile();

    controller = module.get<MsUsuariosController>(MsUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
