import { Injectable } from '@nestjs/common';

import { CreateMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/create-ms-prestamo.dto';
import { UpdateMsPrestamoDto } from '@models/ms-cooperativa/ms-prestamos/dto/update-ms-prestamo.dto';

@Injectable()
export class MsPrestamosService {
  create(createMsPrestamoDto: CreateMsPrestamoDto) {
    return 'This action adds a new msPrestamo';
  }

  findAll() {
    return `This action returns all msPrestamos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} msPrestamo`;
  }

  update(id: number, updateMsPrestamoDto: UpdateMsPrestamoDto) {
    return `This action updates a #${id} msPrestamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} msPrestamo`;
  }
}
