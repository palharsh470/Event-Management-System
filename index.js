import cookieParser from "cookie-parser";
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./Routes/user.routes.js";
import eventRouter from "./Routes/event.router.js";
import ticketRouter from "./Routes/ticket.router.js";
import handleError from "./middlleware/error.middleware.js";

const server =  express();

dotenv.config();

server.use(express.json())
server.use(cookieParser())

server.use(userRouter,eventRouter,ticketRouter)

server.use(handleError)




console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL).then(()=>{
    server.listen(3000, ()=>{
        console.log("server started")
    })
})