import { PartialType } from '@nestjs/mapped-types';
import { CreateMsMovimientoDto } from './create-ms-movimiento.dto';

export class UpdateMsMovimientoDto extends PartialType(CreateMsMovimientoDto) {}
