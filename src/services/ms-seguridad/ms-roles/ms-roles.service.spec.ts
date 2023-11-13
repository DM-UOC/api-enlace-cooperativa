import { Test, TestingModule } from '@nestjs/testing';
import { MsRolesService } from './ms-roles.service';

describe('MsRolesService', () => {
  let service: MsRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsRolesService],
    }).compile();

    service = module.get<MsRolesService>(MsRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
