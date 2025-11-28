import mongoose from "mongoose"

const  ticketSchema = mongoose.Schema({
    name : {
        type : String,
        requred : true,
    },
    event : {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Event",
           required: true
       },
       buyer :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event User",
        requred : true
       }
})

const ticket = mongoose.model("Ticket", ticketSchema);

export default ticket;