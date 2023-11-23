import { PartialType } from '@nestjs/mapped-types';
import { CreateMsPrestamoDto } from './create-ms-prestamo.dto';

export class UpdateMsPrestamoDto extends PartialType(CreateMsPrestamoDto) {}
