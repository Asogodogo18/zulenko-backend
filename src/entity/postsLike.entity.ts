import { AbstractEntity } from 'src/utils/abstract-entities';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'posts_like' })
export class PostsLike extends AbstractEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;
  @PrimaryColumn({ name: 'posts_id' })
  postsId: number;
  @Column({ type: 'boolean' })
  status: boolean;
}
