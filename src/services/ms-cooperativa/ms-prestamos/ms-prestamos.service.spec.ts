import { Test, TestingModule } from '@nestjs/testing';
import { MsPrestamosService } from './ms-prestamos.service';

describe('MsPrestamosService', () => {
  let service: MsPrestamosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsPrestamosService],
    }).compile();

    service = module.get<MsPrestamosService>(MsPrestamosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
