import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../utils/context";
import { Task } from "../entities/task";
import { createTaskInput } from "../types/task";

@Resolver(Task)
class TaskResolver{
@Authorized(["ADMIN","TEAM_ONE","TEAM_TWO"])
@Mutation(() => Task)
async createTask(
  @Arg("data") data:createTaskInput
){
  const date = new Date()
  const task = Task.create({
    ...data,
    updatedAt: date
  })
  await task.save()
  return task
}

}

export default TaskResolver