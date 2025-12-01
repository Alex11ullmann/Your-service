/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsuarioModule } from "./usuario/usuario.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerfilModule } from "./perfil/perfil.module";
import { OficioModule } from "./oficio/oficio.module";
import { TrabajadorOficioModule } from './trabajador-oficio/trabajador-oficio.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "660431",
      "database": "your_service",
      "entities": [
        "dist/**/*.entity{.ts,.js}"
      ],
      "synchronize": true,
    }),

    UsuarioModule,
    PerfilModule,
    OficioModule,
    TrabajadorOficioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
