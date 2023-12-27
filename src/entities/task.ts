import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("Task")
export class Task extends BaseEntity{
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  desciption!: string

  // this column will be nullable true for a while and before deploying backend we have to change it 
  @Field(() => Date, { nullable: true })
  @Column()
  deadline!: Date
  // this column will be nullable true for a while and before deploying backend we have to change it 
 
  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  updatedAt!: Date

}

  

  

