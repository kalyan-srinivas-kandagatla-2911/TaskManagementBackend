import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../utils/userRole";
import { Task } from "./task";
import bcrypt from "bcryptjs"
import { Submission } from "./submission";

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
  team!: string

  @Field(() => Role)
  @Column({
    type:"enum",
    enum:Role,
    default:Role.USER
  })
  role!: Role

  @Field(() => [Task])
  @ManyToOne(() => Task, taskList => taskList.user)
  @JoinColumn()
  taskList!: Task[]

  @Field(() => [Task])
  @ManyToMany(() => Task, task => task.users)
  @JoinTable()
  tasks!: Task[]

  @Field(() => Submission)
  @OneToMany(() => Submission, (submission) => submission.user)
  @JoinColumn()
  submission!: Submission


}
