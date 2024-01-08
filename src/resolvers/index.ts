import submissionResolver from "./submission";
import TaskResolver from "./task";
import UserResolver from "./user";

export default [UserResolver, TaskResolver, submissionResolver] as const 