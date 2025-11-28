import event from "../model/event.model.js"
import follow from "../model/follow.model.js";
import likes from "../model/like.model.js";
import user from "../model/user.model.js"

export async function createEvent(req, res) {
    const organiser = req.user

    const body = req.body

    try {
        body.organiser = organiser._id

        const time = body.time;
        if (!Date.parse(time)) {
            return res.json({
                success: false,
                message: "Time will be in correct format YYYY-MM-DDTHH:MM:SS"
            })
        }

        if (!(Number.parseInt(body.ticketAvl) || Number.parseInt(body.ticketAvl) < 1)) {
            return res.json({
                success: false,
                message: "Please enter Valid Tickets"
            })
        }
        if (!(Number.parseFloat(body.ticketAvl) || Number.parseFloat(body.ticketAvl) < 0)) {
            return res.json({
                success: false,
                message: "Please enter Valid Price"
            })
        }

        const eventDate = Date.parse(time)
        const now = new Date();
        if (now > eventDate) {
            res.json({
                success: false,
                message: "Invalid date, Please enter future date for event"
            })
        }

        body.time = eventDate
        const newEvent = await event.create(body);


        res.status(200).json({
            success: true,
            data: newEvent
        })

    }
    catch (err) {
        res.json({
            success: false,
            message: err.message || "something went wrong"
        })
    }
}


export async function getLikedEvents(req, res) {

    try {

        const loggedUser = req.user



        const events = await likes.find({
            user: loggedUser._id
        }).populate("event")

        console.log(events)

        if (!events) {
            return res.json({
                success: false,
                message: "User doesn't like any event"
            })
        }

        res.json({
            success: true,
            data: events
        })

    }
    catch (err) {
        res.json({
            success: false,
            message: err.message || "something went wrong"
        })
    }

}

export async function eventLike(req, res) {


    try {

        const loggeduser = req.user

        const eventId = req.params.id;
        console.log(user)


        const eventToLike = await event.findById(eventId)
        if (!eventToLike) {
            return res.status(404).json({
                success: false,
                message: "event not exist"
            })
        }

        const isliked = await likes.findOne({
            event: eventId,
            user: loggeduser._id
        })

        console.log(isliked)


        if (isliked != null) {
            return res.json({
                success: false,
                message: "Unable to like the Event"
            })
        }

        console.log(loggeduser._id, eventToLike._id)
        const like = await likes.create({
            event: eventToLike._id,
            user: loggeduser._id
        })

        const updateUserLike = await user.findByIdAndUpdate(loggeduser._id.toString(), {
            $inc: {
                eventsLiked: 1
            }
        }, {
            new: true

        })


        const updateEventLike = await event.findByIdAndUpdate(eventToLike._id.toString(), {
            $inc: {
                userLiked: 1
            }
        }, {
            new: true
        })

        return res.json({
            success: true,
            data: like,
            Usersliked: updateUserLike.eventsLiked,
            Eventsliked: updateEventLike.userLiked
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message || "error"
        })
    }
}

export async function getMostLikedEvents(req, res) {
    try {
        const mostLikedEvents = await event.find().sort({
            userLiked: -1
        }).limit(5)

        res.json({
            success: true,
            data: mostLikedEvents
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message || "something went wrong"
        })
    }
}

export async function getFeedEvents(req, res) {
    try {

        const loggedUser = req.user

        const followRecords = await follow.find({
            follower: loggedUser._id
        })

        const followingRecords = followRecords.map((user) => {
            return user.following
        })

        const feedEvents = await event.find({
            organiser: {
                $in: followingRecords
            }
        })

        res.json({
            success: true,
            data: feedEvents
        })
    }

    catch (err) {
       next(err)
    }
}