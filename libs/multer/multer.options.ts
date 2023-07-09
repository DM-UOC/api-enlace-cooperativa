import { FilesInterceptor } from '@nestjs/platform-express';

import { existsSync, mkdirSync } from "fs";
import * as path from "path";
import * as multer from 'multer';
import { Request } from 'express';

const pathUpload = path.join(__dirname, '../../../', 'uploads');
const extArc = ['.pdf', '.p12'];

const multerPdf = FilesInterceptor('archivos', 2, {
  limits: {
    fileSize: 2097152
  },
  fileFilter(req, file, callback) {
    // * verifica si es un archivo de extensión .pdf
    if (!(extArc.includes(path.extname(file.originalname)))) {
      // * seteo de error para recoger en el controlador...
      req.archivoError = '¡El archivo debe ser de extensión ".pdf", Verifique!';
      // *  error...
      return callback(null, false);
    }

    // * recoge el peso del archivo...
    const fileSize = parseInt(req.headers['content-length']);
    // * verifica si el archivo es de hasta 2MB...
    if (fileSize > 2097152) {
      // * seteo de error para recoger en el controlador...
      req.archivoError = '¡El archivo debe tener un peso de 2MB Megabytes. Verifique!';
      // *  error...
      return callback(null, false);
    }
    // todo corecto...
    callback(null, true);
  },   
  storage: multer.diskStorage({
    destination: function (req: Request, file, cb) {
      // * recogemos el nombre del usuario para crear la carpeta donde se subirá los archivos...
      // * desestructura el objeto...
      const { body } = req;
      const { usuario } = body;
      // * si no existe el directorio lo crea...
      if(!existsSync(`${pathUpload}/${usuario}`)) mkdirSync(`${pathUpload}/${usuario}`);
      // carpeta de destino...
      cb(null, `${pathUpload}/${usuario}`)
    },
    filename: function (req, file, cb) {
      // * nombre del archivo a cargar...
      cb(null, `${file.originalname}`)
    }
  })
});

export {
  multerPdf
}