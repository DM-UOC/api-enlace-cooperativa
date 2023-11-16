import { PartialType } from '@nestjs/mapped-types';

import { CreateMsUsuarioDto } from './create-ms-usuario.dto';
import { CreateCodigoDto } from './create-codigo.dto';
import { CreateClaveDto } from './create-clave.dto';

export class UpdateMsUsuarioDto extends PartialType(CreateMsUsuarioDto) {
  _id: string;
  roles: string[];
  correos?: CreateCodigoDto[];
  claves?: CreateClaveDto[];
}
