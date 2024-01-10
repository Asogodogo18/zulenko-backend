import {BaseEntity,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from 'typeorm'

export abstract class AbstractEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?:number
    @CreateDateColumn()
    createAt:Date
    @UpdateDateColumn()
    updateAt:Date
    
}