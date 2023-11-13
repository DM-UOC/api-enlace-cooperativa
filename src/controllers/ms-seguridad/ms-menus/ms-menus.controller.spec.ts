import { Test, TestingModule } from '@nestjs/testing';
import { MsMenusController } from './ms-menus.controller';
import { MsMenusService } from './ms-menus.service';

describe('MsMenusController', () => {
  let controller: MsMenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsMenusController],
      providers: [MsMenusService],
    }).compile();

    controller = module.get<MsMenusController>(MsMenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
