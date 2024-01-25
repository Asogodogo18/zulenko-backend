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
import * as bcrypt from 'bcrypt';

import { Measure } from './measure.entity';
import { Posts } from './posts.entity';
import { Comment } from './comment.entity';
import { Role } from 'src/interface';
import { Collection } from './collection.entity';
import { Images } from './image.entity';

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
  @Column()
  avatar: string;
  @Column({ nullable: true })
  adress: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  salt?: string;
  @Column({ type: 'enum', enum: Role, default: Role.CLIENT })
  role: Role;
  async comparePassword(attemp: string) {
    return await bcrypt.compare(attemp, this.password);
  }

  //RelationShip

  @OneToOne(() => Measure, (measures) => measures.client)
  @JoinColumn()
  measure: Measure;
  @OneToMany(() => Posts, (post) => post.author)
  userPosts: Posts[];
  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];
  @OneToMany(() => Collection, (collections) => collections.author)
  collection: Collection;

  @ManyToMany(() => Posts, (posts) => posts.userLikes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'posts_like',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'posts_id',
      referencedColumnName: 'id',
    },
  })
  postsLikes: Posts[];
}
