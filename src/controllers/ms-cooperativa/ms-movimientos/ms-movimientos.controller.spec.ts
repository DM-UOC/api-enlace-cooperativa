import { Test, TestingModule } from '@nestjs/testing';
import { MsMovimientosController } from './ms-movimientos.controller';
import { MsMovimientosService } from './ms-movimientos.service';

describe('MsMovimientosController', () => {
  let controller: MsMovimientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsMovimientosController],
      providers: [MsMovimientosService],
    }).compile();

    controller = module.get<MsMovimientosController>(MsMovimientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
