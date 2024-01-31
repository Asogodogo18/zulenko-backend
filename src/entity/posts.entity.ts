import { AbstractEntity } from 'src/utils/abstract-entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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
  title: string;
  @Column()
  body: string;
  @Column()
  status: boolean;
  @Column()
  authorId: number;
  // @Column({ type: 'date',nullable:true })
  // publish: Date;
  //RelationShip
  @OneToOne(() => Images, (image) => image.postImage)
  @JoinColumn({ name: 'posts_image_id' })
  image: Images;
  @ManyToOne(() => User, (user) => user.userPosts)
  @JoinColumn({ name: 'author_id' })
  author: User;
  @ManyToMany(() => User, (users) => users.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  
  comments: Comment[];
  @ManyToMany(() => User, (users) => users.postsLikes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  userLikes: User[];
}
