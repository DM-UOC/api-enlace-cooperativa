import { Test, TestingModule } from '@nestjs/testing';
import { MsSubmenusController } from './ms-submenus.controller';
import { MsSubmenusService } from './ms-submenus.service';

describe('MsSubmenusController', () => {
  let controller: MsSubmenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsSubmenusController],
      providers: [MsSubmenusService],
    }).compile();

    controller = module.get<MsSubmenusController>(MsSubmenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
