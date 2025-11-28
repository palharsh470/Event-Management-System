import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        requred: true,
    },
    time: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    ticketPrice: {
        type: Number,
        min: 0
    },
    ticketAvl: {
        type: Number,
        required: true,
        min: 0
    }
    ,
    organiser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event User",
        required: true
    }
    ,userLiked : {
        type : Number,
        default : 0
    }
})

const event = mongoose.model("event", eventSchema);

export default event;