import { AbstractEntity } from 'src/utils/abstract-entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Images } from './image.entity';

@Entity()
export class Model extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'simple-array' })
  variants: Images[];
}
