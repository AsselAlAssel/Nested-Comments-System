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

// write api for login
app.post("/login", async (req, res) => {
    const { name, password } = req.body
    return await commitToDo(prisma.user.findFirst({
        where: {
            name: name,
            password: password
        },
        select: {
            id: true,
            name: true
        }
    }))
})






app.get("/posts", async (req, res) => {
    return await commitToDo(prisma.post.findMany({ // i use commitToDo here wrap the promise
        select: { //select the column i want to returned
            id: true,
            title: true
        }
    }))
})
const COMMENT_SELECT_FIELDS = {
    id: true,
    message: true,
    parentId: true,
    createdAt: true,
    user: {
        select: {
            id: true,
            name: true
        }
    }
}
app.get("/post/:id", async (req, res) => {
    return await commitToDo(prisma.post.findUnique({
        where: {
            id: req.params.id
        },
        select: {
            body: true,
            title: true,
            Comments: {
                orderBy: {
                    createdAt: "desc"
                },
                select: COMMENT_SELECT_FIELDS
            }

        }
    }))
})

app.post("/posts/:id/comments", async (req, res) => {
    if (req.body.message === "" || req.body.message == null) { // handle if message is empty
        return res.send(app.httpErrors.badRequest("Message is required"))
    }
    return await commitToDo(prisma.comment.create({
        data: {
            message: req.body?.message,
            userId: req.body?.userId,
            parentId: req.body?.parentId,
            postId: req.params?.id
        },
        select: {
            ...COMMENT_SELECT_FIELDS
        },
    })
        .then(comment => {
            return {
                ...comment,
                likeCount: 0,
                likedByMe: false,
            }
        })
    )


})

app.put("/posts/:postId/comments/:commentId", async (req, res) => {
    if (req.body.message === "" || req.body.message == null) { // handle if message is empty
        return res.send(app.httpErrors.badRequest("Message is required"))
    }
    return await commitToDo(prisma.comment.update({
        where: {
            id: req.params.commentId
        },
        data: {
            message: req.body.message
        },
        select: {
            message: true
        }
    }))
})

app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
    return await commitToDo(prisma.comment.delete({
        where: {
            id: req.params.commentId
        },
        select: {
            id: true
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