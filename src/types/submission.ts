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
  @Field(() => [String])
  files!: string[]

  @Field()
  sub_id!: string
}

@InputType()
export class approveSubmissionInput{
  @Field()
  sub_id!: string

  @Field()
  approved!: boolean

}