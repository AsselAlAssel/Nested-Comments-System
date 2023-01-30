import fastify from "fastify"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import cors from "@fastify/cors"
import sensible from "@fastify/sensible"// for use "to()" function for handel error 
dotenv.config()

const prisma = new PrismaClient() // instance from PrismaClient to access the db and tables and use many functions

const app = fastify()
app.register(sensible)// register its like (use()) in express 
app.register(cors, {
    origin: process.env.CLIENT_URL,
    credentials: true
})

app.get("/posts", async (req, res) => {
    return await commitToDo(prisma.post.findMany({ // i use commitToDo here wrap the promise
        select: { //select the column i want to returned
            id: true,
            title: true
        }
    }))
})

const commitToDo = async (Promise) => {  //helper function for catch all error is the app
    const [error, data] = await app.to(Promise)
    if (error)
        return app.httpErrors.internalServerError(error.message)// return a server error and 500 error
    return data

}

app.listen({ port: process.env.PORT })