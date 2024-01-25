import "reflect-metadata"
import { DataSource } from "typeorm";
import dotenv from "dotenv"
import http from "http"
import express from "express"
import { buildSchema } from "type-graphql";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import resolvers from "./resolvers/index";
import cors from "cors";
import { json } from "body-parser";
import jwt from "jsonwebtoken"
import { User } from "../src/entities/user"
import entities from "./entities";
import { authChecker } from "./utils/auth";

dotenv.config()

const corsOrigin = ["http://localhost:3000", "http://localhost:9000/graphql"]

const port = process.env.PORT || 9000
const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: resolvers,
    // authChecker: authChecker,
    validate: { forbidUnknownValues: false },
  })

  const app = express();
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
  })
  await server.start()
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin:corsOrigin,
      credentials:true
    }),
    express.json(),
    expressMiddleware(server,{
    context: async ({ req,res }:{req: express.Request,res: express.Response}) => {
      let user: any;
      if (req.headers.cookie) {
        const token  = req.headers.cookie.split("token=")[1]
        console.log(token)
        if(token) {
          console.log("1")
          try {
            console.log("2")
            const decoded = jwt.verify(
              token,
              "jakkas"!
            ) as any;
            console.log(decoded)
            user = await User.findOne({
              where: { id: decoded.id }
            })
            console.log(user)
          } catch(err: any) {
            if(err.message === "jwt malformed") res.clearCookie("token")
          }
        }
      }
      return { req, res, user };
    },
  })
  );
    await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  console.log(`Server ready at http://localhost:${port}/graphql`);
}
const connection = new DataSource({
  type:"postgres",
  host:"localhost",
  port:5432,
  username:process.env.USERNAME,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
  entities:entities,
  logging: true,
  synchronize:true
  
})

connection.initialize()
.then(() => {
  console.log("datasource has been initialized"),
  bootstrap()
})
.catch((err) => {
  console.log("there is err while initializing the project",err)
})

