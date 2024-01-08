import { Field, InputType } from "type-graphql";

@InputType()
export class createSubmissonInput{
  @Field(() => [String])
  files!: string[]

  @Field()
  task_id!: string
}

@InputType()
export class modifySubmissionInput{
  @Field()
  files!: string[]

  @Field()
  sub_id!: string
}

@InputType()
export class approveSubmission{
  sub_id!: string
}