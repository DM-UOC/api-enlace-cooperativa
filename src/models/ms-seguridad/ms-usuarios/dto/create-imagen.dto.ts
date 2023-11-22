export class CreateImagenDto {
  destination: string; // * "/home/usuario/Proyectos/nodejs/servidor/server_cf/api-enlace-cooperativa/public/13561656232"
  encoding: string; // * "7bit"
  fieldname: string; // *  "13561656232"
  filename: string; // * "13561656232.jpeg"
  mimetype: string; // * "image/jpeg"
  originalname: string; // * "WhatsApp Image 2023-11-17 at 14.02.51.jpeg"
  path: string; // * "/home/usuario/Proyectos/nodejs/servidor/server_cf/api-enlace-cooperativa/public/13561656232/13561656232.jpeg"
  size: number; // * 131101
  url: string;
  buffer: Buffer;

  constructor(file: Express.Multer.File, serverUrl: string) {
    this.destination = file.destination;
    this.encoding = file.encoding;
    this.fieldname = file.fieldname;
    this.filename = file.filename;
    this.mimetype = file.mimetype;
    this.originalname = file.originalname;
    this.path = file.path;
    this.size = file.size;
    this.buffer = file.buffer;
    this.url = serverUrl;
  }
}
