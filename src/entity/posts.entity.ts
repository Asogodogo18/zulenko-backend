import { AbstractEntity } from 'src/utils/abstract-entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'posts' })
export class Posts extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tite: string;
  @Column()
  body: string;
  @Column()
  status: boolean;
  //RelationShip
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
  @ManyToOne(() => Comment, (comment) => comment.posts)
  comments: Comment;
//   @ManyToMany(() => User, (users) => users.postsLike, {
//     onDelete: 'NO ACTION',
//     onUpdate: 'NO ACTION',
//   })
  userLike: User[];
}
