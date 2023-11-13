import { PartialType } from '@nestjs/mapped-types';
import { CreateMsMenuDto } from './create-ms-menu.dto';

export class UpdateMsMenuDto extends PartialType(CreateMsMenuDto) {}
