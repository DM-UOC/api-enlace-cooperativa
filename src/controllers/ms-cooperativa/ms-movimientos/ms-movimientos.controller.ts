import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UploadedFiles,
  UseGuards,
  UsePipes,
  UseInterceptors,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Response } from 'express';

import { multerImagenTransaccion } from '@app/libs/multer/multer.imagen.transaccion';

import { Autorizacion } from '@decorators/autorizacion.decorator';

import { SeguridadGuard } from '@guards/seguridad.guard';

import { CreateMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/create-ms-movimiento.dto';
import { UpdateMsMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/update-ms-movimiento.dto';
import { AutorizacionUsuarioDto } from '@models/ms-seguridad/ms-usuarios/dto/autorizacion-usuario.dto';
import { VerificaRetiroMovimientoDto } from '@models/ms-cooperativa/ms-movimientos/dto/verificaretirno-ms-movimiento.dto';

import { BodyParamsPipe } from '@pipes/bodyparams/bodyparams.pipe';

import { MsMovimientosService } from '@services/ms-cooperativa/ms-movimientos/ms-movimientos.service';

@Controller('ms-movimientos')
export class MsMovimientosController {
  constructor(private readonly msMovimientosService: MsMovimientosService) {}

  @UseGuards(SeguridadGuard)
  @UsePipes(new BodyParamsPipe())
  @UseInterceptors(multerImagenTransaccion)
  @Post()
  create(
    @Body() createMsMovimientoDto: CreateMsMovimientoDto,
    @Res() response: Response,
    @Req() request: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * recogemos la url...
      const serverUrl = request['serverurl'];
      // * crea el movimiento...
      this.msMovimientosService
        .create(createMsMovimientoDto, files, serverUrl, autorizacionUsuarioDto)
        .subscribe({
          next(movimiento) {
            // * responde el resultado...
            return response.status(HttpStatus.OK).json(movimiento);
          },
          error(err) {
            return response.status(HttpStatus.BAD_REQUEST).json(err);
          },
        });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(SeguridadGuard)
  @Post('retiro')
  crearRetiro(
    @Body() createMsMovimientoDto: CreateMsMovimientoDto,
    @Res() response: Response,
    @Req() request: Request,
    @Autorizacion() autorizacionUsuarioDto: AutorizacionUsuarioDto,
  ) {
    try {
      // * crea el movimiento...
      this.msMovimientosService
        .crearRetiro(createMsMovimientoDto, autorizacionUsuarioDto)
        .subscribe({
          next(movimiento) {
            // * responde el resultado...
            return response.status(HttpStatus.OK).json(movimiento);
          },
          error(err) {
            return response.status(HttpStatus.BAD_REQUEST).json(err);
          },
        });
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.msMovimientosService.findAll();
  }

  @Get('verifica/retiro')
  verificaRetiro(
    @Query() verificaRetiroMovimientoDto: VerificaRetiroMovimientoDto,
    @Res() response: Response,
  ) {
    return this.msMovimientosService
      .verificaRetiro(verificaRetiroMovimientoDto)
      .subscribe({
        next(movimiento) {
          // * responde resultado...
          return response.status(HttpStatus.OK).json(movimiento);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @Get('ultimo')
  ultimoMovimientoPorUsuarioId(
    @Query('id') id: string,
    @Res() response: Response,
  ) {
    return this.msMovimientosService
      .ultimoMovimientoPorUsuarioId(id)
      .subscribe({
        next(movimiento) {
          // * responde resultado...
          return response.status(HttpStatus.OK).json(movimiento);
        },
        error(err) {
          return response.status(HttpStatus.BAD_REQUEST).json(err);
        },
      });
  }

  @Get('movimientos')
  movimientosPorUsuarioId(@Query('id') id: string, @Res() response: Response) {
    return this.msMovimientosService.movimientosPorUsuarioId(id).subscribe({
      next(movimientos) {
        // * responde resultado...
        return response.status(HttpStatus.OK).json(movimientos);
      },
      error(err) {
        return response.status(HttpStatus.BAD_REQUEST).json(err);
      },
    });
  }

  @Get('retiros')
  movimientosRetiros(@Res() response: Response) {
    return this.msMovimientosService.movimientosRetiros().subscribe({
      next(movimientos) {
        // * responde resultado...
        return response.status(HttpStatus.OK).json(movimientos);
      },
      error(err) {
        return response.status(HttpStatus.BAD_REQUEST).json(err);
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.msMovimientosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMsMovimientoDto: UpdateMsMovimientoDto,
  ) {
    return this.msMovimientosService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.msMovimientosService.remove(+id);
  }
}
