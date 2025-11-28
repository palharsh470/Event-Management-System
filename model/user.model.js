import mongoose from "mongoose"

const  userSchema = mongoose.Schema({
    name : {
        type : String,
        requred : true,
    },
    username : {
        type : String,
        requred : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 4
    },
    eventsLiked : {
        type : Number,
        default : 0,
    }
})

const user = mongoose.model("Event User", userSchema);

export default user;