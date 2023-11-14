import { Test, TestingModule } from '@nestjs/testing';
import { MsSubmenusService } from './ms-submenus.service';

describe('MsSubmenusService', () => {
  let service: MsSubmenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsSubmenusService],
    }).compile();

    service = module.get<MsSubmenusService>(MsSubmenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
