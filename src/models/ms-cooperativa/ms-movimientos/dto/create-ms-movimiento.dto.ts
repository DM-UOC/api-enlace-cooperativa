import { CreateImagenDto } from '@models/ms-comun/dto/create-imagen.dto';

export class CreateMsMovimientoDto {
  readonly descripcion: string;
  readonly valor: number;
  imagen: CreateImagenDto;
}
