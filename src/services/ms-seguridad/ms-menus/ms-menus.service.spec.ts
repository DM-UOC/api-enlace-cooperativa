import { Test, TestingModule } from '@nestjs/testing';
import { MsMenusService } from './ms-menus.service';

describe('MsMenusService', () => {
  let service: MsMenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsMenusService],
    }).compile();

    service = module.get<MsMenusService>(MsMenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
