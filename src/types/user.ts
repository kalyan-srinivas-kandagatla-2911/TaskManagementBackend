import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpInput{
  @Field()
  name!: string
}
// @InputType({ description: "New recipe data" })
// export class AddRecipeInput {
//   @Field()
//   title?: string;

//   @Field({ nullable: true })
//   description?: string;
// }