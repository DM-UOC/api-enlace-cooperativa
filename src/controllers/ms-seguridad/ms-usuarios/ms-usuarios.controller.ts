import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Query,
  UseInterceptors,
  Req,
  UsePipes,
  UploadedFiles,
} from '@nestjs/common';
import { Response } from 'express';

import { multerImagen } from '@app/libs/multer/multer.imagen';

import { Autorizacion } from '@decorators/autorizacion.decorator';

import { CreateMsUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/create-ms-usuario.dto';
import { UpdateMsUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/update-ms-usuario.dto';
import { AutorizacionUsuarioDto } from '@app/src/models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';
import { ActualizaUsuarioImagenDto } from '@models/ms-seguridad/ms-usuarios/dto/actualiza-usuarioimagen.dto';
import { RegistraUsuarioCorreoDto } from '@models/ms-seguridad/ms-usuarios/dto/registra-usuario.correo.dto';

import { BodyParamsPipe } from '@pipes/bodyparams/bodyparams.pipe';

import { MsUsuariosService } from '@services/ms-seguridad/ms-usuarios/ms-usuarios.service';

import { SeguridadGuard } from '@guards/seguridad.guard';

import config from '@app/libs/config/config';

@Controller('ms-usuarios')
export class MsUsuariosController {
  constructor(private readonly msUsuariosService: MsUsuariosService) {}

  @UseGuards(SeguridadGuard)
  @Get()
  findAll(@Res() response: Response) {
    return this.msUsuariosService.findAll().subscribe({
      next(listado) {
        // * responde el token...
        return response.status(HttpStatus.OK).json(listado);
      },
      error(err) {
        return response.status(HttpStatus.BAD_REQUEST).json(err);
      },
    });
  }

  @Get('existe/correo')
  encuentraCorreoUnico(
    @Query('correo') correo: string,
    @Res() response: Response,
  ) {
    return this.msUsuariosService
      .findOne(
        correo,
        config().microservicios.seguridad.procesos.usuarios.correo.unico,
      )
      .subscribe({
        next(resultado) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(resultado);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @Get(':identificacion')
  findOne(@Param('identificacion') identificacion: string) {
    return this.msUsuariosService.findOne(identificacion);
  }

  @UseGuards(SeguridadGuard)
  @Post()
  create(
    @Body() createMsUsuarioDto: CreateMsUsuarioDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msUsuariosService
      .create(createMsUsuarioDto, autorizacionUsuarioDto)
      .subscribe({
        next(usuario) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(usuario);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @UseGuards(SeguridadGuard)
  @UsePipes(new BodyParamsPipe())
  @UseInterceptors(multerImagen)
  @Post('imagen')
  actualizaImagen(
    @Body() actualizaUsuarioImagenDto: ActualizaUsuarioImagenDto,
    @Res() response: Response,
    @Req() request: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    // * recogemos la url...
    const serverUrl = request['serverurl'];
    // * enviamos el mensaje para realizar el proceso de guardado...
    return this.msUsuariosService
      .actualizaImagen(
        actualizaUsuarioImagenDto,
        files,
        serverUrl,
        autorizacionUsuarioDto,
      )
      .subscribe({
        next(usuario) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(usuario);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @Post('nuevo/correo')
  agregaCorreo(
    @Body() registraUsuarioCorreoDto: RegistraUsuarioCorreoDto,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
    @Res() response: Response,
  ) {
    try {
      // * enviamos el mensaje para realizar el proceso de guardado...
      return this.msUsuariosService
        .registraCorreoUsuario(registraUsuarioCorreoDto, autorizacionUsuarioDto)
        .subscribe({
          next(usuario) {
            // * responde el token...
            return response.status(HttpStatus.OK).json(usuario);
          },
          error(err) {
            return response.status(HttpStatus.BAD_REQUEST).json(err);
          },
        });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Patch('actualiza/correo')
  actualizaCorreo(
    @Body() registraUsuarioCorreoDto: RegistraUsuarioCorreoDto,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
    @Res() response: Response,
  ) {
    try {
      // * enviamos el mensaje para realizar el proceso de guardado...
      return this.msUsuariosService
        .registraCorreoUsuario(registraUsuarioCorreoDto, autorizacionUsuarioDto)
        .subscribe({
          next(usuario) {
            // * responde el token...
            return response.status(HttpStatus.OK).json(usuario);
          },
          error(err) {
            return response.status(HttpStatus.BAD_REQUEST).json(err);
          },
        });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @UseGuards(SeguridadGuard)
  @Patch()
  update(
    @Body() updateMsUsuarioDto: UpdateMsUsuarioDto,
    @Res() response: Response,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    return this.msUsuariosService
      .update(updateMsUsuarioDto, autorizacionUsuarioDto)
      .subscribe({
        next(listado) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(listado);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @Patch('inicial')
  registroInicial(
    @Body() updateMsUsuarioDto: UpdateMsUsuarioDto,
    @Res() response: Response,
  ) {
    return this.msUsuariosService
      .registroInicialPin(
        updateMsUsuarioDto,
        config().microservicios.seguridad.procesos.usuario.inicial,
      )
      .subscribe({
        next(listado) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(listado);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @Patch('pin')
  actualizaPin(
    @Body() updateMsUsuarioDto: UpdateMsUsuarioDto,
    @Res() response: Response,
  ) {
    return this.msUsuariosService
      .registroInicialPin(
        updateMsUsuarioDto,
        config().microservicios.seguridad.procesos.usuario.pin,
      )
      .subscribe({
        next(listado) {
          // * responde el token...
          return response.status(HttpStatus.OK).json(listado);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @UseGuards(SeguridadGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.msUsuariosService.remove(+id);
  }
}
