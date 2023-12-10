import { UtilitariosService } from '@services/utilitarios/utilitarios.service';

export class CreateImagenDto {
  
  private destination: string; // * "/home/usuario/Proyectos/nodejs/servidor/server_cf/api-enlace-cooperativa/public/13561656232"
  private encoding: string; // * "7bit"
  private fieldname: string; // *  "13561656232"
  private filename: string; // * "13561656232.jpeg"
  private mimetype: string; // * "image/jpeg"
  private originalname: string; // * "WhatsApp Image 2023-11-17 at 14.02.51.jpeg"
  private path: string; // * "/home/usuario/Proyectos/nodejs/servidor/server_cf/api-enlace-cooperativa/public/13561656232/13561656232.jpeg"
  private size: number; // * 131101
  private url: string;
  private base64: string;

  constructor(file: Express.Multer.File, serverUrl: string) {
    this.destination = file.destination;
    this.encoding = file.encoding;
    this.fieldname = file.fieldname;
    this.filename = file.filename;
    this.mimetype = file.mimetype;
    this.originalname = file.originalname;
    this.path = file.path;
    this.size = file.size;
    this.base64 = UtilitariosService.retornaArchivoBase64(file.path);
    this.url = `${serverUrl}/${file.fieldname}/${file.filename}`;
  }
}
