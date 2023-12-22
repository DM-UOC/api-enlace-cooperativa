import { Test, TestingModule } from '@nestjs/testing';
import { MsCalculosService } from './ms-calculos.service';

describe('MsCalculosService', () => {
  let service: MsCalculosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsCalculosService],
    }).compile();

    service = module.get<MsCalculosService>(MsCalculosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
