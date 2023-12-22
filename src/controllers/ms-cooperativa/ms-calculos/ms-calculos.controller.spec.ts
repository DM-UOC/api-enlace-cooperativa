import { Test, TestingModule } from '@nestjs/testing';
import { MsCalculosController } from './ms-calculos.controller';
import { MsCalculosService } from './ms-calculos.service';

describe('MsCalculosController', () => {
  let controller: MsCalculosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsCalculosController],
      providers: [MsCalculosService],
    }).compile();

    controller = module.get<MsCalculosController>(MsCalculosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
