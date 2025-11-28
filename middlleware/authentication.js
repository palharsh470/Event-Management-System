import user from "../model/user.model.js";
import bcrypt from "bcrypt"


export default async function authentication(req, res, next) {

    const body = req.body
    const username = body.username;


    try {

        const logUser = await user.findOne({
            username: username,
        })

        if (!logUser) {
            res.json({
                success: false,
                message: "User doesn't exist"
            })
            return;
        }

        const result = await bcrypt.compare(body.password, logUser.password)

        if (!result) {
            return res.json({
                success: false,
                message: "Incorrect password"
            })

        }
        req.user = logUser
        next();
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message || "something went wrong"
        })
    }

}