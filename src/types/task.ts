import { Field, InputType } from "type-graphql";

@InputType()
export class createTaskInput{
  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => Date,{ nullable: true })
  deadline!: Date

  @Field()
  assignTeam!: "Team_One" | "Team_Two"
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