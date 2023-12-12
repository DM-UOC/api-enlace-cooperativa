import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ProxyService {
  static ejecutaMicroServicio<A extends ClientProxy, B = string, C = any>(
    clienteProxy: A,
    cmd: B,
    objetoTransferencia: C,
  ) {
    try {
      return clienteProxy
        .send(
          {
            cmd,
          },
          objetoTransferencia,
        )
        .pipe(
          catchError((error) => {
            return throwError(
              () => new HttpException(error, HttpStatus.CONFLICT),
            );
          }),
        );
    } catch (error) {
      throw error;
    }
  }
}
