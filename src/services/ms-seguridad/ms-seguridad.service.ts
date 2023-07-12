import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, throwError } from 'rxjs';

import config from '@app/libs/config/config';

@Injectable()
export class MsSeguridadService {

  constructor(
    @Inject(config().microservicios.seguridad.alias)
    private readonly clientProxySeguridad: ClientProxy,
    private readonly configService: ConfigService
  ) {}

  login() {
    try {
      return this.clientProxySeguridad.send(
        { cmd: config().microservicios.seguridad.procesos.login }, 
        {
          correo: 'mail@mail.com',
          clave: '123456'
        }).pipe(
          map(result => {
            console.log("*********************");
          }),
          catchError((error) => {
            return throwError(() => new HttpException('error', 401))
          })
        );
    } catch (error) {
      throw error;
    }
  }

}
