import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { User } from "../entities/user"
import { SignInInput, SignUpInput } from "../types/user"
import { MyContext } from "../utils/context"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

@Resolver(User)
class UserResolver{
  @Mutation(() => User)
  async signUpUser(
    @Arg("data") data:SignUpInput,
    @Ctx() { res } : MyContext
  ){
    const ifUser = await User.findOne({ where:{ email: data.email } })
    if(ifUser) throw new Error("account already created please login to continue ")
    const totCount = await User.count()
    const offId = "ICSR" + ("000" + (totCount+1)).slice(-2)
    const user = User.create({
      ...data,
      offId
    })
    await user.save()

    let token = jwt.sign({ id: user.id }, "jakkas"!)
    res.cookie("token",token,{ httpOnly: false })

    return user
  }

  @Mutation(() => User)
  async signInUser(
    @Arg("data") data: SignInInput,
    @Ctx() { res } : MyContext
  ){
    const ifUser = await User.findOne({ where: { email: data.email } })
    if(!ifUser) throw new Error("please create an account to continue")
    const ifPassword = await bcrypt.compare(data.password, ifUser.password)
    if(!ifPassword) throw new Error("invalid Crednential")
    
    let token = jwt.sign({ id: ifUser.id }, "jakkas"!)
    res.cookie("token", token, { httpOnly: false })
    
    return ifUser
  }
  @Query(() => User)
  async getMe(
    @Ctx() { user } : MyContext
  ){
    return await User.findOne({ where:{ id: user.id } })
  }
  @Query(() => String)
  helloworld(){
    return "HELLO WORLD"
  }
  
}
export default UserResolver