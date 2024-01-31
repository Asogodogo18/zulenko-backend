import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Images, Posts, PostsLike, User } from 'src/entity';
import { CommentDto } from 'src/models/comment.dto';
import { PostsDto } from 'src/models/posts.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepo: Repository<Posts>,
    @InjectRepository(Images) private imageRepo: Repository<Images>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(PostsLike) private likeRepo: Repository<PostsLike>,
    private userService: UserService,
  ) {}
  async find_posts() {
    return await this.postRepo.find({
      relations: ['image', 'comments', 'author'],
    });
  }
  async find_posts_by_authorId(id: number) {
    const authorPosts = await this.postRepo.find({
      where: { authorId: id },
      relations: ['image', 'comments'],
    });
    if (!authorPosts) {
      throw new NotFoundException(`${id} ne correspond aucune author`);
    }
    return authorPosts;
  }
  async find_posts_by_id(id: number) {
    return await this.postRepo.findOne({
      where: { id },
      relations: ['image', 'comments', 'author', 'userLikes'],
    });
  }
  async create_posts(posts: PostsDto, user: number, image: any) {
    const postsAuthor = await this.userService.findOneUserById(user);
    // console.log('postsAuthor', postsAuthor);
    const Posts = await this.postRepo.create({ ...posts });
    const Image = this.imageRepo.create({ image_url: image });
    const newPostsImage = this.imageRepo.save(Image);
    const findImagePosts = await this.imageRepo.findOne({
      where: { id: (await newPostsImage).id },
    });
    Posts.image = findImagePosts;
    Posts.authorId = postsAuthor.id;
    Posts.author = postsAuthor;
    // newPosts.publish = new Date();
    Posts.status = true;
    await this.postRepo.save(Posts);
    return {
      message: 'poste avec success',
      Posts,
    };
  }

  async create_posts_comment(
    userId: number,
    postsId: number,
    commentModel: CommentDto,
  ) {
    const currentPosts = await this.find_posts_by_id(postsId);
    const currentAuthor = await this.userService.findOneUserById(userId);
    const newComment = await this.commentRepo.create({ ...commentModel });
    newComment.authorId = currentAuthor.id;
    newComment.postsId = currentPosts.id;
    await this.commentRepo.save(newComment);

    return {
      Message: 'commente avec success',
      newComment,
    };
  }
  async create_posts_like(userId: number, postsId: number) {
    const currentPosts = await this.find_posts_by_id(postsId);
    const currentAuthor = await this.userService.findOneUserById(userId);
    const newLikePosts = await this.likeRepo.create({
      postsId: currentPosts.id,
      userId: currentAuthor.id,
    });
    newLikePosts.status = true;
    await this.likeRepo.save(newLikePosts);
    return {
      message: 'favoris!!!',
      newLikePosts,
    };
  }
  async delete_posts_like(userId: number, postsId: number) {
    const currentPosts = await this.find_posts_by_id(postsId);
    const currentAuthor = await this.userService.findOneUserById(userId);
    const deleteLikePosts = await this.likeRepo.delete({
      postsId: currentPosts.id,
      userId: currentAuthor.id,
      status: false,
    });

    return {
      message: 'supprimer favoris!!!',
      deleteLikePosts,
    };
  }
}
