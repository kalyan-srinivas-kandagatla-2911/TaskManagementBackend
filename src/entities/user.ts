import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../utils/userRole";
import { Task } from "./task";
import bcrypt from "bcryptjs"

 @Entity("User")
 @ObjectType("User")
 export class User extends BaseEntity{
  @BeforeInsert()
  async setPass(){
    this.password = await bcrypt.hash( this.password, 12 )
  }

  @Field((type) => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  offId!: string

  @Field()
  @Column()
  username!: string

  @Field()
  @Column()
  email!:string

  @Column()
  password!: string

  @Field()
  @Column()
  team!: "Team_One" | "Team_Two"

  @Field(() => Role)
  @Column({
    type:"enum",
    enum:Role,
    default:Role.USER
  })
  role!: Role
}




