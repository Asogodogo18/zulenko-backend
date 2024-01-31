import { AbstractEntity } from 'src/utils/abstract-entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Posts } from './posts.entity';

@Entity({ name: 'commentaire' })
export class Comment {
  @PrimaryColumn({ name: 'author_id' })
  authorId: number;
  @PrimaryColumn({ name: 'posts_id' })
  postsId: number;
  @Column()
  body: string;


}
