import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import 'dotenv/config';
import {
  Collection,
  Comment,
  Images,
  Measure,
  Model,
  Posts,
  PostsLike,
  User,
} from 'src/entity';
import * as fs from 'fs';

@Injectable()
export class DbConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Images,
        Collection,
        Comment,
        Model,
        Measure,
        Posts,
        PostsLike,
      ],
      synchronize: true,
      ssl: {
        ca: fs.readFileSync('./src/config/db_cert.pem'), // path to the CA file
      },
    };
  }
}
