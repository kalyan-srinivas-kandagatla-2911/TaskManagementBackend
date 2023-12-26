import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { User } from "../entities/user"
import { AddRecipeInput } from "../types/user";

@Resolver(User)
class UserResolver{
recipesCollection: any;
  
@Query(() => String)
helloworld(){
  return "HELLO WORLD"
}
@Mutation()
addRecipe(@Arg("data") newRecipeData: AddRecipeInput): User {
  // Example implementation
  const user = .create(newRecipeData);
  this.recipesCollection.push(user);
  return user;
}

}
export default UserResolver