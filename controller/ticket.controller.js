import event from "../model/event.model.js";
import ticket from "../model/ticket.model.js";


export async function createTicket(req, res) {

    try {

        const user = req.user;
        const body = req.body;

        const eventId = body.event;
        const ticketEvent = await event.findById(eventId);
        console.log(ticketEvent)

        if (!ticketEvent) {
            return res.json({
                success: false,
                message: "Event doesn't exist"
            })
        }


        const now = new Date();
        const eventTime = Date.parse(ticketEvent.time)

        if (now > eventTime) {
            return res.json({
                success: false,
                message: "Event finished"
            })
        }

        if (ticketEvent.ticketAvl < 1) {
            return res.json({
                success: false,
                message: "Tickets ranout"
            })
        }

        body.buyer = user
        const addedTicket = await ticket.create(body);
        await ticketEvent.updateOne({
            ticketAvl: ticketEvent.ticketAvl - 1
        })

        res.json({
            success: true,
            data: addedTicket,
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message || "something went wrong"
        })
    }


}

export async function deleteTicket(req, res) {

    try {

        const user = req.user;

        const ticketId = req.params.id;

        const tickettoDelete = await ticket.findById(ticketId);
        if (!tickettoDelete) {
            return res.json({
                success: false,
                message: "Ticket not available"
            })

        }

        if (tickettoDelete.buyer.toString() != user._id) {
            return res.json({
                success: false,
                message: "Only the buyer can delete the ticket"
            })
        }


        const deletedticket = await tickettoDelete.deleteOne()

        
console.log(tickettoDelete.event.toString())
        const updateEvent = await event.findByIdAndUpdate(tickettoDelete.event.toString(), {
            $inc: {
                ticketAvl: 1
            }
        },{
            new : true
        })

        

        res.json({
            success: true,
            data: updateEvent,
            
        })


    }

    catch (err) {
        return res.json({
            success: false,
            message: err.message || "something went wrong"
        })
    }



}