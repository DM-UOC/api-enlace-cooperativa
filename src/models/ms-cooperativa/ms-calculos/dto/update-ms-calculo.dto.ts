import { PartialType } from '@nestjs/mapped-types';
import { CreateMsCalculoDto } from './create-ms-calculo.dto';

export class UpdateMsCalculoDto extends PartialType(CreateMsCalculoDto) {}
