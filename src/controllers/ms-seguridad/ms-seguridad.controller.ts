import { Body, Controller, HttpException, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { UsuarioDto } from '@models/ms-seguridad/usuario/usuario.dto';
import { MsSeguridadService } from '@services/ms-seguridad/ms-seguridad.service';

@Controller('ms-seguridad')
export class MsSeguridadController {
  
  constructor(private readonly msSeguridadService: MsSeguridadService) {}

  @Post()
  autenticacion(@Body() autenticacionDto: AutenticacionDto) {
    try {      
      return this.msSeguridadService
        .autenticacion(autenticacionDto)
        .pipe(
          catchError((error) => {
            return throwError(() => new HttpException(error, HttpStatus.CONFLICT))
          })          
        );
    } catch (error) {
      throw error;
    }
  }

  @Post('crear')
  crearUsuario(@Body() usuarioDto: UsuarioDto) {
    return this.msSeguridadService.crear(usuarioDto);
  }

}
