import { Test, TestingModule } from '@nestjs/testing';
import { MsPrestamosController } from './ms-prestamos.controller';
import { MsPrestamosService } from './ms-prestamos.service';

describe('MsPrestamosController', () => {
  let controller: MsPrestamosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsPrestamosController],
      providers: [MsPrestamosService],
    }).compile();

    controller = module.get<MsPrestamosController>(MsPrestamosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
