import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@ObjectType("Task")
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
  description!: string

  // this column will be nullable true for a while and before deploying backend we have to change it 
  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  deadline!: Date
  // this column will be nullable true for a while and before deploying backend we have to change it 
 
  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  updatedAt!: Date

  @Field(() => User)
  @ManyToOne(() => User, user => user.taskList)
  user!: User

  @Field(() => [User],{ nullable: true })
  @ManyToMany(() => User, user => user.tasks)
  users!: User[]
}

  

  

