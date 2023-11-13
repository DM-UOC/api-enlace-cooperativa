import { Test, TestingModule } from '@nestjs/testing';
import { MsRolesController } from './ms-roles.controller';
import { MsRolesService } from './ms-roles.service';

describe('MsRolesController', () => {
  let controller: MsRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsRolesController],
      providers: [MsRolesService],
    }).compile();

    controller = module.get<MsRolesController>(MsRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
