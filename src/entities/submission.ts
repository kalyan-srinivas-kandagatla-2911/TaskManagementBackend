import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Task } from "./task";

@ObjectType()
@Entity("Submisson")
export class Submission extends BaseEntity{
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field((type) => User)
  @ManyToOne(() => User, (user : User) => user.submission)
  user!: User

  @Field((type) => Task)
  @ManyToOne(() => Task, (task : Task ) => task.submission)
  task!: Task

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  files!: string[]

  @Field(() => Date)
  @Column()
  submittedAt!: Date
  

}
