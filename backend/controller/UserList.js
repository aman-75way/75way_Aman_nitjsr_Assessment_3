import { User } from "../models/userSchema.js"

export const UserList = async (req , res)=>{
    const response = await User.find({});
    const data = response

    res.status(200).json({response});
}