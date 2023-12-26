import { Query, Resolver } from "type-graphql"
import { User } from "../entities/user"

@Resolver(User)
class UserResolver{
  
@Query(() => String)
helloworld(){
  return "HELLO WORLD"
}
}
export default UserResolver