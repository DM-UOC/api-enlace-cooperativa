import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MsCooperativaModule } from '@modules/ms-cooperativa/ms-cooperativa.module';
import { MsSeguridadModule } from '@modules/ms-seguridad/ms-seguridad.module';
import { MsUsuariosModule } from '@modules/ms-seguridad/ms-usuarios/ms-usuarios.module';
import { MsRolesModule } from '@modules/ms-seguridad/ms-roles/ms-roles.module';
import { MsMenusModule } from '@modules/ms-seguridad/ms-menus/ms-menus.module';
import { MsSubmenusModule } from '@modules/ms-seguridad/ms-submenus/ms-submenus.module';
import { MsPrestamosModule } from '@modules/ms-cooperativa/ms-prestamos/ms-prestamos.module';
import { MsMovimientosModule } from '@modules/ms-cooperativa/ms-movimientos/ms-movimientos.module';

import { ProxyService } from '@services/proxy/proxy.service';

import config from '@app/libs/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    MsCooperativaModule,
    MsSeguridadModule,
    MsUsuariosModule,
    MsRolesModule,
    MsMenusModule,
    MsSubmenusModule,
    MsPrestamosModule,
    MsMovimientosModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProxyService],
})
export class AppModule {}
