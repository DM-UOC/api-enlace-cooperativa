import { Test, TestingModule } from '@nestjs/testing';
import { MsMovimientosService } from './ms-movimientos.service';

describe('MsMovimientosService', () => {
  let service: MsMovimientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsMovimientosService],
    }).compile();

    service = module.get<MsMovimientosService>(MsMovimientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
