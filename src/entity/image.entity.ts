import { AbstractEntity } from 'src/utils/abstract-entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Images extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image_url: string;
}
