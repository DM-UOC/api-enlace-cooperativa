import { AutorizacionUsuarioDto } from '@app/src/models/ms-seguridad/usuario/dto/autorizacion-usuario.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MsAutorizacionService {
  constructor(private readonly jwtService: JwtService) {}

  retornaDecodeJWT(autorizacion: string): AutorizacionUsuarioDto {
    try {
      return this.jwtService.verify(autorizacion);
    } catch (error) {
      throw error;
    }
  }
}
