import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../utils/userRole";
import { Task } from "./task";

 @Entity("User")
 @ObjectType("User")
 export class User extends BaseEntity{

  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  email!:string

  @Field()
  @Column()
  password!: string

  @Field()
  @Column()
  team!: "Team_One" | "Team_Two"

  @Field(() => Role)
  @Column()
  role!: Role

}



