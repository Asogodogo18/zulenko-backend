import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images, Posts, User } from 'src/entity';
import { PostsDto } from 'src/models/posts.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepo: Repository<Posts>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Images) private imageRepo: Repository<Images>,
    private userService: UserService,
  ) {}

  async findOneUserById(id: number) {
    const userSearch = await this.userRepo.findOne({
      where: { id },
      // relations: ['measure',"posts"],
    });

    if (!userSearch) {
      throw new NotFoundException(
        `${id} ne correspond a aucune enregistrement`,
      );
    } else {
      const { updateAt, createAt, ...user } = userSearch;
      return await user;
    }
  }
  async create_posts(posts: PostsDto, user: number, image: any) {
    const postsAuthor = await this.findOneUserById(user);
    console.log('postsAuthor', postsAuthor);

    const Posts = await this.postRepo.create({ ...posts });

    const Image = this.imageRepo.create({ image_url: image });
    const newPostsImage = this.imageRepo.save(Image);
    const findImagePosts = await this.imageRepo.findOne({
      where: { id: (await newPostsImage).id },
    });
    Posts.image = findImagePosts;
    Posts.author = postsAuthor;
    // Posts.author.nom = postsAuthor.nom;
    // Posts.author.prenom = postsAuthor.prenom;
    // Posts.author.avatar = postsAuthor.avatar;
    // Posts.author.contact = postsAuthor.contact;
    // Posts.author.adress = postsAuthor.adress;
    // Posts.author.username = postsAuthor.username;
    // Posts.author.id = postsAuthor.id;
    // newPosts.publish = new Date();
    Posts.status = true;
    await this.postRepo.save(Posts);
    return {
      message: 'poste avec success',
      Posts,
    };
  }
}
