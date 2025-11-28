import mongoose from "mongoose"

const followSchema = mongoose.Schema({
    follower : {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Event User",
           required: true
       },
       following :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event User",
        requred : true
       }
})

const follow = mongoose.model("follow", followSchema);

export default follow;