import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { CreateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/create-ms-menu.dto';
import { UpdateMsMenuDto } from '@models/ms-seguridad/ms-menus/dto/update-ms-menu.dto';

import { MsMenusService } from '@services/ms-seguridad/ms-menus/ms-menus.service';

import { SeguridadGuard } from '@guards/seguridad.guard';

@UseGuards(SeguridadGuard)
@Controller('ms-menus')
export class MsMenusController {
  constructor(private readonly msMenusService: MsMenusService) {}

  @Post()
  create(@Body() createMsMenuDto: CreateMsMenuDto) {
    return this.msMenusService.create(createMsMenuDto);
  }

  @Get()
  findAll() {
    return this.msMenusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.msMenusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMsMenuDto: UpdateMsMenuDto) {
    return this.msMenusService.update(+id, updateMsMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.msMenusService.remove(+id);
  }
}
