import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { CreateMsCalculoDto } from '@models/ms-cooperativa/ms-calculos/dto/create-ms-calculo.dto';
import { UpdateMsCalculoDto } from '@models/ms-cooperativa/ms-calculos//dto/update-ms-calculo.dto';

import config from '@app/libs/config/config';

@Injectable()
export class MsCalculosService {
  constructor(
    @Inject(config().microservicios.cooperativa.alias)
    private readonly clientProxyCooperativa: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  create(createMsCalculoDto: CreateMsCalculoDto) {
    return 'This action adds a new msCalculo';
  }

  findAll() {
    return `This action returns all msCalculos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} msCalculo`;
  }

  update(id: number, updateMsCalculoDto: UpdateMsCalculoDto) {
    return `This action updates a #${id} msCalculo`;
  }

  remove(id: number) {
    return `This action removes a #${id} msCalculo`;
  }
}
