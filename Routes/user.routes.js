import express from "express"
import { createUser, followUser, login } from "../controller/user.controller.js";
import authentication from "../middlleware/authentication.js";
import authorisation from "../middlleware/authorisation.js";
import { getLikedEvents } from "../controller/event.controller.js";

const userRouter = express.Router();

userRouter.post("/user/create", createUser);
userRouter.post("/user/login", authentication, login);
userRouter.get("/user/event/like", authorisation, getLikedEvents)
userRouter.post("/user/:id/follow", authorisation, followUser)

export default userRouter;