import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/context";
import { Task } from "../entities/task";
import { createTaskInput, modifyTaskInput } from "../types/task";
import { User } from "../entities/user";
import { In } from "typeorm";
import { modifySubmissionInput } from "../types/submission";
import { userIdInput } from "../types/user";

@Resolver(Task)
class TaskResolver{

  @Mutation(() => Task)
  async createTask(
    @Arg("data") data: createTaskInput,
    @Arg("user_id") user_id: string 
  ){
    const user = await User.findOneOrFail({ where: { id : user_id } })
    const date = new Date()
    const users = await User.findBy({ email: In(data.assignTaskToUsers) })
    console.log(date)
    const task = Task.create({
      ...data,
      assignedBy:user,
      assignedTo:users,
      updatedAt: date,
      createdAt: date
    })
    await task.save()
    return task 
  }

  @Mutation(() => Boolean)
  async modifyTask(
    @Arg("data") data:modifyTaskInput
  ){
    const ifTask = await Task.findOne({ where: { id: data.task_id } })  
    if(!ifTask) throw new Error("please create an Task ")
    const date = new Date()
    const { affected } = await Task.update(ifTask.id,{
      ...data,
      updatedAt:date
    })
    return affected === 1
  }

  
  @Query(() => [Task])
  async getTasksAssignedByMe(
    @Arg("data") data: userIdInput
  ){
    const user = await User.findOne({ where:{ id : data.user_id } })
    if(!user) throw new Error("User not Found")
    const assignedByMe = await Task.find({ where:{ assignedBy:{ id: user.id } }, relations:["assignedTo", "submission"] })
    return assignedByMe
  }

  @Query(() => [Task])
  async getTaskAssignedToMe(
    @Arg("data") data: userIdInput
  ){
    const user = await User.findOne({ where:{ id : data.user_id } })
    if(!user) throw new Error("User not Found")
    const assignedToMe = await Task.find({ where:{ assignedTo:{ id: user.id } }, relations:["assignedTo", "assignedBy", "submission"] })
    return assignedToMe
  }

  @Query(() => [Task])
   async getTasks(
   ){
    const tasks = await Task.find({ relations:["assignedBy", "assignedTo"] })
    return tasks
  }

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

// @Mutation(() => Task)
// async createTask(
//   // @Arg("email") email : string,
//   @Arg("data") data:createTaskInput,
//   // @Ctx() { user } : MyContext
// ){
//   const user = await User.findOne({where:{ email : "shivaram@gmail.com" }})
//   if(!user) throw new Error("create an Accoount")
//   const date  =new Date()
//   const users = await User.findBy({ email : In(data.assignTaskToUsers) })
//   if(!users) throw new Error("Some of the Users are not present to whom you alloted to task to ")
//   const task = Task.create({

//     title:data.title,
//     description: data.description,
//     deadline: data.deadline,
//     assignedBy:user,
//     assignedTo:users, 
//     updatedAt: date
//     })
//     await task.save()
//     return task 
// }


// @Query(() => [Task])
// async getTasksAssignedToMe(
//   @Arg("user_id") user_id: string,
//   ) {
//   const user = await User.findOne({where: { id: user_id }});
//     if (!user) {
//     throw new Error('User not found');
//   }
//   const tasks = await Task.find({ where: { assignedTo: { id: user.id } }, relations:["submission", "assignedTo", "assignedBy"] })

//   return tasks;
// }


// @Query(() => [Task])
// async getTasksAssignedByMe(
//   @Arg("email") email : string
//   // @Ctx() { user } : MyContext
// ){
//   const user = await User.findOne({ where:{ email : email } })
//   if(!user) throw new Error("create an Accoount")
//   const tasks = await Task.find({where: {assignedBy: {id: user.id}}, relations:["assignedTo", "assignedBy", "submission"]})

//   return tasks
// }



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

// @Mutation(() => Boolean)
// async deleteAllTaskscreatedByMe(
//   @Arg("data") data: userIdInput
// ){
//   const user = await User.findOne({ where:{ id: data.user_id } })
//   const tasks = await Task.find({ where:{ assignedBy:{ id: user?.id } } })
  
// }


}

export default TaskResolver
