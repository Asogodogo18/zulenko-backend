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

@Injectable()
export class DbConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.APP_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        User,
        Images,
        Collection,
        Comment,
        Model,
        Measure,
        Posts,
        
      ],
      synchronize: true,
    };
  }
}
