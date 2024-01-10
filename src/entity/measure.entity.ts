import { AbstractEntity } from "src/utils/abstract-entities";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:"measure"})
export class Measure extends AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    chest:number
    @Column()
    waist:number
    @Column()
    hips:number
    @Column()
    arm_lenght_short:number
    @Column()
    arm_lenght_long:number
    @Column()
    arm_circumference:number
    @Column()
    leg_lenght:number
    @Column()
    shoulders:number
    @Column()
    collar:number
    @Column()
    head_circumference:number
    @Column()
    inseam:number
    @Column()
    height:number
    @Column()
    tigh_lenght:number
    //RelationShip
    @OneToOne(()=>User,users=>users.measure)
    
    client:User
}