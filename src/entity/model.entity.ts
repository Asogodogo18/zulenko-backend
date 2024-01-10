import { AbstractEntity } from "src/utils/abstract-entities";
import {  Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Model extends AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number
}