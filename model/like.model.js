import mongoose from "mongoose"

const likeSchema = mongoose.Schema({
    event : {
           type: mongoose.Schema.Types.ObjectId,
           ref: "event",
           required: true
       },
       user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event User",
        requred : true
       }
})

const likes = mongoose.model("Like", likeSchema);

export default likes;