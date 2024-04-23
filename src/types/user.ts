import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpInput{
  @Field()
  username!: string

  @Field()
  email!: string

  @Field()
  password!: string

  @Field()
  team!: string

}

@InputType()
export class SignInInput{
  @Field()
  email!: string

  @Field()
  password!: string
  
}

@InputType()
export class TaskAssignUserInput{
  @Field()
  name!: string
}


@InputType()
export class userIdInput{
  @Field()
  user_id!: string
}