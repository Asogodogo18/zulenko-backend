import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from 'Db.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbConfig,
    }),
    AuthModule,
    UserModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
