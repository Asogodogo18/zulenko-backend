import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDto } from 'src/models/posts.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadStorages } from 'src/utils/uploadStorage';
import { CommentDto } from 'src/models/comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsServices: PostsService) {}

  @Get()
  findAllPosts(){
    return this.postsServices.find_posts()
  }
  @Get(':id/author')
  findPostByAuthorId(@Param('id', ValidationPipe) id) {
    return this.postsServices.find_posts_by_authorId(id);
  }
  @Get(':id')
  findPostsById(@Param('id', ValidationPipe) id) {
    return this.postsServices.find_posts_by_id(id);
  }

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
  @Post(':userId/:postsId/comment')
  createPostsComment(
    @Param('userId', ValidationPipe) userId,
    @Param('postsId', ValidationPipe) postsId,
    @Body() comment:CommentDto,
  ) {
    return this.postsServices.create_posts_comment(userId, postsId, comment);
  }
  @Post(':userId/:postsId/like')
  createPostsLike(
    @Param('userId', ValidationPipe) userId,
    @Param('postsId', ValidationPipe) postsId,
   
  ) {
    return this.postsServices.create_posts_like(userId, postsId);
  }

  @Delete(':userId/:postsId/like')
  deletePostsLike(
    @Param('userId', ValidationPipe) userId,
    @Param('postsId', ValidationPipe) postsId,
   
  ) {
    return this.postsServices.delete_posts_like(userId, postsId);
  }


}
