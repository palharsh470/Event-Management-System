import jwt from "jsonwebtoken";
import user from "../model/user.model.js";
import bcrypt from "bcrypt"
import event from "../model/event.model.js";
import likes from "../model/like.model.js";
import follow from "../model/follow.model.js";

export async function createUser(req, res) {

    try {

        const body = req.body;

        const hashedPass = await bcrypt.hash(body.password, 10);
        body.password = hashedPass;


        const addedUser = await user.create(body);

        const data = {
            id: addedUser._id
        }
        const token = jwt.sign(data, process.env.jwt_secret)

        res.cookie("token", token).json({
            success: true,
            data: addedUser,
            token: token
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

export const login = async (req, res) => {

    const logUser = req.user

    try {

        const data = {
            id: logUser._id
        }
        const token = jwt.sign(data, process.env.jwt_secret)

        res.cookie('token', token).json({
            success: true,
            token: token
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

export async function getLikedUser(req, res) {
    try {
        const eventtoLike = req.params.id;




        const likedEvent = await event.findById(eventtoLike)

        if (!likedEvent) {
            return res.json({
                success: false,
                message: "event not exist"
            })
        }

        const likesData = await likes.find({
            event: eventtoLike
        }).populate("user", "-password")

        if (!likesData) {
            return res.json({
                success: false,
                message: "No user likes the event"
            })
        }


        return res.json({

            success: true,
            data: likesData
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message || "something went wrong"
        })
    }

}

export async function followUser(req, res) {

    try {

        const followerUser = req.user;
        const followingUserId = req.params.id

        if (followerUser._id == followingUserId) {
            return res.json({
                success: false,
                message: "User can not follow itself"
            })
        }

        const addFollowUser = await follow.create({
            follower: followerUser._id,
            following: followingUserId
        })

        res.json({
            success: true,
            data: addFollowUser
        })
    }

    catch (err) {
        res.json({
            success: false,
            message: err.message || "Something went wrong"
        })
    }
}