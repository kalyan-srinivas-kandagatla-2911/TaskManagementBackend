import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/context";
import { Task } from "../entities/task";
import { createTaskInput } from "../types/task";
import { User } from "../entities/user";
import { In } from "typeorm";

@Resolver(Task)
class TaskResolver{
// @Mutation(() => Task)
// async createTask(
//   @Arg("data") data:createTaskInput
// ){
//   const date = new Date()
//   // let assignedToUsers[] = data.users[]
//   const task = Task.create({
//     ...data,
//     updatedAt: date,
//     // assignedToUsers: assignedToUsers
//   })
//   await task.save()
//   return task
// }

@Mutation(() => Task)
async createTask(
  @Arg("email") email : string,
  @Arg("data") data:createTaskInput,
  // @Ctx() { user } : MyContext
){
  const user = await User.findOne({where:{ email : email }})
  if(!user) throw new Error("create an Accoount")
  const date  =new Date()
  const users = await User.findBy({ email : In(data.assignTaskToUsers) })
  if(!users) throw new Error("Some of the Users are not present to whom you alloted to task to ")
  const task = Task.create({
    title:data.title,
    description: data.description,
    deadline: data.deadline,
    users:users, 
    user:user,
    updatedAt: date
    })
    await task.save()
    return task 
}

@Query(() => [Task])
 async getTasks(
  @Ctx() { user } : MyContext
 ){
  const tasks = await Task.find()
  return tasks
}

@Query(() => [Task])
async getTasksAssignedToMe(
  @Arg('email') email: string,
  // @Ctx() { user } : MyContext
  ) {
  const user = await User.findOne({where: { email: email }});
    if (!user) {
    throw new Error('User not found');
  }
  const tasks = await User.find({ where:{ tasks:{ id: user.id } } })

  return tasks;
}


@Query(() => [Task])
async getTasksCreatedByMe(
  @Arg("email") email : string
  // @Ctx() { user } : MyContext
){
  const user = await User.findOne({ where:{ email : email } })
  if(!user) throw new Error("create an Accoount")
  const tasks = await Task.find({where: {user: {id: user.id}}})

  return tasks
}


// @Query(() => [Task])
// async getTasksCreatedByMe(
//   @Ctx() { user } : MyContext
// ){
//   const tasks = await User.find({})
//   return tasks
// }
  
// @Query(() => [Task])
// async getTasksAssignedToUsers(){
//   const user = await User.findOneOrFail({ where:{ email :  } , relations:["tasks"]})
// }
// @Query(() => [Task])
// async getTasksAssignedByMe(
//   @Arg("id") id : string,
//   @Ctx() { user } : MyContext
// ){
//   const tasks = await User.find({where: {user: {id: user.id}}, relations:["tasks"]});
//   return tasks 
// }


}

export default TaskResolver
