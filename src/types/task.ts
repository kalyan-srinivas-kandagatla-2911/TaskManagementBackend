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
export class editTaskInput{

  @Field()
  task_id!: string

  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => Date,{ nullable: true })
  deadline!: Date

  @Field()
  assignTask!: "Team_One" | "Team_Two"
}
