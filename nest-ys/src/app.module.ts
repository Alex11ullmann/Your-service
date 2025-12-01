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
      "host": process.env.MYSQL_HOST,
      "port": parseInt(process.env.MYSQL_PORT ?? '3306'),
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSWORD,
      "database": process.env.MYSQL_DB,
      "entities": [ __dirname + 
        "/**/**.entity.{js,ts}"
      ],
      "synchronize": true, //pasarlo a false luego de la primera vez que corremos todo
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
