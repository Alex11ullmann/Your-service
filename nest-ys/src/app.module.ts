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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
    }),

    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_ADDON_HOST,
      port: parseInt(process.env.MYSQL_ADDON_PORT ?? '3306'),
      username: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,

      autoLoadEntities: true,
      synchronize: false,

      poolSize: 5,
      maxQueryExecutionTime: 1000,

      extra: {
        connectionLimit: 5,
      },
    }),

    UsuarioModule,
    PerfilModule,
    OficioModule,
    TrabajadorOficioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
