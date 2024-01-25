import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images, Posts, User } from 'src/entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Posts, Images]),
    forwardRef(() => UserModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
