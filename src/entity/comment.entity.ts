import { AbstractEntity } from 'src/utils/abstract-entities';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Posts } from './posts.entity';

@Entity({ name: 'comment' })
export class Comment extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  body: string;
  //RelatioShip
  @ManyToOne(() => User, (users) => users.comments)
  user: User;
  @OneToMany(() => Posts, (posts) => posts.comments)
  posts: Posts;
}
