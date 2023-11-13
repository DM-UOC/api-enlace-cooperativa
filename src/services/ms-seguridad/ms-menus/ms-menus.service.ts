import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { CreateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/create-ms-menu.dto';
import { UpdateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/update-ms-menu.dto';

import config from '@app/libs/config/config';

@Injectable()
export class MsMenusService {
  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(createMsMenuDto: CreateMsMenuDto) {
    return 'This action adds a new msMenu';
  }

  findAll() {
    return `This action returns all msMenus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} msMenu`;
  }

  update(id: number, updateMsMenuDto: UpdateMsMenuDto) {
    return `This action updates a #${id} msMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} msMenu`;
  }
}
