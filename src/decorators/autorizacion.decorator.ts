import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Autorizacion = createParamDecorator(
  async (data: unknown, executionContext: ExecutionContext) => {
    // * recoge el request...
    const request = executionContext.switchToHttp().getRequest() as Request;
    // * retorna la información del token de autorización...
    const informacion = request['autorizacion'];
    // * retorna la data...
    return informacion;
  },
);
