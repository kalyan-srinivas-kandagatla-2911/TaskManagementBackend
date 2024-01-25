import { Field, InputType } from "type-graphql";
import { User } from "../entities/user";
import { SignUpInput, TaskAssignUserInput } from "./user";


@InputType()
export class createTaskInput{
  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => Date,{ nullable: true })
  deadline!: Date

  @Field(() => [String])
  assignTaskToUsers!: string[]

}

@InputType()
export class modifyTaskInput{

  @Field()
  task_id!: string

  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => Date,{ nullable: true })
  deadline!: Date

  @Field(() => [String], { nullable: true })
  assignTaskToUsers!: string[]

}
