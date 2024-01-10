import { AbstractEntity } from "src/utils/abstract-entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"collection"})
export class Collection extends AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
}