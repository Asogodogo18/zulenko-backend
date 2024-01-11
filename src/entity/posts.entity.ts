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
import { Images } from './image.entity';

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
  @Column({ type: 'simple-array' })
  image: Images[];
  //RelationShip
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
  @ManyToOne(() => Comment, (comment) => comment.posts)
  comments: Comment;
  @ManyToMany(() => User, (users) => users.postsLikes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  userLikes: User[];
}
