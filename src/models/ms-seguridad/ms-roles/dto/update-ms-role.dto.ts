import { PartialType } from '@nestjs/mapped-types';
import { CreateMsRoleDto } from './create-ms-role.dto';

export class UpdateMsRoleDto extends PartialType(CreateMsRoleDto) {
  readonly _id: string;
  readonly menus: string[];
}
