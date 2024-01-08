import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Submission } from "../entities/submission";
import { createSubmissonInput, modifySubmissionInput } from "../types/submission";
import { Task } from "../entities/task";
import { User } from "../entities/user";

@Resolver(Submission)
export default class submissionResolver{

  @Mutation(() => Submission)
  async createSubmission(
    @Arg("data") data: createSubmissonInput
  ){
    // tasks : get Assignedtome 
    const user = await User.findOne({ where :{ tasks:{ id: data.task_id } } })
    if(!user) throw new Error("please get authenticated")
    const task = await Task.findOneOrFail({ where:{ id: data.task_id } })
    if(!task) throw new Error("This is not your Task")
    const date = new Date()
    const submission = Submission.create({
      user,
      task, 
      submittedAt: date,
      files: data.files
    })
    await submission.save()
    return submission
  }

  @Mutation(() => Boolean)
  async modifySubmissionInput(
    @Arg("data") data: modifySubmissionInput
  ){
    const submission = await Submission.findOneOrFail({ where:{ id: data.sub_id } })
    const { affected } = await Submission.update(submission.id,{
      files: data.files
    })
    return affected === 1
  }

  @Query(() => [Submission])
  async getSubmissions(){
    const submissions = await Submission.find({ relations:["user", "task"] })
    return submissions
  }

  @Mutation(() => Boolean)
  async approveSubmssion(
    @Arg("sub_id") sub_id: string 
  ){
    const ifSubmission = await Submission.findOneOrFail({ where:{ id: sub_id }, relations:["user"] })
    if(!ifSubmission) return true
    return false 
  }


}

