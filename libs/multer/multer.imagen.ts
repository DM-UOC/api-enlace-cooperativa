import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import * as multer from 'multer';

// * destino...
const pathUpload = path.join(__dirname, '../../../', 'public');
// * extensiones permitidadas...
const extArchivo = ['.jpg', '.jpeg', '.png'];

export const multerImagen = FileInterceptor('imagen', {
  limits: {
    fileSize: 2097152,
  },
  fileFilter: function (req, file, callback) {
    // * verifica si es un archivo de extensión .pdf
    if (!extArchivo.includes(path.extname(file.originalname))) {
      // * seteo de error para recoger en el controlador...
      req['archivoError'] = '¡El archivo debe ser de tipo Imagen, Verifique!';
      // *  error...
      return callback(null, false);
    }
    // * todo ok...
    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // * desestructura el objeto...
      const { body } = req;
      const { identificacion } = body;
      // * si no existe el directorio lo crea...
      if (!existsSync(`${pathUpload}/${identificacion}`))
        mkdirSync(`${pathUpload}/${identificacion}`);
      // carpeta de destino...
      cb(null, `${pathUpload}/${identificacion}`);
    },
    filename: function (req, file, cb) {
      // * recogemos el identificador...
      const { identificador } = req.body;
      // * nombre del archivo a cargar...
      cb(null, `${identificador}${path.extname(file.originalname)}`);
    },
  }),
});
