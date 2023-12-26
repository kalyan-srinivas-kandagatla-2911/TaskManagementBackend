import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("Task")
export default class Task extends BaseEntity{
  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  desciption!: string

  @Field()
  @Column()
  assignTask!: "Team_One" | "Team_two"
  
  // this column will be nullable true for a while and before deploying backend we have to change it 
  @Field(() => Date,{ nullable: true })
  @Column({ nullable: true })
  startDate!: Date

  @Field(() => Date,{ nullable: true })
  @Column({ nullable: true })
  endDate!: Date

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  upadatedAt!: Date

  @Field(() => Date, { nullable: true })
  @Column()
  deadline!: Date

  // @Field()
  // @Column()

  
}

