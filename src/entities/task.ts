import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Submission } from "./submission";

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

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  createdAt!: Date

  @Field(() => User)
  @ManyToOne(() => User, user => user.taskList)
  assignedBy!: User

  @Field(() => [User])
  @ManyToMany(() => User, assignedTo => assignedTo.tasks)
  assignedTo!: User[]

  @Field(() => [Submission], { nullable: true })
  @OneToMany(() => Submission, (submission) => submission.task)
  @JoinColumn()
  submission!: Submission[]
}

  

  

