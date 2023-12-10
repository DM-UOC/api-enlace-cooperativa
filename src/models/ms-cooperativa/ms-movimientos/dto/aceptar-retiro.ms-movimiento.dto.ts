import { CreateImagenDto } from '@models/ms-comun/dto/create-imagen.dto';

export class AceptarRetiroMsMovimientoDto {
  readonly _id: string;
  readonly aprobado: boolean;
  readonly observacion: string;
  imagen: CreateImagenDto;
}
