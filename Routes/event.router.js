import express from "express"
import { getLikedUser } from "../controller/user.controller.js";
import authorisation from "../middlleware/authorisation.js";
import { createEvent, eventLike, getFeedEvents, getMostLikedEvents } from "../controller/event.controller.js";

const eventRouter = express.Router();


eventRouter.get("/event/user/like/:id", getLikedUser);
eventRouter.post("/event/create", authorisation, createEvent)
eventRouter.post("/event/like/:id", authorisation, eventLike)
eventRouter.get("/event/mostliked" , authorisation, getMostLikedEvents)
eventRouter.get("/event/feed" , authorisation, getFeedEvents)

export default eventRouter;