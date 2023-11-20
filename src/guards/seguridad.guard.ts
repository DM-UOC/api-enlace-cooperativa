/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, from } from 'rxjs';

import { MsAutorizacionService } from '@services/ms-seguridad/ms-autorizacion.service';

@Injectable()
export class SeguridadGuard implements CanActivate {
  
  constructor(
    private msAutorizacionService: MsAutorizacionService
  ) {}

  private retornaProhibicion(res: Response, reject) {
    reject(false);
    return res.status(HttpStatus.UNAUTHORIZED).send('¡No tiene permisos para desplegar la información!');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // * nueva promesa...
    return new Promise((resolve, reject) => {
      // * Express request, response...
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      // * no contiene la propiedad autorizacion...
      if (!request.headers['autorizacion']) return this.retornaProhibicion(response, reject);
      // dividimos el token...
      let autorizacion: string = request.headers['autorizacion'].toString();
      // * recogemos solo la cadena...
      autorizacion = autorizacion.split(' ')[1];
      // * verificamos que exista la cadena...
      if(!autorizacion) return this.retornaProhibicion(response, reject);
      // * agrega la seguridad a un nuevo objeto...
      request["autorizacion"] = this.msAutorizacionService.retornaDecodeJWT(autorizacion);
      // * urserver...
      request["serverurl"] = `${request.protocol}://${request.get('host')}`;
      // * todo ok...
      return resolve(true);
    });
  }
}
