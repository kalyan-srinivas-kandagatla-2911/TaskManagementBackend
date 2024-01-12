import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Submission } from "../entities/submission";
import { approveSubmissionInput, createSubmissonInput, modifySubmissionInput } from "../types/submission";
import { Task } from "../entities/task";
import { User } from "../entities/user";
import { DateMock } from "graphql-scalars";

@Resolver(Submission)
export default class submissionResolver{

  @Mutation(() => Submission)
  async createSubmission(
    @Arg("data") data: createSubmissonInput,
    @Arg("user_id") user_id: string 
  ){
    const user = await User.findOne({ where :{ id: user_id } })
    if(!user) throw new Error("please get authenticated")
    const task = await Task.findOneOrFail({ where:{ id: data.task_id } })
    if(!task) throw new Error("This is not your Task")
    const date = new Date()
    const submission = Submission.create({
      submittedBy: user,
      task,
      files: data.files,
      submittedAt: date,
      updatedSubmissionAt:date
    })
    await submission.save()
    return submission
  }

  @Mutation(() => Boolean)
  async modifySubmissionInput(
    @Arg("data") data: modifySubmissionInput
  ){
    const date = new Date()
    const ifSubmission = await Submission.findOneOrFail({ where:{ id: data.sub_id } })
    const { affected } = await Submission.update(ifSubmission.id,{
      files: data.files,
      updatedSubmissionAt: date
    })
    return affected === 1
  }

  @Query(() => [Submission])
  async getSubmissions(){
    const submissions = await Submission.find({ relations:["assignedBy", "task"] })
    return submissions
  }

  @Mutation(() => Boolean)
  async approveSubmssion(
    @Arg("data") data: approveSubmissionInput 
  ){
    const ifSubmission = await Submission.findOne({ where:{ id: data.sub_id }, relations:["submittedBy"] })
    if(!ifSubmission) throw new Error("Submission doesn't exist")
    if(data.approved === true) await Submission.update(ifSubmission.id,{
      approved: true
    })
    return true

  }

  @Query(() => [Submission])
  async getUserSubmissions(
    @Arg("user_id") user_id: string
  ){
    const ifUser = await User.findOne({ where:{ id: user_id } })
    if(!ifUser) throw new Error("create an account ")
    // const usersubs = new Array<Submission>()
    // if(ifUser.submission){
    //   await Promise.all(
    //     ifUser.submission.map(async (sub) => {
    //       const subs = await Submission.findOneOrFail({ where:{ id:sub.id } , relations:["task", "submittedBy"]})
    //       usersubs.push(subs)
    //     })
    //   )
    //   return usersubs
    // }
    // if(ifUser.submission){
      const usersubs = await Submission.find({ where:{ submittedBy:{ id: user_id } } , relations:["submittedBy"]})
      return usersubs 
    // }
  }
  
  @Query(() => [Submission])
  // the submissions that are submiited by yser and those that are approved are fetched
  async getApprovedUserSubmissions(
    @Arg("user_id") user_id: string
  ){
    const ifUser = await User.findOne({ where:{ id: user_id } ,relations:["submission"]})
    if(!ifUser) throw new Error("not authenticated")
    // const approvedUserSubs : Submission[] = []
    // if(ifUser.submission){
    //   await Promise.all(
    //     ifUser.submission.map(async (sub) => {
    //       const submi = await Submission.findOneOrFail({ where:{ id: sub.id }, relations:["task", "submittedBy"] })
    //       if(submi.approved === true) approvedUserSubs.push(submi)
    //     })
    //   )
    // }
    const approvedUserSubs = await Submission.find({ where:{ submittedBy:{ id: user_id },approved:true } , relations:["submittedBy"]})
    return approvedUserSubs
  }
  

  // @Query(() => [Submission])
  // async getSubmissionsDoneByUsertoWhomIassignedTaskTo(
  //   @Arg("user_id") user_id:string
  // ){

  // }
}


