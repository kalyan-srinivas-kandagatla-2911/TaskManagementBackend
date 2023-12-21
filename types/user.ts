import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpInput{
  @Field()
  name!: string
}