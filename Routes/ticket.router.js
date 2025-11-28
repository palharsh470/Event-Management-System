

import express from "express"
import authorisation from "../middlleware/authorisation.js";
import { createTicket, deleteTicket } from "../controller/ticket.controller.js";

const ticketRouter = express.Router();

ticketRouter.post("/ticket", authorisation , createTicket)
ticketRouter.delete("/ticket/:id", authorisation , deleteTicket)

export default ticketRouter;