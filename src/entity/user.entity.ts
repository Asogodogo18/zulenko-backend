import { AbstractEntity } from 'src/utils/abstract-entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Measure } from './measure.entity';
import { Posts } from './posts.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  nom: string;
  @Column({ nullable: true })
  prenom: string;
  @Column({ unique: true })
  contact: number;
  @Column({ nullable: true })
  avatar: string;
  @Column({ nullable: true })
  adress: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  salt?: string;

  //RelationShip
  @OneToOne(() => Measure, (measures) => measures.client)
  @JoinColumn()
  measure: Measure;
  @OneToMany(() => Posts, (post) => post.author)
  posts: Posts[];
  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];
  // @ManyToMany(() => Posts, (posts) => posts.userLike,{onDelete:'NO ACTION',onUpdate:'NO ACTION'})
  // @JoinTable({
  //   name: 'posts_like',
  //   joinColumn: {
  //     name: 'user_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'posts_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  postsLike: Posts[];
}
