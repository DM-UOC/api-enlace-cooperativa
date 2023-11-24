import { Injectable } from '@nestjs/common';

import { readFileSync, writeFileSync, createReadStream, rmSync } from 'fs';
import * as moment from 'moment';
import { join, extname } from 'path';

import { Globals } from '@app/libs/config/globals';
declare const global: Globals;

@Injectable()
export class UtilitariosService {
  static FORMATOS = {
    FECHA: {
      YYYYMMDD_HHMM: 'YYYY-MM-DD HH:mm',
    },
    FECHA_ARCHIVO: {
      YYYYMMDD_HHMM: 'YYYYMMDD_HHmm',
    },
  };

  static MENSAJES = {
    FECHA: {
      FORMATO: {
        MMDD: {
          INCORRECTO: 'Formato incorrecto para fecha: -MM-DD',
        },
      },
    },
    EMAIL: {
      REGEXP: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      MENSAJE: {
        INCORRECTO: 'El e-mail es incorrecto',
      },
    },
  };

  static retornaFechaActual() {
    return moment().format(UtilitariosService.FORMATOS.FECHA.YYYYMMDD_HHMM);
  }

  static retornaFechaRegistro(): string {
    return moment().format(
      UtilitariosService.FORMATOS.FECHA_ARCHIVO.YYYYMMDD_HHMM,
    );
  }

  static verificaFechas(fechaComparar: Date, esMayor = false) {
    // * false -> la fecha Actual > a la indicada...
    if (!esMayor) return moment().isAfter(moment(fechaComparar));
    // * true -> la fecha actual < a la indicada...
    if (esMayor) return moment().isBefore(moment(fechaComparar));
  }

  static retornaRutaRaizProyecto() {
    // retornando la ruta raiz del proyecto...
    return `${join(`${__dirname}`, '../', '../', '../', '../')}`;
  }

  static retornaRutaCarpetaUploads(ruta: string) {
    // desestructura el objeto...
    const { carpetas } = global.$config;
    const { publicas } = carpetas;
    const { uploads } = publicas;
    // retornando la ruta raiz del proyecto...
    return `${ruta}${uploads}`;
  }

  static retornaRutaCarpetaPublica() {
    // desestructura el objeto...
    const { carpetas } = global.$config;
    const { publicas } = carpetas;
    const { publica } = publicas;
    // retornando la ruta raiz del proyecto...
    return `/${publica}`;
  }

  static retornaArchivoBase64(pathFile: string) {
    try {
      // lee el archivo...
      return readFileSync(pathFile).toString('base64');
    } catch (error) {
      throw error;
    }
  }

  static retornaRutaDescargaArchivo(usuario: string, nombreArchivo: string) {
    return join(
      UtilitariosService.retornaRutaCarpetaUploads(
        UtilitariosService.retornaRutaRaizProyecto(),
      ),
      usuario,
      nombreArchivo,
    );
  }

  static retornaBufferArchivo(pathFile: string) {
    try {
      // lee el archivo...
      return readFileSync(pathFile);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param usuario
   * @returns void
   * TODO; Elimina la carpeta del usuario una vez descargado...
   */
  static eliminaCarpetaUsuarioDescarga(usuario: string) {
    rmSync(
      join(
        UtilitariosService.retornaRutaCarpetaUploads(
          UtilitariosService.retornaRutaRaizProyecto(),
        ),
        usuario,
      ),
      {
        force: true,
        recursive: true,
      },
    );
  }

  static retornaRutaPorExtension(
    archivos: Array<Express.Multer.File>,
    extArc: Array<string> = ['.pdf'],
  ) {
    // * retornando el archivo p12...
    return archivos.find((archivo) =>
      extArc.includes(extname(archivo.originalname)),
    );
  }

  static retornaArchivoStream(rutaArchivo: string) {
    return createReadStream(rutaArchivo);
  }

  static retornaBufferDesdeBase64(strBase64: string) {
    return Buffer.from(strBase64, 'base64');
  }

  static creaArchivoDesdeBufferServidor(ruta: string, archivo: Buffer) {
    writeFileSync(ruta, archivo);
  }

  static verificaPesoMegaBytesCadenaBase64(strBase64: string) {
    // recogemos el buffer y retornamos el peso en MB...
    return Buffer.from(strBase64, 'base64').length / 1e6;
  }

  static retornaCadenaMensajes(objetoConfiguracion: any) {
    try {
      /**
       * * desestructura objeto de configuracion yml...
       */
      const { mensajes, microservicio } = objetoConfiguracion;
      const { archivo, errores } = mensajes;
      // retornamos los diferentes mensajes...
      return {
        microservicio,
        archivo,
        errores,
      };
    } catch (error) {
      throw error;
    }
  }
}
