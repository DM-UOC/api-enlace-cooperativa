import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { AutenticacionDto } from '@models/ms-seguridad/autenticacion/autenticacion.dto';
import { UsuarioDto } from '@models/ms-seguridad/usuario/usuario.dto';
import { MsSeguridadService } from '@services/ms-seguridad/ms-seguridad.service';

@Controller('ms-seguridad')
export class MsSeguridadController {
  
  constructor(private readonly msSeguridadService: MsSeguridadService) {}

  @Post()
  autenticacion(@Query() autenticacionDto: AutenticacionDto) {
    try {      
      console.log("enlace...")
      return this.msSeguridadService.autenticacion(autenticacionDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('crear')
  crearUsuario(@Body() usuarioDto: UsuarioDto) {
    return this.msSeguridadService.crear(usuarioDto);
  }

}
