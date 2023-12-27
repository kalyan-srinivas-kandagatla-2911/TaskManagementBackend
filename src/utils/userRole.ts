import { registerEnumType } from "type-graphql";

export enum Role {
  ADMIN="ADMIN",
  TEAM_ONE_HEAD="TEAM_ONE_HEAD",
  TEAM_TWO_HEAD="TEAM_TWO_HEAD",
  USER="USER"
}
  
registerEnumType(Role,{
  name: "Role", 
  description: "set of roles for task_management"
});