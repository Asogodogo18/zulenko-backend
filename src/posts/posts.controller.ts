import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDto } from 'src/models/posts.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadStorages } from 'src/utils/uploadStorage';

@Controller('posts')
export class PostsController {
  constructor(private postsServices: PostsService) {}

  @Post(':user')
  @UseInterceptors(FilesInterceptor('image', 6, UploadStorages))
  create_Posts(
    @Param('user', ValidationPipe) user,
    @Body() posts: PostsDto,
    @UploadedFiles() postsImage,
  ) {
    console.log('postsImage', postsImage);

    const response = [];
    postsImage.forEach((file) => {
      const fileReponse = {
        image: file.originalname,
        id: file.filename,
      };
      response.push(fileReponse.id);
    });
    return this.postsServices.create_posts(posts, user, response);
  }
}
