import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@app/src/app.module';

import config from '@app/libs/config/config';
import { Globals } from '@app/libs/config/globals';
declare const global: Globals;

async function bootstrap() {
  // * instancia aplicación...
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // * configuraciones yaml...
  global.$config = config();
  // * habilita cors...
  app.enableCors();
  // * levanta el servidor...
  await app.listen(config().port, () => {
    // * mensaje de conexión...
    console.log(config().cadenas.mensajes.api);
  });
}

bootstrap();
