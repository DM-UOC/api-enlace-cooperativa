/* eslint-disable prettier/prettier */
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from "fs";

import * as path from 'path';
import * as multer from 'multer';
import moment from 'moment';
import { UtilitariosService } from '@app/src/services/utilitarios/utilitarios.service';

// * destino...
const pathUpload = path.join(__dirname, '../../../', 'public');
// * extensiones permitidadas...
const extArchivo = ['.jpg', '.jpeg', '.png'];

export const  multerImagenTransaccion = AnyFilesInterceptor({
  limits: {
    fileSize: 2097152,
  },
  fileFilter: function (req, file, callback) {
    // * verifica si es un archivo de extensión .pdf
    // * si está bien... retorna true...
    if (extArchivo.includes(path.extname(file.originalname))) return callback(null, true);
    // * seteo de error para recoger en el controlador...
    req['archivoError'] = '¡El archivo debe ser de tipo Imagen, Verifique!';
    // *  error...
    return callback(null, false);
  },
  storage:  multer.diskStorage({
    destination: function (req, file, cb) {
      // * si no existe el directorio lo crea...
      if(!existsSync(`${pathUpload}/${file.fieldname}`)) mkdirSync(`${pathUpload}/${file.fieldname}`);      
      // * carpeta de destino...
      cb(null, `${pathUpload}/${file.fieldname}`);
    },
    filename: function (req, file, cb) {
      // * nombre del archivo a cargar...
      cb(null, `${file.fieldname}_${UtilitariosService.retornaFechaRegistro()}${path.extname(file.originalname)}`);
    },
  })
});
