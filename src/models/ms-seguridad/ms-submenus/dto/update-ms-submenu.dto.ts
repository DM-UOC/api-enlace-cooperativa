import { PartialType } from '@nestjs/mapped-types';
import { CreateMsSubmenuDto } from './create-ms-submenu.dto';

export class UpdateMsSubmenuDto extends PartialType(CreateMsSubmenuDto) {
  readonly _id: string;
}
