import { AbstractEntity } from 'src/utils/abstract-entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Model } from './model.entity';

@Entity({ name: 'collection' })
export class Collection extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToOne(() => User, (users) => users.collection)
  author: User;
  @Column({ type: 'simple-array' })
  models: Model[];
}
