import jwt from "jsonwebtoken"
import user from "../model/user.model.js";
export default async function authorisation(req, res, next) {
    try {

    
        const token = req.cookies.token;
        const data = jwt.verify(token, process.env.jwt_secret)
        const id = data.id;

        const nowUser =await user.findById(id)
        if (!nowUser) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            })
        }

        req.user = nowUser
        next()
    }
    catch (err) {
        res.json(
            {

                success: false,
                message : "something went wrong"
            }
        )
    

}

}