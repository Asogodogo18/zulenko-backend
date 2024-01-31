import { AbstractEntity } from 'src/utils/abstract-entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Posts } from './posts.entity';

@Entity()
export class Images extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image_url: string;
  @OneToOne(() => Posts, (post) => post.image)
  // @JoinColumn({ name: 'posts_Image' })
  postImage: Posts;
}
